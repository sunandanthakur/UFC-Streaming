require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = Number(process.env.PORT || 4173);
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const defaultAdminEmails = ["adminsaab@ufc.com"];
const adminEmails = [...new Set([
  ...defaultAdminEmails,
  ...(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
])];

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, apikey, x-client-info");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/config.js", (_req, res) => {
  res.type("application/javascript").send(
    `window.__SUPABASE_URL__=${JSON.stringify(supabaseUrl)};` +
    `window.__SUPABASE_ANON_KEY__=${JSON.stringify(supabaseAnonKey)};` +
    `window.__ADMIN_EMAILS__=${JSON.stringify(adminEmails)};`
  );
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    supabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
    adminEmails
  });
});

app.post("/api/sync-admin-role", async (req, res) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return res.status(401).json({ error: "Missing auth token." });
  }

  const userClient = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error: userError } = await userClient.auth.getUser(token);
  if (userError || !user?.email) {
    return res.status(401).json({ error: "Invalid session." });
  }

  const email = user.email.trim().toLowerCase();
  if (!adminEmails.includes(email)) {
    return res.status(403).json({ error: "This email is not configured as admin." });
  }

  const dbClient = supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

  const profilePayload = {
    id: user.id,
    email: user.email,
    display_name: user.user_metadata?.display_name || email.split("@")[0],
    role: "admin"
  };

  const { data, error } = await dbClient
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
    .select("id, email, display_name, role")
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ profile: data });
});

app.use(express.static(__dirname));

app.listen(port, "0.0.0.0", () => {
  console.log(`UFC Stream running on http://localhost:${port}`);
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env");
  }
});
