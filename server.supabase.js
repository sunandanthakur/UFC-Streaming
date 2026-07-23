require("dotenv").config();

const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = Number(process.env.PORT || 4173);
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const sportsDataMmaApiKey = process.env.SPORTSDATA_MMA_API_KEY || "";
const sportsDataMmaBaseUrl = "https://api.sportsdata.io/v3/mma/scores/json";
const sportsDataMmaFightersUrl = "https://api.sportsdata.io/v3/mma/scores/json/FightersBasic";
const sportsDataMmaNewsUrl = "https://api.sportsdata.io/v3/mma/scores/json/News";
const citoApiKey = process.env.CITO_API_KEY || "";
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

async function fetchSportsDataMma(pathname) {
  const response = await fetch(`${sportsDataMmaBaseUrl}/${pathname}`, {
    headers: { "Ocp-Apim-Subscription-Key": sportsDataMmaApiKey }
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch (_error) {
    payload = text;
  }

  if (!response.ok) {
    const error = new Error("SportsData.io MMA request failed.");
    error.status = response.status;
    error.details = payload;
    throw error;
  }
  return payload;
}

function sportsDataEventStatus(status) {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("progress") || normalized.includes("live")) return "Live";
  if (normalized.includes("final") || normalized.includes("ended") || normalized.includes("complete")) return "Ended";
  return "Upcoming";
}

function sportsDataFighterName(fighter) {
  return [fighter?.FirstName, fighter?.LastName].filter(Boolean).join(" ").trim() || "TBA";
}

function normalizeFighterName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['".]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sportsDataFighterRecord(fighter) {
  const wins = fighter?.PreFightWins;
  const losses = fighter?.PreFightLosses;
  const draws = fighter?.PreFightDraws;
  const noContests = fighter?.PreFightNoContests;
  if ([wins, losses, draws, noContests].every((value) => value === null || value === undefined)) return "";
  return `${wins || 0}-${losses || 0}-${draws || 0}${noContests ? ` (${noContests} NC)` : ""}`;
}

function sportsDataFightCard(fights = []) {
  return [...fights]
    .sort((a, b) => (a.Order || 999) - (b.Order || 999))
    .map((fight) => {
      const fighters = Array.isArray(fight.Fighters) ? fight.Fighters : [];
      const first = fighters[0];
      const second = fighters[1];
      const firstRecord = sportsDataFighterRecord(first);
      const secondRecord = sportsDataFighterRecord(second);
      const matchup = `${sportsDataFighterName(first)}${firstRecord ? ` (${firstRecord})` : ""} vs ${sportsDataFighterName(second)}${secondRecord ? ` (${secondRecord})` : ""}`;
      return fight.WeightClass ? `${matchup} - ${fight.WeightClass}` : matchup;
    })
    .join("\n");
}

function normalizeSportsDataEvent(event, detail) {
  const source = detail && typeof detail === "object" ? { ...event, ...detail } : event;
  const eventDate = source.DateTime || source.Day || null;
  const fights = Array.isArray(source.Fights) ? source.Fights : [];
  return {
    id: `sportsdata-${source.EventId}`,
    sportsDataEventId: source.EventId,
    title: source.Name || source.ShortName || "UFC Event",
    description: source.ShortName
      ? `${source.ShortName} from the SportsData.io UFC schedule feed.`
      : "UFC event from the SportsData.io schedule feed.",
    thumbnail: source.ImageUrl || source.PhotoUrl || source.LogoUrl || "",
    streamUrl: "",
    venue: source.Venue || source.Stadium || source.Location || "UFC",
    eventDate,
    viewerCount: 0,
    status: sportsDataEventStatus(source.Status),
    theme: "",
    fight_card: sportsDataFightCard(fights),
    rawStatus: source.Status || "",
    season: source.Season || null
  };
}

app.get("/api/mma/events", async (req, res) => {
  if (!sportsDataMmaApiKey) {
    return res.status(500).json({ error: "SportsData.io MMA API key is not configured." });
  }

  const requestedSeason = Number(req.query.season);
  const currentSeason = new Date().getFullYear();
  const seasons = Number.isFinite(requestedSeason) && requestedSeason > 2000
    ? [requestedSeason]
    : [currentSeason - 1, currentSeason, currentSeason + 1];

  try {
    const schedules = await Promise.allSettled(
      seasons.map(async (season) => fetchSportsDataMma(`Schedule/UFC/${season}`))
    );
    const scheduleEvents = schedules
      .filter((result) => result.status === "fulfilled" && Array.isArray(result.value))
      .flatMap((result) => result.value);

    const uniqueEvents = [...new Map(scheduleEvents.map((event) => [event.EventId, event])).values()]
      .sort((a, b) => new Date(a.DateTime || a.Day || 0) - new Date(b.DateTime || b.Day || 0));

    const detailed = await Promise.allSettled(
      uniqueEvents.map(async (event) => ({
        event,
        detail: await fetchSportsDataMma(`Event/${event.EventId}`)
      }))
    );
    const detailsById = new Map(
      detailed
        .filter((result) => result.status === "fulfilled")
        .map((result) => [result.value.event.EventId, result.value.detail])
    );

    res.setHeader("Cache-Control", "no-store");
    res.json({
      fetchedAt: new Date().toISOString(),
      seasons,
      events: uniqueEvents.map((event) => normalizeSportsDataEvent(event, detailsById.get(event.EventId)))
    });
  } catch (error) {
    res.status(error.status || 502).json({
      error: "Could not load SportsData.io MMA schedule.",
      details: error.details || error.message
    });
  }
});

function sportsDataFighterImage(fighter) {
  return fighter?.CitoImageUrl
    || fighter?.ApiImageUrl
    || fighter?.PhotoUrl
    || fighter?.PhotoURL
    || fighter?.HeadshotUrl
    || fighter?.HeadshotURL
    || fighter?.ImageUrl
    || fighter?.ImageURL
    || fighter?.PictureUrl
    || fighter?.PictureURL
    || fighter?.UsaTodayHeadshotUrl
    || fighter?.UsaTodayHeadshotURL
    || "";
}

function normalizeSportsDataFighter(fighter) {
  const apiImageUrl = sportsDataFighterImage(fighter);
  const name = [fighter?.FirstName, fighter?.LastName].filter(Boolean).join(" ").trim();
  const slug = normalizeFighterName(name).replace(/\s+/g, '-');
  
  return {
    ...fighter,
    ApiImageUrl: apiImageUrl || `/api/mma/fighters/${slug}/image`,
    HasApiImage: true,
    ImageSource: apiImageUrl ? "SportsData.io" : "Cito UFC Proxy"
  };
}

app.get("/api/mma/fighters", async (_req, res) => {
  if (!sportsDataMmaApiKey) {
    return res.status(500).json({ error: "SportsData.io MMA API key is not configured." });
  }

  try {
    const response = await fetch(sportsDataMmaFightersUrl, {
      headers: { "Ocp-Apim-Subscription-Key": sportsDataMmaApiKey }
    });
    const text = await response.text();
    let payload;
    try {
      payload = text ? JSON.parse(text) : [];
    } catch (_error) {
      payload = text;
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: "SportsData.io MMA API request failed.",
        status: response.status,
        details: payload
      });
    }

    const fighters = Array.isArray(payload) ? payload.map(normalizeSportsDataFighter) : [];

    res.setHeader("Cache-Control", "no-store");
    res.json({
      fetchedAt: new Date().toISOString(),
      fighters,
      sources: {
        sportsData: { ok: true },
        cito: { ok: Boolean(citoApiKey), configured: Boolean(citoApiKey), error: "" }
      }
    });
  } catch (error) {
    res.status(502).json({
      error: "Could not reach SportsData.io MMA API.",
      details: error.message
    });
  }
});

const citoImageCache = new Map();

app.get("/api/mma/fighters/:slug/image", async (req, res) => {
  if (!citoApiKey) {
    return res.status(500).send("Cito API key missing");
  }
  const slug = req.params.slug;
  if (!slug) return res.status(400).send("Missing slug");

  if (citoImageCache.has(slug)) {
    const cachedUrl = citoImageCache.get(slug);
    if (!cachedUrl) return res.status(404).send("Image not found");
    return res.redirect(cachedUrl);
  }

  try {
    const response = await fetch(`https://api.citoapi.com/api/v1/ufc/fighters/${slug}`, {
      headers: { "x-api-key": citoApiKey }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        citoImageCache.set(slug, null);
      }
      return res.status(response.status).send(response.status === 429 ? "Rate limited by Cito API" : "Fighter not found in Cito API");
    }

    const payload = await response.json();
    const data = payload?.data;
    const imageUrl = data?.imageUrl || data?.headshotUrl || data?.proxiedImageUrl;
    
    if (imageUrl) {
      citoImageCache.set(slug, imageUrl);
      return res.redirect(imageUrl);
    } else {
      citoImageCache.set(slug, null);
      return res.status(404).send("Image not available");
    }
  } catch (err) {
    return res.status(500).send("Internal proxy error");
  }
});

app.get("/api/mma/fighters/:slug", async (req, res) => {
  if (!citoApiKey) {
    return res.status(500).json({ error: "Cito API key is not configured." });
  }
  const slug = req.params.slug;
  if (!slug) return res.status(400).json({ error: "Missing slug" });

  try {
    const response = await fetch(`https://api.citoapi.com/api/v1/ufc/fighters/${slug}`, {
      headers: { "x-api-key": citoApiKey }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: response.status === 429 ? "Rate limited by Cito API" : "Fighter not found in Cito API" });
    }

    const payload = await response.json();
    res.setHeader("Cache-Control", "no-store");
    res.json(payload);
  } catch (err) {
    res.status(502).json({ error: "Could not reach Cito API.", details: err.message });
  }
});

app.get("/api/mma/news", async (_req, res) => {
  if (!sportsDataMmaApiKey) {
    return res.status(500).json({ error: "SportsData.io MMA API key is not configured." });
  }

  try {
    const response = await fetch(sportsDataMmaNewsUrl, {
      headers: { "Ocp-Apim-Subscription-Key": sportsDataMmaApiKey }
    });
    const text = await response.text();
    let payload;
    try {
      payload = text ? JSON.parse(text) : [];
    } catch (_error) {
      payload = text;
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: "SportsData.io MMA news request failed.",
        status: response.status,
        details: payload
      });
    }

    res.setHeader("Cache-Control", "no-store");
    res.json({
      fetchedAt: new Date().toISOString(),
      news: Array.isArray(payload) ? payload : []
    });
  } catch (error) {
    res.status(502).json({
      error: "Could not reach SportsData.io MMA news API.",
      details: error.message
    });
  }
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

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get(/^\/(?!api\/|config\.js).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (process.env.VERCEL !== '1') {
  app.listen(port, "0.0.0.0", () => {
    console.log(`UFC Stream running on http://localhost:${port}`);
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env");
    }
  });
}

module.exports = app;
