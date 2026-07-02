
window.closeRankingsModal = function() {
  const modal = document.getElementById('rank-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
}

window.openRankingsModal = function(type, champStr) {
  let modal = document.getElementById('rank-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'rank-modal-overlay';
    modal.className = 'rank-modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) window.closeRankingsModal(); };
    modal.innerHTML = `
      <div class="rank-modal-box">
        <button class="rank-modal-close" onclick="closeRankingsModal()">×</button>
        <h2 class="rank-modal-title" id="rank-modal-title"></h2>
        <div class="rank-modal-body" id="rank-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById('rank-modal-title');
  const bodyEl = document.getElementById('rank-modal-body');

  if (type === 'how') {
    titleEl.textContent = 'How Meta Rankings Work';
    bodyEl.innerHTML = `
      <p style="color:#aaa; line-height:1.6; margin-bottom:12px;">As of June 20, 2026, the UFC transitioned from the historical media voting panel to the proprietary <strong>Meta UFC Rankings Algorithm</strong>.</p>
      <p style="color:#aaa; line-height:1.6; margin-bottom:12px;">This system relies on real-time data inputs including:</p>
      <ul style="color:#aaa; line-height:1.6; padding-left:20px;">
        <li style="margin-bottom:6px">Strength of schedule and opponent rank at time of fight</li>
        <li style="margin-bottom:6px">Method and decisiveness of victory</li>
        <li style="margin-bottom:6px">Activity level and recency of bouts</li>
      </ul>
      <p style="color:#aaa; line-height:1.6;">Changes are updated dynamically following any UFC event.</p>
    `;
  } else if (type === 'news') {
    titleEl.textContent = 'Latest Rankings News';
    bodyEl.innerHTML = `
      <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
        <h4 style="margin:0 0 8px 0; color:#fff;">UFC Implements fully Algorithmic "Meta" Rankings</h4>
        <p style="margin:0; font-size:0.9rem; color:#888;">June 20, 2026 - The long-awaited transition replaces the traditional media panel with an AI-driven, data-heavy algorithm that adjusts instantly post-fight.</p>
      </div>
      <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
        <h4 style="margin:0 0 8px 0; color:#fff;">Pound-for-Pound Shakeup After Massive Weekend</h4>
        <p style="margin:0; font-size:0.9rem; color:#888;">June 14, 2026 - With Justin Gaethje and Ciryl Gane securing major finishes, the P4P board sees a dramatic mathematical shift.</p>
      </div>
      <div style="margin-bottom: 0;">
        <h4 style="margin:0 0 8px 0; color:#fff;">New System Penalizes Inactivity</h4>
        <p style="margin:0; font-size:0.9rem; color:#888;">The Meta system enforces a strict penalty curve for fighters inactive over 12 months, radically shaking up the top 10s of several stagnant divisions.</p>
      </div>
    `;
  } else if (type === 'profile') {
    try {
      const champ = JSON.parse(decodeURIComponent(champStr));
      titleEl.textContent = champ.name + ' Profile';
      bodyEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
          <div style="width:80px; height:80px; border-radius:50%; background:#333; display:flex; align-items:center; justify-content:center; font-size:2rem;">
            ${champ.country === 'USA' ? '🇺🇸' : champ.country === 'BRA' ? '🇧🇷' : champ.country === 'ENG' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' : champ.country === 'RUS' ? '🇷🇺' : '🥊'}
          </div>
          <div>
            <h3 style="margin:0; font-size:1.4rem;">${champ.division}</h3>
            <span style="color:#d20a0a; font-weight:bold;">Record: ${champ.record}</span>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:8px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div><strong style="color:#888; font-size:0.8rem; display:block;">KO WINS</strong><span style="font-size:1.2rem;">${champ.koWins || 0}</span></div>
          <div><strong style="color:#888; font-size:0.8rem; display:block;">SUB WINS</strong><span style="font-size:1.2rem;">${champ.subWins || 0}</span></div>
          <div><strong style="color:#888; font-size:0.8rem; display:block;">DEC WINS</strong><span style="font-size:1.2rem;">${champ.decWins || 0}</span></div>
          <div><strong style="color:#888; font-size:0.8rem; display:block;">LAST FIGHT</strong><span style="font-size:1.2rem;">${champ.lastFightDate || 'TBD'}</span></div>
        </div>
        <div style="margin-top:20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top:16px;">
          <h4 style="margin:0 0 8px 0; color:#aaa;">Next Scheduled Fight</h4>
          <div style="font-size:1.1rem;">vs. <strong style="color:#fff;">${champ.nextFightOpponent}</strong> at ${champ.nextFightEvent} (${champ.nextFightDate})</div>
        </div>
      `;
    } catch(e) {
      titleEl.textContent = "Fighter Profile";
      bodyEl.innerHTML = "<p>Could not load fighter data.</p>";
    }
  }

  modal.style.display = 'flex';
  // Force reflow
  void modal.offsetWidth;
  modal.classList.add('active');
}

const PREFERENCES_KEY = "fightstream-pro-preferences-v1";
const FRONT_PAGE_IMAGE = "assets/ufc-front-page.jpg";
const LOGO_IMAGE = "assets/ufc-logo.png";

const icons = {
  home: '<svg class="icon" viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  play: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7Z"/></svg>',
  calendar: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>',
  user: '<svg class="icon" viewBox="0 0 24 24"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>',
  shield: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  bell: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  share: '<svg class="icon" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
  max: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
  plus: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  logout: '<svg class="icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  star: '<svg class="icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>',
  heart: '<svg class="icon" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFilled: '<svg class="icon" viewBox="0 0 24 24" fill="var(--red)"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  download: '<svg class="icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  trophy: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  time: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  list: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  ticket: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  location: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  upload: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  link: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  save: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  edit: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  broadcast: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>'
};

const posterThemes = [
  "radial-gradient(circle at 75% 20%, rgba(255,255,255,.22), transparent 18rem), linear-gradient(135deg, #e10600, #181818 48%, #050505)",
  "radial-gradient(circle at 68% 30%, rgba(225,6,0,.45), transparent 14rem), linear-gradient(145deg, #242424, #050505 58%, #490300)",
  "radial-gradient(circle at 78% 14%, rgba(248,193,74,.24), transparent 12rem), linear-gradient(135deg, #0b0b0b, #2a2a2a 48%, #a10501)",
  "radial-gradient(circle at 70% 25%, rgba(255,255,255,.18), transparent 15rem), linear-gradient(135deg, #4b0502, #111 46%, #050505)"
];

const REMOVED_DEMO_TITLES = new Set([
  "UFC 318: Apex Collision",
  "Fight Night: Velocity",
  "UFC 319: Title Line"
]);

const fanWallpapers = [
  { id: "demetrious-johnson", name: "Demetrious Johnson", nickname: "Mighty Mouse", title: "Championship Glory", style: "Freestyle Wrestling, Muay Thai, BJJ", record: "34-4-1", src: "assets/fan-demetrious-johnson.png", position: "center 30%" },
  { id: "daniel-cormier", name: "Daniel Cormier", nickname: "DC", title: "Double Champion", style: "Freestyle Wrestling, Kickboxing", record: "22-3-0 (1 NC)", src: "assets/fan-daniel-cormier.png", position: "center 25%" },
  { id: "robert-whittaker", name: "Robert Whittaker", nickname: "The Reaper", title: "Middleweight Legend", style: "Karate, Defensive Wrestling", record: "26-7-0", src: "assets/fan-robert-whittaker.png", position: "center 20%" },
  { id: "khamzat-victory", name: "Khamzat Chimaev", nickname: "Borz", title: "UFC 294 Victory", style: "Freestyle Wrestling, BJJ, Sambo", record: "13-0-0", src: "assets/fan-khamzat-chimaev-victory.png", position: "center 20%" },
  { id: "khabib-vs-conor", name: "UFC 229", nickname: "The Biggest Fight", title: "Khabib vs McGregor", style: "Sambo vs Boxing", record: "Khabib 29-0 · Conor 22-6", src: "assets/fan-khabib-vs-conor.png", position: "center 35%" },
  { id: "khamzat-crouch", name: "Khamzat Chimaev", nickname: "Borz", title: "Octagon Focus", style: "Freestyle Wrestling, BJJ, Sambo", record: "13-0-0", src: "assets/fan-khamzat-chimaev-crouch.png", position: "center 15%" },
  { id: "khabib-eagle", name: "Khabib Nurmagomedov", nickname: "The Eagle", title: "Undefeated Champion", style: "Combat Sambo, Wrestling, Grappling", record: "29-0-0", src: "assets/fan-khabib-nurmagomedov.png", position: "center 25%" },
  { id: "jon-jones", name: "Jon Jones", nickname: "Bones", title: "Heavyweight King", style: "Wrestling, Muay Thai, BJJ", record: "27-1-0 (1 NC)", src: "assets/fan-jon-jones.png", position: "center 20%" },
  { id: "tom-aspinall", name: "Tom Aspinall", nickname: "The Asp", title: "Heavyweight Champion", style: "BJJ, Boxing, Wrestling", record: "15-3-0", src: "assets/fan-tom-aspinall.png", position: "center 70%" },
  { id: "islam-makhachev", name: "Islam Makhachev", nickname: "The Champion", title: "Lightweight Champion", style: "Sambo, Wrestling, Judo", record: "26-1-0", src: "assets/fan-islam-makhachev.png", position: "center 25%" },
  { id: "alex-pereira", name: "Alex Pereira", nickname: "Poatan", title: "Light Heavyweight Champion", style: "Kickboxing", record: "10-2-0", src: "assets/fan-alex-pereira-flex.jpg", position: "center 20%" },
  { id: "ilia-topuria", name: "Ilia Topuria", nickname: "El Matador", title: "Featherweight Champion", style: "Wrestling, Boxing", record: "15-0-0", src: "assets/fan-ilia-topuria-oliveira.jpg", position: "center 20%" },
  { id: "israel-adesanya", name: "Israel Adesanya", nickname: "The Last Stylebender", title: "Middleweight Legend", style: "Kickboxing, Boxing", record: "24-3-0", src: "assets/fan-israel-adesanya-belt.jpg", position: "center 20%" }
];

const state = loadState();
let route = "home";
let activeEventId;
let authUser = null;
let userProfile = null;
let authMode = "userLogin";
let eventsLoadInFlight = false;
let sharedEventsWarningShown = false;
let activeWeightClass = "Pound-for-Pound";
let adminStats = { active_users: 0, live_events: 0, total_revenue: 0, total_ppv_sales: 0 };
let adminTab = "dashboard";
let adminUsersList = [];
let adminEventDraft = {
  id: "",
  title: "",
  description: "",
  thumbnail: "",
  streamUrl: "",
  venue: "",
  eventDate: "",
  status: "Upcoming",
  viewerCount: 0,
  fightCard: ""
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || "{}");
    return {
      events: [],
      favorites: saved.favorites || [],
      reminders: saved.reminders || [],
      fanLikes: saved.fanLikes || [],
      analytics: { watchDuration: 0, engagement: 0 }
    };
  } catch {
    return { events: [], favorites: [], reminders: [], fanLikes: [], analytics: { watchDuration: 0, engagement: 0 } };
  }
}

function saveState() {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify({
    favorites: state.favorites,
    reminders: state.reminders,
    fanLikes: state.fanLikes
  }));
}

function getSupabaseClient() {
  return window.getSupabase ? window.getSupabase() : null;
}

function isSupabaseReady() {
  return window.isSupabaseConfigured ? window.isSupabaseConfigured() : false;
}

const DEFAULT_ADMIN_EMAILS = ["adminsaab@ufc.com"];

function isAdmin() {
  const email = (authUser?.email || userProfile?.email || "").trim().toLowerCase();
  if (email === "adminsaab@ufc.com") return true;
  if (userProfile?.role === "admin") return true;
  return isConfiguredAdminEmail(email);
}

function getAdminEmails() {
  const configured = Array.isArray(window.__ADMIN_EMAILS__) ? window.__ADMIN_EMAILS__ : [];
  return [...new Set([...DEFAULT_ADMIN_EMAILS, ...configured])];
}

function isConfiguredAdminEmail(email) {
  if (!email) return false;
  return getAdminEmails().includes(String(email).trim().toLowerCase());
}

async function applySessionUser(nextUser) {
  authUser = nextUser;
  await loadProfile();
  if (isAdmin()) {
    await fetchAdminStats();
  }
  render();
}

async function ensureProfile(client) {
  if (!authUser) return null;
  const { data: existing, error: readError } = await client
    .from("profiles")
    .select("id, email, display_name, role")
    .eq("id", authUser.id)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return existing;

  const initialRole = isConfiguredAdminEmail(authUser.email) ? "admin" : "viewer";
  const { data: created, error: insertError } = await client
    .from("profiles")
    .insert({
      id: authUser.id,
      email: authUser.email,
      display_name: authUser.user_metadata?.display_name || authUser.email?.split("@")[0] || "",
      role: initialRole
    })
    .select("id, email, display_name, role")
    .single();
  if (insertError) throw insertError;
  return created;
}

async function promoteConfiguredAdmin(client, profile) {
  if (!profile || profile.role === "admin") return profile;
  const email = profile.email || authUser?.email;
  if (!isConfiguredAdminEmail(email)) return profile;

  const { data: updated, error } = await client
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", profile.id)
    .select("id, email, display_name, role")
    .single();
  if (error) {
    console.error(error);
    toast(`Could not promote admin role: ${error.message}`);
    return profile;
  }
  return updated;
}

function mapEvent(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    thumbnail: row.thumbnail,
    streamUrl: row.stream_url,
    venue: row.venue,
    eventDate: row.event_date,
    viewerCount: row.viewer_count,
    theme: row.theme,
    fight_card: row.fight_card
  };
}

async function syncAdminRoleOnServer() {
  const client = getSupabaseClient();
  if (!client || !authUser || !isConfiguredAdminEmail(authUser.email)) return null;

  const { data: { session } } = await client.auth.getSession();
  if (!session?.access_token) return null;

  const response = await fetch("/api/sync-admin-role", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(payload.error || "Admin sync failed");
    return null;
  }
  return payload.profile || null;
}

async function loadProfile() {
  const client = getSupabaseClient();
  if (!client || !authUser) {
    userProfile = null;
    return;
  }

  try {
    let profile = await ensureProfile(client);
    profile = await promoteConfiguredAdmin(client, profile);
    if (profile?.role !== "admin" && isConfiguredAdminEmail(authUser.email)) {
      const synced = await syncAdminRoleOnServer();
      if (synced) profile = synced;
    }
    userProfile = profile;
  } catch (error) {
    console.error(error);
    const synced = await syncAdminRoleOnServer();
    userProfile = synced || {
      id: authUser.id,
      email: authUser.email,
      display_name: authUser.user_metadata?.display_name || authUser.email?.split("@")[0] || "",
      role: isConfiguredAdminEmail(authUser.email) ? "admin" : "viewer"
    };
  }
}

async function loadEvents() {
  if (eventsLoadInFlight) return;
  eventsLoadInFlight = true;

  const client = getSupabaseClient();
  if (!client) {
    if (!sharedEventsWarningShown) {
      sharedEventsWarningShown = true;
      toast("Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env, then restart the server.");
    }
    eventsLoadInFlight = false;
    render();
    return;
  }

  try {
    const { data, error } = await client
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });
    if (error) throw error;
    state.events = (data || [])
      .map(mapEvent)
      .filter((event) => !REMOVED_DEMO_TITLES.has(event.title));
      
    const urlParams = new URLSearchParams(window.location.search);
    const sharedEventId = urlParams.get('event');
    if (sharedEventId && state.events.some(e => e.id === sharedEventId)) {
      activeEventId = sharedEventId;
      if (route === "home") {
        route = "stream";
      }
    } else {
      activeEventId = state.events.find((event) => event.status === "Live")?.id || state.events[0]?.id;
    }
    sharedEventsWarningShown = false;
  } catch (error) {
    if (!sharedEventsWarningShown) {
      sharedEventsWarningShown = true;
      toast(`Could not load shared events: ${error.message}`);
    }
  } finally {
    eventsLoadInFlight = false;
    render();
  }
}

function setRoute(nextRoute, eventId) {
  if (!authUser && nextRoute !== "profile") {
    route = "profile";
  } else {
    route = nextRoute;
  }
  if (eventId) activeEventId = eventId;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setWeightClass(cat) {
  activeWeightClass = cat;
  render();
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(dateValue));
}

function countdown(dateValue) {
  if (!dateValue) return "TBA";
  const diff = new Date(dateValue).getTime() - Date.now();
  if (isNaN(diff)) return "TBA";
  if (diff <= 0) return "Now";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function posterStyle(event, index = 0) {
  const poster = event.thumbnail ? `url(${event.thumbnail}) center/cover` : event.theme || posterThemes[index % posterThemes.length];
  return `style="--poster:${poster}"`;
}

function eventPoster(event, index = 0) {
  return `
    <div class="poster" ${posterStyle(event, index)}>
      <div class="poster-visual"></div>
      <div class="fighter-shape"></div>
    </div>
  `;
}

function eventBadge(event) {
  if (event.status === "Live") return '<span class="badge live"><span class="pulse"></span>Live</span>';
  return `<span class="badge">${event.status}</span>`;
}

function supabaseSetupBanner() {
  if (isSupabaseReady()) return "";
  return `<div class="supabase-banner">Supabase is not configured yet. Copy <code>env.supabase.example</code> values into <code>.env</code>, run the SQL in <code>supabase/schema.sql</code>, then restart with <code>npm start</code>.</div>`;
}

function topbar() {
  if (route === 'admin') return ''; // Admin has sidebar
  return `
    <header class="topbar-modern">
      <div class="brand-pro" onclick="setRoute('home')">
        <div class="mark"><img src="${LOGO_IMAGE}" alt="UFC Stream logo" /></div>
        <div class="brand-text">
          <h1>UFC</h1>
          <p>STREAM PRO</p>
        </div>
      </div>
      <nav class="top-nav-links">
        <a class="${route === 'home' ? 'active' : ''}" onclick="setRoute('home')">Home</a>
        <a class="${route === 'live' ? 'active' : ''}" onclick="setRoute('live')">Live Events</a>
        <a class="${route === 'events' ? 'active' : ''}" onclick="setRoute('events')">Schedule</a>
        <a class="${route === 'rankings' ? 'active' : ''}" onclick="setRoute('rankings')">Rankings</a>
        <a class="${route === 'library' ? 'active' : ''}" onclick="setRoute('library')">Fight Library</a>
        <a class="${route === 'fans' ? 'active' : ''}" onclick="setRoute('fans')">Community</a>
      </nav>
      <div class="top-actions">
        <div class="search-box">
          ${icons.search}
          <input type="text" placeholder="Search" />
        </div>
        <div style="position: relative; display: inline-block;">
          <button class="notification-btn" title="Notifications" onclick="toggleNotifications()">
            ${icons.bell}
            <span class="red-badge">1</span>
          </button>
          <div id="notifications-dropdown" class="dropdown-menu" style="display: none; position: absolute; right: 0; top: 100%; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; width: 300px; padding: 16px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
            <h4 style="margin: 0 0 12px 0; font-size: 1rem; color: #fff;">Notifications</h4>
            <div style="font-size: 0.9rem; color: #ccc; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 12px;">
              <strong style="color: #e10600;">System</strong><br/>
              Welcome to the UFC Stream Platform! Complete your profile to get started.
            </div>
            <div style="font-size: 0.8rem; text-align: center; color: #666;">No more notifications</div>
          </div>
        </div>
        <button class="avatar-btn" onclick="setRoute('profile')">
          <img src="${userProfile?.avatar_url || 'assets/fan-khabib-nurmagomedov.png'}" alt="Profile" />
        </button>
      </div>
    </header>
  `;
}

function bottomNav() {
  if (route === 'admin') return ''; // Admin uses sidebar
  
  const items = [
    ["home", "Home", icons.home],
    ["live", "Live", icons.play],
    ["events", "Events", icons.calendar],
    ["rankings", "Rankings", icons.star],
    ["fans", "Community", icons.user],
    ["profile", "Profile", icons.user]
  ].filter(Boolean);
  
  return `
    <nav class="floating-nav" aria-label="Main navigation">
      ${items.map(([id, label, icon]) => `
        <button class="nav-item ${route === id ? "active" : ""}" onclick="setRoute('${id}')" aria-current="${route === id ? "page" : "false"}">
          ${icon}
          <span>${label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderHome() {
  const upcoming = state.events.find(e => e.status !== "Ended" && e.status !== "Live");
  const upcomingTitle = upcoming ? upcoming.title : "UFC 317";
  const upcomingDateStr = upcoming ? new Date(upcoming.eventDate).toLocaleDateString(undefined, {weekday: 'long'}) : "This Saturday";
  
  return `
    <main class="hero-pro">
      <div class="hero-pro-overlay"></div>
      <div class="hero-pro-content">
        <p class="hero-eyebrow">WELCOME TO UFC STREAM PRO</p>
        <h2 class="hero-title">THE OCTAGON<span class="red-text">AWAITS</span></h2>
        <p class="hero-desc">Watch live events, exclusive content, fight replays, rankings, fighter stats and more. Anytime. Anywhere.</p>
        <div class="hero-actions">
          <button class="btn-red" onclick="setRoute('live')">${icons.play} Watch Live</button>
          <button class="btn-outline" onclick="setRoute('events')">Explore Events</button>
        </div>
      </div>
      <div class="hero-stats-row">
        <div class="stat-card-pro">
          <div class="icon-box" style="color: #e10600;">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M17 15.5A5.5 5.5 0 0 1 11.5 21 5.5 5.5 0 0 1 6 15.5C6 11.5 11.5 2 11.5 2s5.5 9.5 5.5 13.5z" fill="currentColor"/></svg>
          </div>
          <div>
            <h4>${upcomingTitle}</h4>
            <p>${upcomingDateStr}</p>
          </div>
        </div>
        <div class="stat-card-pro">
          <div class="icon-box" style="color: #4da6ff;">
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h4>120K+</h4>
            <p>Fans Watching Now</p>
          </div>
        </div>
        <div class="stat-card-pro">
          <div class="icon-box" style="color: #f8c14a;">
            ${icons.star}
          </div>
          <div>
            <h4>4.9/5</h4>
            <p>User Rating</p>
          </div>
        </div>
      </div>
    </main>
  `;
}

function schedMiniCard(event, isPast = false) {
  if (!event) return '';
  const title = event.title || 'UFC Event';
  const fightCard = event.fight_card || '';
  const venue = event.venue || 'TBA';
  const bgImg = event.thumbnail || 'assets/fan-khabib-vs-conor.png';
  const isLive = event.status === "Live";
  const badgeText = isLive ? "LIVE NOW" : (title.toUpperCase().includes("FIGHT NIGHT") ? "FIGHT NIGHT" : "PPV");
  const dateStr = new Date(event.eventDate || Date.now()).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
  
  return `
    <div class="sched-mini-card" style="background-image: url('${bgImg}');" onclick="setRoute('stream','${event.id}')">
      <div class="sched-mini-overlay"></div>
      ${!isPast ? `<div class="sched-mini-badge" style="${isLive ? 'background:#e10600;' : 'background:rgba(225,6,0,0.8);'}">${badgeText}</div>` : ''}
      <div class="sched-mini-content">
        <h4 class="sched-mini-title">${title.split(' ').slice(0,4).join(' ')}</h4>
        <p class="sched-mini-subtitle">${getHeadlineFight(fightCard)}</p>
        <div class="sched-mini-footer">
          <span>${icons.calendar} ${dateStr}</span>
          <span>${icons.location} ${venue.split(',')[0]}</span>
        </div>
      </div>
    </div>
  `;
}

function cleanFightCard(fightCardStr) {
  if (!fightCardStr) return [];
  const lines = fightCardStr.split(/[\n,]+/);
  const fighters = [];
  
  lines.forEach(s => {
    // Remove bracketed text and trim
    let cleaned = s.replace(/\([^)]*\)/g, '').trim();
    if (!cleaned) return;
    
    const upper = cleaned.toUpperCase();
    if (upper.includes("MAIN CARD FIGHTERS") || 
        upper.includes("PRELIMINARY CARD FIGHTERS") ||
        upper.includes("PRELIMINARY CARD") ||
        upper.includes("EARLY PRELIM") ||
        upper === "MAIN CARD" || upper === "PRELIMS") {
      return;
    }
    
    // Check if line contains "vs." or "vs"
    if (cleaned.match(/\s+vs\.?\s+/i)) {
      const parts = cleaned.split(/\s+vs\.?\s+/i);
      fighters.push(parts[0].trim());
      if (parts[1]) fighters.push(parts[1].trim());
    } else {
      fighters.push(cleaned);
    }
  });
  
  return fighters;
}

function getHeadlineFight(fightCardStr) {
  const fighters = cleanFightCard(fightCardStr);
  if (fighters.length >= 2) return `${fighters[0]} vs ${fighters[1]}`;
  if (fighters.length === 1) return fighters[0];
  return 'Main Event';
}

function parseFightCardRows(fightCardStr) {
  const fighters = cleanFightCard(fightCardStr);
  const rows = [];
  
  for (let i = 0; i < fighters.length; i += 2) {
    const f1 = fighters[i];
    const f2 = fighters[i+1];
    if (f1 && f2) {
      rows.push({
        category: i === 0 ? "MAIN EVENT" : (i === 2 ? "CO-MAIN EVENT" : "MAIN CARD"),
        f1Name: f1, f1Record: "0-0-0",
        f2Name: f2, f2Record: "0-0-0"
      });
    } else if (f1) {
       rows.push({
        category: "PRELIMS",
        f1Name: f1, f1Record: "",
        f2Name: "TBA", f2Record: ""
      });
    }
  }
  return rows;
}

function renderEvents() {
  const upcomings = state.events.filter(e => e.status !== "Ended");
  const pastEvents = state.events.filter(e => e.status === "Ended");
  const featuredEvent = upcomings[0] || pastEvents[0] || state.events[0];
  const thisMonthCount = state.events.filter(e => new Date(e.eventDate).getMonth() === new Date().getMonth()).length;

  let heroContent = '<div class="empty">No events scheduled.</div>';
  let fightCardPanel = '';

  if (featuredEvent) {
    const bgImg = featuredEvent.thumbnail || 'assets/fan-khabib-vs-conor.png';
    const safeDate = featuredEvent.eventDate ? new Date(featuredEvent.eventDate) : new Date();
    const dateStr = isNaN(safeDate.getTime()) ? 'TBA' : safeDate.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
    const isLive = featuredEvent.status === "Live";
    
    heroContent = `
      <div class="sched-hero" style="background-image: url('${bgImg}');">
        <div class="sched-hero-overlay"></div>
        <div class="sched-hero-content">
          <div class="sched-hero-eyebrow">FEATURED EVENT</div>
          <h2 class="sched-hero-title">${featuredEvent.title}</h2>
          <p class="sched-hero-subtitle">${getHeadlineFight(featuredEvent.fight_card)}</p>
          <div class="sched-hero-meta">
            <div class="sched-meta-item">${icons.calendar} ${dateStr}</div>
            <div class="sched-meta-item">${icons.location} ${featuredEvent.venue || 'TBA'}</div>
            <div class="sched-meta-item countdown">${icons.time} ${isLive ? 'LIVE NOW' : countdown(featuredEvent.eventDate)} Until Event</div>
          </div>
          <div class="sched-hero-actions">
            <button class="btn-icon btn-solid-red" onclick="setRoute('stream','${featuredEvent.id}')">
              ${icons.play} ${isLive ? 'Watch Live' : 'Watch Trailer'}
            </button>
            <button class="btn-icon btn-outline-white" onclick="setRoute('stream','${featuredEvent.id}')">
              ${icons.list} View Fight Card
            </button>
            <button class="btn-icon btn-outline-white" onclick="toast('Ticketing integration coming soon!')">
              ${icons.ticket} Buy Tickets
            </button>
          </div>
        </div>
      </div>
    `;

    const rows = parseFightCardRows(featuredEvent.fight_card || "Rivera,Kwan,Santos,Cole,Adesina,Volkov");
    
    fightCardPanel = `
      <div class="sched-fight-card-panel">
        ${rows.length > 0 ? rows.map(row => `
          <div class="fc-category">${row.category}</div>
          <div class="fc-row">
            <div class="fc-fighter left">
              <div class="fc-name">${row.f1Name}</div>
              <div class="fc-record">${row.f1Record}</div>
            </div>
            <div class="fc-vs">VS</div>
            <div class="fc-fighter right">
              <div class="fc-name">${row.f2Name}</div>
              <div class="fc-record">${row.f2Record}</div>
            </div>
          </div>
        `).join('') : '<div class="empty" style="padding: 40px 0;">Fight card to be announced.</div>'}
        <button class="fc-btn-full" onclick="setRoute('stream','${featuredEvent.id}')">View Complete Fight Card</button>
      </div>
    `;
  }

  return `
    <main class="schedule-page-pro">
      
      <div class="sched-filters">
        <div class="sched-tabs">
          <button class="sched-tab active">All Events</button>
          <button class="sched-tab">PPV</button>
          <button class="sched-tab">Fight Night</button>
          <button class="sched-tab">Upcoming</button>
          <button class="sched-tab">This Month</button>
          <button class="sched-tab">Past Events</button>
        </div>
        <div class="sched-stats">
          <div class="sched-stat-item">
            <div class="sched-stat-icon">${icons.calendar}</div>
            <div class="sched-stat-text">
              <span class="sched-stat-val">${upcomings.length}</span>
              <span class="sched-stat-lbl">Upcoming Events</span>
            </div>
          </div>
          <div class="sched-stat-item">
            <div class="sched-stat-icon">${icons.trophy}</div>
            <div class="sched-stat-text">
              <span class="sched-stat-val">3</span>
              <span class="sched-stat-lbl">Title Fights</span>
            </div>
          </div>
          <div class="sched-stat-item">
            <div class="sched-stat-icon">${icons.calendar}</div>
            <div class="sched-stat-text">
              <span class="sched-stat-val">${thisMonthCount}</span>
              <span class="sched-stat-lbl">This Month</span>
            </div>
          </div>
          <div class="sched-stat-item">
            <div class="sched-stat-icon">${icons.star}</div>
            <div class="sched-stat-text">
              <span class="sched-stat-val">${state.events.length}</span>
              <span class="sched-stat-lbl">Total Events</span>
            </div>
          </div>
        </div>
      </div>

      ${heroContent}

      <div class="sched-layout-split">
        <div class="sched-main-col">
          <div class="sched-section-header">
            <h3 class="sched-section-title">UPCOMING EVENTS</h3>
            <a href="#" class="sched-section-link">View All</a>
          </div>
          <div class="sched-mini-grid">
            ${upcomings.slice(0, 4).map(e => schedMiniCard(e, false)).join('')}
          </div>
        </div>
        <div class="sched-side-col">
          <div class="sched-section-header">
            <h3 class="sched-section-title">FEATURED FIGHT CARD</h3>
            <a href="#" class="sched-section-link" onclick="setRoute('stream','${featuredEvent?.id}')">View Full Card</a>
          </div>
          ${fightCardPanel}
        </div>
      </div>

      <div class="sched-section-header" style="margin-top: 20px;">
        <h3 class="sched-section-title">PAST EVENTS</h3>
        <a href="#" class="sched-section-link">View All</a>
      </div>
      <div class="sched-mini-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
        ${pastEvents.slice(0, 4).map(e => schedMiniCard(e, true)).join('')}
      </div>

      <div class="sched-bottom-banner">
        <div class="banner-feature">
          <div class="banner-icon">${icons.play}</div>
          <div class="banner-text">
            <h4>Exclusive Fights</h4>
            <p>Watch PPVs and Fight Nights</p>
          </div>
        </div>
        <div class="banner-feature">
          <div class="banner-icon">${icons.calendar}</div>
          <div class="banner-text">
            <h4>Live & On Demand</h4>
            <p>Stream anytime, anywhere</p>
          </div>
        </div>
        <div class="banner-feature">
          <div class="banner-icon">${icons.max}</div>
          <div class="banner-text">
            <h4>Multi-Device</h4>
            <p>Watch on all your devices</p>
          </div>
        </div>
        <div class="banner-feature">
          <div class="banner-icon">${icons.lock}</div>
          <div class="banner-text">
            <h4>Secure & Reliable</h4>
            <p>High quality, no interruptions</p>
          </div>
        </div>
      </div>

    </main>
  `;
}

function isDirectVideoUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url, location.origin);
    return parsed.pathname.startsWith("/uploads/") || /\.(m3u8|mp4|webm|mov|m4v)$/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

function renderStream() {
  if (!authUser) {
    return `
      <main class="panel panel-pad">
        <p class="eyebrow">Live stream</p>
        <h2 class="section-title">Sign in to watch</h2>
        <p class="muted">Fight streams are available to signed-in users.</p>
        <button class="primary" onclick="setRoute('profile')">${icons.user}Go to Login</button>
      </main>
    `;
  }

  const event = state.events.find((item) => item.id === activeEventId) || state.events.find((item) => item.status === "Live") || state.events[0];
  if (!event) return '<div class="empty">No stream selected.</div>';
  const src = event.streamUrl || "";
  const isVideo = isDirectVideoUrl(src);
  const encodedStreamUrl = encodeURIComponent(src).replace(/'/g, "%27");

  return `
    <main class="stream-layout">
      <section class="player-frame">
        <div class="video-stage" ${posterStyle(event)}>
          ${isVideo
            ? `<video id="videoPlayer" src="${src}" controls playsinline preload="metadata" onerror="handlePlayerError()"></video>`
            : `<div class="link-player"><p class="eyebrow">External link</p><h2>${event.title}</h2><p>This event uses an external webpage. Open it to watch the authorized broadcast.</p><button class="primary" onclick="openStreamLink('${encodedStreamUrl}')">${icons.play}Open Link</button></div>`}
          <div class="video-overlay">
            ${eventBadge(event)}
            <span class="badge">${event.viewerCount.toLocaleString()} watching</span>
          </div>
        </div>
        <div class="player-controls">
          <select class="secondary" aria-label="Stream quality" onchange="toast('Quality set to ' + this.value)">
            <option>Auto HD</option>
            <option>1080p</option>
            <option>720p</option>
            <option>480p</option>
          </select>
          ${isVideo ? `<button class="secondary" onclick="document.getElementById('videoPlayer').requestFullscreen?.()">${icons.max}Full Screen</button>` : ""}
          <button class="secondary" onclick="shareEvent('${event.id}')">${icons.share}Share</button>
          <button class="secondary" onclick="toggleFavorite('${event.id}')">Favorite</button>
        </div>
      </section>
      <aside class="panel panel-pad">
        <p class="eyebrow">Live stream</p>
        <h2 class="section-title">${event.title}</h2>
        <p class="muted">${event.venue} · ${formatDate(event.eventDate)}</p>
        ${event.description ? `<p style="font-size: 0.95rem; line-height: 1.5; color: #ccc; margin-bottom: 24px;">${event.description}</p>` : ''}
        <h3>Fight Card</h3>
        <div class="fight-card" style="display:flex; flex-direction:column; gap:8px;">
          ${parseFightCardRows(event.fightCard || event.fight_card || "Rivera,Kwan,Santos,Cole,Adesina,Volkov").map(row => `
            <div class="fight-row" style="padding:10px; background:#1a1a1a; border-radius:6px; border-left:3px solid #e10600;">
              <div style="font-size:0.75rem; color:#e10600; font-weight:700; margin-bottom:4px; text-transform:uppercase;">${row.category}</div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
                <span style="flex:1; text-align:right;">${row.f1Name}</span>
                <span style="color:#888; font-size:0.8rem; font-weight:bold; margin:0 12px;">VS</span>
                <span style="flex:1; text-align:left;">${row.f2Name}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </aside>
    </main>
  `;
}

function renderLive() {
  const lives = state.events.filter(e => e.status === "Live") || [];
  const upcomings = state.events.filter(e => e.status !== "Ended" && e.status !== "Live") || [];
  return `
    <main class="live-events-pro">
      <div class="row header-row" style="margin-bottom: 20px;">
        <div style="display:flex; align-items:center; gap: 12px;">
          <h2 style="font-size: 1.5rem; text-transform: uppercase;">LIVE NOW</h2>
          <div style="display:flex; align-items:center; gap:6px; color:#e10600; font-size:0.85rem; font-weight:600;">
            <div style="width:8px; height:8px; background:#e10600; border-radius:50%; box-shadow: 0 0 8px #e10600;"></div>
            ${lives.length} LIVE EVENTS
          </div>
        </div>
        <a href="#" style="color:#a7a7a7; text-decoration:none; font-size:0.9rem;">View All</a>
      </div>
      
      <div class="live-grid">
        ${lives.map((event, i) => `
          <div class="live-card ${i === 0 ? 'featured' : ''}" style="--poster: url('${event.thumbnail || 'assets/fan-khabib-vs-conor.png'}')" onclick="setRoute('stream','${event.id}')">
            <div class="card-overlay"></div>
            <div class="card-content">
              <div class="card-badges">
                <span class="badge live" style="background:#e10600; color:#fff; border:none; padding:4px 8px;">LIVE</span>
                <span class="badge" style="background:rgba(0,0,0,0.6); border:none; color:#fff; padding:4px 8px;">${event.viewerCount ? event.viewerCount.toLocaleString() : '1,000'}</span>
              </div>
              <div class="card-bottom">
                <p class="subtitle" style="color:#a7a7a7; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 4px;">UFC EVENT</p>
                <h3 style="font-size: ${i===0 ? '2rem' : '1.2rem'}; text-transform:uppercase; margin-bottom: 16px;">${event.title}</h3>
                <div style="display:flex; gap: 8px;">
                  <button class="btn-red" style="padding: 8px 16px;">Watch Now</button>
                  <button class="btn-outline" style="padding: 8px; border-radius: 8px;">+</button>
                </div>
              </div>
            </div>
          </div>
        `).join('') || '<div class="empty">No live events at the moment.</div>'}
      </div>

      <div class="row header-row" style="margin-top: 48px; margin-bottom: 20px;">
        <h2 style="font-size: 1.5rem; text-transform: uppercase;">UPCOMING EVENTS</h2>
        <a href="#" style="color:#a7a7a7; text-decoration:none; font-size:0.9rem;">View Schedule</a>
      </div>

      <div class="upcoming-grid">
        ${upcomings.slice(0,3).map(event => `
          <div class="upcoming-card" style="--poster: url('${event.thumbnail || 'assets/fan-khabib-vs-conor.png'}')" onclick="setRoute('stream','${event.id}')">
            <div class="card-overlay"></div>
            <div class="card-content">
              <div style="display:flex; justify-content:space-between;">
                <p style="color:#a7a7a7; font-size:0.8rem;">${event.title.split(' ')[0]}</p>
                <div style="text-align:center;">
                  <span style="color:#e10600; font-weight:bold; font-size:0.9rem;">${new Date(event.eventDate).toLocaleDateString('en-US', {month:'short'}).toUpperCase()}</span>
                  <div style="font-size:1.5rem; font-weight:bold; line-height:1;">${new Date(event.eventDate).getDate()}</div>
                  <span style="color:#a7a7a7; font-size:0.8rem;">SAT</span>
                </div>
              </div>
              <h3 style="font-size:1.5rem; width: 60%; line-height: 1.1; margin-top: -20px; text-transform:uppercase;">${event.title}</h3>
              
              <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top: auto;">
                <div style="display:flex; gap:16px; text-align:center;">
                  <div>
                    <div style="font-size:1.2rem; font-weight:bold;">03</div>
                    <div style="font-size:0.7rem; color:#a7a7a7;">DAYS</div>
                  </div>
                  <div>
                    <div style="font-size:1.2rem; font-weight:bold;">14</div>
                    <div style="font-size:0.7rem; color:#a7a7a7;">HRS</div>
                  </div>
                  <div>
                    <div style="font-size:1.2rem; font-weight:bold;">45</div>
                    <div style="font-size:0.7rem; color:#a7a7a7;">MIN</div>
                  </div>
                </div>
                <button class="btn-red">Buy PPV</button>
              </div>
            </div>
          </div>
        `).join('') || '<div class="empty">No upcoming events.</div>'}
      </div>
    </main>
  `;
}



function authForm() {
  const isLogin = authMode === "login";
  return `
    <div class="auth-panel">
      <div class="auth-tabs">
        <button type="button" class="secondary ${isLogin ? "active" : ""}" onclick="setAuthMode('login')">Sign In</button>
        <button type="button" class="secondary ${!isLogin ? "active" : ""}" onclick="setAuthMode('signup')">Create Account</button>
      </div>
      <form class="auth-form panel panel-pad" onsubmit="${isLogin ? "loginUser(event)" : "signUpUser(event)"}">
        ${!isLogin ? `
          <label>
            Display name
            <input name="displayName" type="text" placeholder="Your name" />
          </label>
        ` : ""}
        <label>
          Email
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input name="password" type="password" required minlength="6" placeholder="At least 6 characters" />
        </label>
        <button class="primary" type="submit">${isLogin ? "Sign In" : "Create Account"}</button>
      </form>
    </div>
  `;
}

function renderProfile() {
  if (!authUser) {
    return `
      <div class="auth-split">
        <div class="auth-left">
          <div class="auth-left-overlay"></div>
          <div class="auth-left-content">
            <img src="${LOGO_IMAGE}" alt="UFC Logo" style="height: 60px;" />
            <h1 style="color: #fff; font-size: 3rem; margin-top: 40px; text-transform: uppercase;">WELCOME BACK</h1>
            <ul class="auth-bullets">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> Watch every fight live.</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"/></svg> Access exclusive content.</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> Join the UFC community.</li>
            </ul>
          </div>
        </div>
        <div class="auth-right">
          <div class="auth-form-pro">
            <h2>${authMode === "userLogin" ? "Sign In" : "Create Account"}</h2>
            <p>${authMode === "userLogin" ? "Welcome back! Please sign in to continue." : "Sign up to join the action."}</p>
            <div id="auth-message" style="margin-bottom: 16px; color: #e10600; font-size: 0.9rem; font-weight: 500; text-align: center;"></div>
            <form onsubmit="${authMode === "userLogin" ? "loginUser(event)" : "signUpUser(event)"}">
              ${authMode === "userSignup" ? `
                <div class="pro-input-group">
                  <label for="auth-name">Display Name</label>
                  <input name="displayName" type="text" required placeholder="Enter your name" id="auth-name" />
                </div>
              ` : ""}
              <div class="pro-input-group">
                <label for="auth-email">Email</label>
                <input name="email" type="email" required placeholder="Enter your email" id="auth-email" />
              </div>
              <div class="pro-input-group">
                <label for="auth-password">Password</label>
                <input name="password" type="password" required minlength="6" placeholder="Enter your password" id="auth-password" />
              </div>
              <div class="auth-options">
                <label><input type="checkbox" /> Remember Me</label>
                <a href="#">Forgot Password?</a>
              </div>
              <button class="btn-red" type="submit" style="width:100%; justify-content:center;">${authMode === "userLogin" ? "Sign In" : "Create Account"}</button>
            </form>
            <div class="divider">or continue with email</div>
            <p style="text-align:center; margin-top: 24px; margin-bottom: 0;">${authMode === "userLogin" ? "Don't have an account? <span style='color:#e10600;cursor:pointer;' onclick='setAuthMode(\"userSignup\")'>Create Account</span>" : "Already have an account? <span style='color:#e10600;cursor:pointer;' onclick='setAuthMode(\"userLogin\")'>Sign In</span>"}</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <main class="panel panel-pad" style="max-width: 600px; margin: 40px auto;">
      <p class="eyebrow">Account</p>
      <h2 class="section-title">${isAdmin() ? "Admin Profile" : "Fan Profile"}</h2>
      <div class="profile-card" style="display:flex; align-items:center; gap: 24px;">
        <img src="${userProfile?.avatar_url || 'assets/fan-khabib-nurmagomedov.png'}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" alt="Avatar" />
        <div>
          <strong>${userProfile?.display_name || authUser.email}</strong>
          <span class="muted" style="display:block;">${authUser.email}</span>
          <span class="badge ${isAdmin() ? "live" : ""}" style="margin-top:8px; display:inline-block;">${isAdmin() ? "Admin" : "Fan"}</span>
        </div>
      </div>
      
      <form class="auth-form-pro" style="margin-top: 32px;" onsubmit="updateProfile(event)">
        <h3>Edit Profile</h3>
        <div id="profile-message" style="margin-bottom: 16px; font-size: 0.9rem; font-weight: 500;"></div>
        
        <div class="pro-input-group">
          <label for="avatar-upload">Profile Picture</label>
          <input name="avatar" type="file" id="avatar-upload" accept="image/*" />
        </div>

        <div class="pro-input-group">
          <label for="display-name">Display Name</label>
          <input name="displayName" type="text" id="display-name" value="${userProfile?.display_name || ""}" required />
        </div>
        <button class="btn-red" type="submit" style="width: auto;">Save Changes</button>
      </form>

      <div class="row" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #333;">
        ${isAdmin() ? `<button class="primary" onclick="setRoute('admin')">${icons.shield}Admin Panel</button>` : `<button class="secondary" onclick="setRoute('live')">${icons.play}Watch Stream</button>`}
        <button class="secondary" onclick="logoutUser()">${icons.logout}Sign Out</button>
      </div>
    </main>
  `;
}

function eventForm(event) {
  const value = event || adminEventDraft;
  return `
    <form class="pro-form" onsubmit="saveEvent(event)" oninput="updateAdminEventDraft(this)">
      <input type="hidden" name="id" value="${value.id || ""}" />
      
      <div class="pro-form-group">
        <label>Title</label>
        <input class="pro-input" name="title" required value="${value.title || ""}" placeholder="UFC 329: McGregor vs. Holloway 2" />
      </div>
      
      <div class="pro-form-group">
        <label>Fight Card (Fighters)</label>
        <textarea class="pro-input" name="fightCard" rows="2" placeholder="Main Card FightersConor...">${value.fightCard || value.fight_card || ""}</textarea>
      </div>
      
      <div class="pro-form-group">
        <label>Description</label>
        <textarea class="pro-input" name="description" required rows="3">${value.description || ""}</textarea>
      </div>
      
      <div class="pro-form-group">
        <label>Venue</label>
        <input class="pro-input" name="venue" required value="${value.venue || ""}" placeholder="T-Mobile Arena in Las Vegas" />
      </div>
      
      <div class="pro-form-row">
        <div class="pro-form-group" style="flex: 1;">
          <label>Event Date</label>
          <div class="pro-input-with-icon">
            <span class="icon-calendar">${icons.calendar}</span>
            <input class="pro-input" name="eventDate" type="datetime-local" required value="${value.eventDate ? toLocalInput(value.eventDate) : ""}" />
          </div>
        </div>
        <div class="pro-form-group" style="flex: 1;">
          <label>Status</label>
          <div class="pro-select-wrapper">
            <span class="status-dot ${value.status === 'Live' ? 'live' : ''}"></span>
            <select class="pro-input pro-select" name="status">
              ${["Upcoming", "Live", "Ended"].map((status) => `<option ${value.status === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
      
      <div class="pro-form-group">
        <label>Viewer Count</label>
        <input class="pro-input" name="viewerCount" type="number" min="0" value="${value.viewerCount || 0}" />
      </div>
      
      <div class="pro-form-row">
        <div class="pro-form-group" style="flex: 1;">
          <label>Thumbnail Image</label>
          <label class="pro-file-upload">
            <input name="thumbnailFile" type="file" accept="image/*" style="display:none;" />
            <div class="upload-btn">
              ${icons.upload} Choose File
            </div>
            <span class="upload-text">No file selected<br/><small>Recommended: 1200x675px (16:9)</small></span>
          </label>
        </div>
        <div class="pro-form-group" style="flex: 1;">
          <label>Thumbnail URL (Fallback)</label>
          <div class="pro-input-with-icon">
             <span class="icon-link">${icons.link}</span>
             <input class="pro-input" name="thumbnail" value="${value.thumbnail || ""}" placeholder="https://..." />
          </div>
        </div>
      </div>
      
      <div class="pro-form-row">
        <div class="pro-form-group" style="flex: 1;">
          <label>Stream URL</label>
          <input class="pro-input" name="streamUrl" value="${value.streamUrl || ""}" placeholder="https://... or upload a video" />
        </div>
        <div class="pro-form-group" style="flex: 1;">
          <label>Upload Fight Video</label>
          <label class="pro-file-upload">
            <input name="videoFile" type="file" accept="video/*" style="display:none;" />
            <div class="upload-btn">
              ${icons.upload} Choose File
            </div>
            <span class="upload-text">No file selected<br/><small>MP4, WebM, or MOV (Max 4GB)</small></span>
          </label>
        </div>
      </div>
      
      <button class="btn-solid-red form-submit-btn" type="submit">
        ${icons.save} Save Event
      </button>
    </form>
  `;
}

function updateAdminEventDraft(form) {
  if (!form) return;
  const formData = new FormData(form);
  adminEventDraft = {
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    venue: formData.get("venue"),
    eventDate: formData.get("eventDate"),
    status: formData.get("status"),
    viewerCount: formData.get("viewerCount"),
    fightCard: formData.get("fightCard"),
    thumbnail: formData.get("thumbnail"),
    streamUrl: formData.get("streamUrl")
  };
}

function renderAdminDashboard() {
  return `
        <div class="admin-header">
          <h2>Dashboard</h2>
          <div class="date-picker">May 22 - May 29, 2024</div>
        </div>
        <div class="admin-top-stats">
          <div class="stat-box-pro">
            <h4>Active Users</h4>
            <p class="value">${adminStats.active_users.toLocaleString()}</p>
            <p class="trend"><span class="green">+12.5%</span> vs last 7 days</p>
          </div>
          <div class="stat-box-pro">
            <h4>Revenue</h4>
            <p class="value">$${parseFloat(adminStats.total_revenue || 0).toLocaleString()}</p>
            <p class="trend"><span class="green">+8.3%</span> vs last 7 days</p>
          </div>
          <div class="stat-box-pro">
            <h4>Streams Live</h4>
            <p class="value">${adminStats.live_events.toLocaleString()}</p>
            <p class="trend"><span style="color:#f8c14a">+2</span> vs last 7 days</p>
          </div>
          <div class="stat-box-pro">
            <h4>PPV Sales</h4>
            <p class="value">${adminStats.total_ppv_sales.toLocaleString()}</p>
            <p class="trend"><span class="green">+15.7%</span> vs last 7 days</p>
          </div>
        </div>
        <div class="admin-charts">
          <div class="chart-box">
            <div class="chart-header">
              <h3>User Growth</h3>
              <span>+12.5%</span>
            </div>
            <div class="fake-line-chart"></div>
          </div>
          <div class="chart-box">
            <div class="chart-header">
              <h3>Revenue Overview</h3>
              <span>+8.3%</span>
            </div>
            <div class="fake-bar-chart">
              <div class="fake-bar" style="height: 30%"></div>
              <div class="fake-bar" style="height: 20%"></div>
              <div class="fake-bar" style="height: 40%"></div>
              <div class="fake-bar" style="height: 50%"></div>
              <div class="fake-bar" style="height: 45%"></div>
              <div class="fake-bar" style="height: 70%"></div>
              <div class="fake-bar" style="height: 90%"></div>
            </div>
          </div>
        </div>
  `;
}

function renderAdminUsers() {
  return `
    <div class="admin-header"><h2>Users Directory</h2></div>
    <div class="panel panel-pad" style="margin-top: 24px;">
      <table style="width:100%; text-align:left; border-collapse:collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #333;">
            <th style="padding:10px;">ID</th>
            <th style="padding:10px;">Email</th>
            <th style="padding:10px;">Role</th>
            <th style="padding:10px;">Joined</th>
          </tr>
        </thead>
        <tbody>
          ${adminUsersList.length ? adminUsersList.map(u => `
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding:10px;font-size:0.8rem;color:#a7a7a7">${u.id}</td>
              <td style="padding:10px;">${u.email}</td>
              <td style="padding:10px;">${u.role}</td>
              <td style="padding:10px;font-size:0.8rem;">${new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" style="padding:10px;text-align:center;">No users found or loading...</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminEvents() {
  return `
    <div class="admin-header-pro">
      <div>
        <h2>Event Management</h2>
        <p>Create and manage UFC events, fight cards, and event details.</p>
      </div>
      <button class="btn-outline-white-pro">
        ${icons.calendar} View Calendar
      </button>
    </div>
    
    <div class="admin-events-grid">
      
      <div class="admin-panel-pro">
        <div class="admin-panel-header">
          <div class="icon-square-red">${icons.calendar}</div>
          <div class="header-text">
            <h3>Create Event</h3>
            <p>Add a new UFC event to the platform.</p>
          </div>
        </div>
        <div class="admin-panel-body">
          ${eventForm()}
        </div>
      </div>
      
      <div class="admin-panel-pro">
        <div class="admin-panel-header">
          <div class="icon-square-red">${icons.calendar}</div>
          <div class="header-text">
            <h3>Manage Events</h3>
            <p>View, edit, and manage existing events.</p>
          </div>
        </div>
        
        <div class="pro-toolbar">
          <div class="pro-search">
            ${icons.search}
            <input type="text" placeholder="Search events..." />
          </div>
          <div class="pro-filters">
            <select class="pro-select-mini"><option>All Status</option><option>Upcoming</option><option>Live</option><option>Ended</option></select>
            <select class="pro-select-mini"><option>Newest First</option><option>Oldest First</option></select>
          </div>
        </div>
        
        <div class="admin-panel-body" style="padding-top: 0; padding-bottom: 0;">
          ${state.events.length ? state.events.map(event => `
            <div class="pro-event-list-item">
              <div class="pro-event-img" style="background-image: url('${event.thumbnail || "assets/ufc-front-page.jpg"}');"></div>
              <div class="pro-event-info">
                <h4>${event.title}</h4>
                <div class="pro-event-meta">
                  <span>${icons.calendar} ${new Date(event.eventDate).toLocaleString('en-US', {dateStyle:'short', timeStyle:'short'})}</span>
                  <span>${icons.location} ${event.venue || 'TBA'}</span>
                </div>
                <div class="pro-event-meta" style="margin-top: 4px;">
                  <span class="status-badge ${event.status === 'Live' ? 'live' : 'upcoming'}">
                    <span class="status-dot"></span>${event.status}
                  </span>
                  <span>${icons.user} ${event.viewerCount || 0} Viewers</span>
                  <span>${icons.time} Added on ${new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div class="pro-event-actions">
                <button class="btn-outline-white-pro" onclick="editEvent('${event.id}')">${icons.edit} Edit</button>
                ${event.status !== 'Live' ? `<button class="btn-outline-white-pro" onclick="publishLive('${event.id}')">${icons.broadcast} Set Live</button>` : ''}
                <button class="btn-outline-red-pro" onclick="deleteEvent('${event.id}')">${icons.trash} Delete</button>
              </div>
            </div>
          `).join('') : '<div class="empty">No events found.</div>'}
        </div>
        
        <div class="pagination-pro">
          <div class="page-controls">
            <button>&lt;</button>
            <button class="active">1</button>
            <button>&gt;</button>
          </div>
          <div class="page-info">Showing 1 to ${state.events.length} of ${state.events.length} events</div>
        </div>
        
      </div>
      
    </div>
  `;
}

function renderAdmin() {
  if (!isSupabaseReady()) return `<main class="panel panel-pad">Supabase required</main>`;
  if (!authUser) {
    return `
      <div class="auth-split">
        <div class="auth-left">
          <div class="auth-left-overlay"></div>
          <div class="auth-left-content">
            <img src="${LOGO_IMAGE}" alt="UFC Logo" style="height: 60px;" />
            <h1 style="color: #fff; font-size: 3rem; margin-top: 40px; text-transform: uppercase;">ADMIN PORTAL</h1>
            <ul class="auth-bullets">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Manage Events securely.</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"/></svg> Publish streams instantly.</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z"/></svg> Analyze platform data.</li>
            </ul>
          </div>
        </div>
        <div class="auth-right">
          <div class="auth-form-pro">
            <h2>Admin Access</h2>
            <p>Please enter your credentials to manage the platform.</p>
            <div id="admin-auth-message" style="margin-bottom: 16px; color: #e10600; font-size: 0.9rem; font-weight: 500; text-align: center;"></div>
            <form onsubmit="loginAdmin(event)">
              <div class="pro-input-group">
                <label for="admin-email">Admin Email</label>
                <input name="email" type="email" required placeholder="admin@example.com" id="admin-email" />
              </div>
              <div class="pro-input-group">
                <label for="admin-password">Password</label>
                <input name="password" type="password" required minlength="6" placeholder="Enter your password" id="admin-password" />
              </div>
              <button class="btn-red" type="submit" style="width:100%; justify-content:center;">${icons.shield} Authenticate</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  if (!isAdmin()) {
    return `<main class="panel panel-pad"><h2 class="section-title">Admin access required</h2><button class="secondary" onclick="logoutUser()">Sign Out</button></main>`;
  }

  let mainContent = "";
  if (adminTab === "dashboard") mainContent = renderAdminDashboard();
  else if (adminTab === "users") mainContent = renderAdminUsers();
  else if (adminTab === "events") mainContent = renderAdminEvents();
  else mainContent = `<div class="admin-header"><h2>${adminTab.charAt(0).toUpperCase() + adminTab.slice(1)}</h2></div><div class="panel panel-pad" style="margin-top:24px;">This module is under construction.</div>`;

  return `
    <div class="admin-layout-pro">
      <nav class="admin-sidebar">
        <div class="admin-brand">
          <img src="${LOGO_IMAGE}" style="width:32px; height:20px; object-fit:contain;" />
          <h1>UFC <span>ADMIN</span></h1>
        </div>
        <div class="sidebar-links">
          <a class="sidebar-link ${adminTab === 'dashboard' ? 'active' : ''}" onclick="setAdminTab('dashboard')">${icons.home} Dashboard</a>
          <a class="sidebar-link ${adminTab === 'users' ? 'active' : ''}" onclick="setAdminTab('users')">${icons.user} Users</a>
          <a class="sidebar-link ${adminTab === 'subscriptions' ? 'active' : ''}" onclick="setAdminTab('subscriptions')">${icons.calendar} Subscriptions</a>
          <a class="sidebar-link ${adminTab === 'events' ? 'active' : ''}" onclick="setAdminTab('events')">${icons.calendar} Events</a>
          <a class="sidebar-link ${adminTab === 'streams' ? 'active' : ''}" onclick="setAdminTab('streams')">${icons.play} Streams</a>
          <a class="sidebar-link ${adminTab === 'revenue' ? 'active' : ''}" onclick="setAdminTab('revenue')">${icons.star} Revenue</a>
          <a class="sidebar-link ${adminTab === 'analytics' ? 'active' : ''}" onclick="setAdminTab('analytics')">${icons.star} Analytics</a>
          <div style="flex:1"></div>
          <a class="sidebar-link" onclick="setRoute('home')"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> Back to Website</a>
          <a class="sidebar-link" onclick="logoutUser()">${icons.logout} Log Out</a>
        </div>
      </nav>
      <main class="admin-main">
        ${mainContent}
      </main>
    </div>
  `;
}

function toLocalInput(value) {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function adminEvent(event) {
  return `
    <article class="admin-event">
      <div class="row"><div><h3>${event.title}</h3><p>${event.status} · ${formatDate(event.eventDate)}</p></div>${eventBadge(event)}</div>
      <div class="card-actions">
        <button class="secondary" onclick="editEvent('${event.id}')">Edit</button>
        <button class="secondary" onclick="publishLive('${event.id}')">Set Live</button>
        <button class="danger" onclick="deleteEvent('${event.id}')">Delete</button>
      </div>
    </article>
  `;
}

function renderFans() {
  return `
    <main class="fans-page">
      <div class="row header-row">
        <div>
          <p class="eyebrow">Fan Zone</p>
          <h2 class="section-title">Wallpapers & Photos</h2>
        </div>
      </div>
      <section class="fans-grid">
        ${fanWallpapers.map((wp) => {
          const isLiked = state.fanLikes.includes(wp.id);
          return `
            <article class="fan-card">
              <div class="fan-card-visual" style="background-image: url(${wp.src}); background-position: ${wp.position || "center"}">
                <div class="fan-card-overlay">
                  <button class="icon-button fav-btn ${isLiked ? "liked" : ""}" onclick="toggleFanFavorite(event, '${wp.id}')" title="Like photo">
                    ${isLiked ? icons.heartFilled : icons.heart}
                  </button>
                  <button class="icon-button max-btn" onclick="openLightbox('${wp.src}', '${wp.name} - ${wp.title}')" title="View Full Screen">
                    ${icons.max}
                  </button>
                </div>
              </div>
              <div class="fan-card-content">
                <div class="wp-meta">
                  <h3>${wp.name}</h3>
                  <p class="fan-nickname">${wp.nickname}</p>
                  <p class="muted">${wp.title}</p>
                  <dl class="fan-stats">
                    <div class="fan-stat"><dt>Style</dt><dd>${wp.style}</dd></div>
                    <div class="fan-stat"><dt>Record</dt><dd>${wp.record}</dd></div>
                  </dl>
                </div>
                <div class="wp-actions">
                  <a href="${wp.src}" download="${wp.id}-wallpaper.png" class="secondary download-btn" title="Download HD">
                    ${icons.download}<span>Download</span>
                  </a>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </section>
      <div id="lightboxModal" class="lightbox" onclick="closeLightbox(event)">
        <span class="lightbox-close" onclick="closeLightbox(event)">${icons.close}</span>
        <img id="lightboxImg" class="lightbox-content" src="" alt="Full Screen Preview" />
        <div id="lightboxCaption" class="lightbox-caption"></div>
      </div>
    </main>
  `;
}

async function loginUser(event) {
  event.preventDefault();
  const msgEl = document.getElementById("auth-message");
  if (msgEl) msgEl.textContent = "";
  
  const client = getSupabaseClient();
  if (!client) {
    if (msgEl) msgEl.textContent = "Supabase is not configured.";
    return;
  }
  
  const data = Object.fromEntries(new FormData(event.target));
  const { data: authData, error } = await client.auth.signInWithPassword({
    email: String(data.email).trim(),
    password: String(data.password)
  });
  
  if (error) {
    const text = error.message || error.error_description || JSON.stringify(error);
    if (msgEl) msgEl.textContent = text === "{}" ? "Invalid login credentials." : text;
    return;
  }
  
  await applySessionUser(authData.user);
  if (msgEl) {
    msgEl.style.color = "#00ff00";
    msgEl.textContent = "Signed in successfully.";
  }
}

async function signUpUser(event) {
  event.preventDefault();
  const msgEl = document.getElementById("auth-message");
  if (msgEl) msgEl.textContent = "";
  
  const client = getSupabaseClient();
  if (!client) {
    if (msgEl) msgEl.textContent = "Supabase is not configured.";
    return;
  }
  
  const data = Object.fromEntries(new FormData(event.target));
  const { error } = await client.auth.signUp({
    email: String(data.email).trim(),
    password: String(data.password),
    options: {
      data: {
        display_name: String(data.displayName || "").trim() || String(data.email).split("@")[0]
      }
    }
  });
  
  if (error) {
    const text = error.message || error.error_description || JSON.stringify(error);
    if (msgEl) msgEl.textContent = text === "{}" ? "Sign up failed." : text;
  } else {
    if (msgEl) {
      msgEl.style.color = "#00ff00";
      msgEl.textContent = "Account created. You can now sign in.";
    }
  }
}

async function loginAdmin(event) {
  event.preventDefault();
  const msgEl = document.getElementById("admin-auth-message");
  if (msgEl) msgEl.textContent = "";
  
  const client = getSupabaseClient();
  if (!client) {
    if (msgEl) msgEl.textContent = "Supabase is not configured.";
    return;
  }
  
  const data = Object.fromEntries(new FormData(event.target));
  const { data: authData, error } = await client.auth.signInWithPassword({
    email: String(data.email).trim(),
    password: String(data.password)
  });
  
  if (error) {
    const text = error.message || error.error_description || JSON.stringify(error);
    if (msgEl) msgEl.textContent = text === "{}" ? "Invalid admin credentials." : text;
    return;
  }

  await applySessionUser(authData.user);
  if (isAdmin()) {
    if (msgEl) {
      msgEl.style.color = "#00ff00";
      msgEl.textContent = "Admin signed in successfully.";
    }
    setRoute("admin");
  } else {
    if (msgEl) msgEl.textContent = "Access denied: Not an admin.";
  }
}

async function logoutUser() {
  const client = getSupabaseClient();
  if (client) await client.auth.signOut();
  authUser = null;
  userProfile = null;
  adminStats = { active_users: 0, live_events: 0, total_revenue: 0, total_ppv_sales: 0 };
  if (route === "admin") setRoute("profile");
  else render();
}

async function loginWithProvider(provider) {
  const client = getSupabaseClient();
  if (!client) {
    const msgEl = document.getElementById("auth-message");
    if (msgEl) msgEl.textContent = "Supabase is not configured.";
    return;
  }
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    const msgEl = document.getElementById("auth-message");
    if (msgEl) msgEl.textContent = error.message;
  }
}

async function fetchAdminStats() {
  const client = getSupabaseClient();
  if (!client || !isAdmin()) return;
  const { data, error } = await client.rpc('get_admin_stats');
  if (data && !error) {
    adminStats = data;
    if (route === 'admin') render();
  }
}

function setAuthMode(mode) {
  authMode = mode;
  render();
}

function setAdminTab(tab) {
  adminTab = tab;
  if (tab === "users") fetchAdminUsers();
  render();
}

function toggleNotifications() {
  const dropdown = document.getElementById("notifications-dropdown");
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  }
}

async function updateProfile(event) {
  event.preventDefault();
  const form = event.target;
  const msgEl = document.getElementById("profile-message");
  const btn = form.querySelector('button[type="submit"]');
  if (msgEl) {
    msgEl.textContent = "Saving...";
    msgEl.style.color = "#a7a7a7";
  }
  btn.disabled = true;

  const client = getSupabaseClient();
  if (!client || !authUser) return;

  const data = Object.fromEntries(new FormData(form));
  const newName = String(data.displayName).trim();
  let avatarUrl = userProfile?.avatar_url;

  try {
    const avatarFile = data.avatar;
    if (avatarFile && avatarFile.size > 0) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${authUser.id}-${Math.random()}.${fileExt}`;
      const filePath = `${authUser.id}/${fileName}`;
      
      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = client.storage
        .from('avatars')
        .getPublicUrl(filePath);

      avatarUrl = publicUrlData.publicUrl;
    }

    const { error } = await client
      .from("profiles")
      .update({ display_name: newName, avatar_url: avatarUrl })
      .eq("id", authUser.id);

    if (error) throw error;

    userProfile.display_name = newName;
    userProfile.avatar_url = avatarUrl;
    
    if (msgEl) {
      msgEl.style.color = "#00ff00";
      msgEl.textContent = "Profile updated successfully.";
    }
    setTimeout(() => {
      btn.disabled = false;
      render();
    }, 1000);
  } catch (err) {
    if (msgEl) {
      msgEl.style.color = "#e10600";
      msgEl.textContent = err.message || "Failed to update profile.";
    }
    btn.disabled = false;
  }
}

async function fetchAdminUsers() {
  const client = getSupabaseClient();
  if (!client || !isAdmin()) return;
  const { data, error } = await client.rpc('get_all_users');
  if (data && !error) {
    adminUsersList = data;
    if (route === 'admin' && adminTab === 'users') render();
  }
}

async function uploadEventThumbnail(file) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured.");
  const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".jpg";
  const path = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
  const { error } = await client.storage.from("event-thumbnails").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "image/jpeg"
  });
  if (error) throw error;
  const { data } = client.storage.from("event-thumbnails").getPublicUrl(path);
  return data.publicUrl;
}

async function uploadFightVideo(file) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase is not configured.");
  const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : ".mp4";
  const path = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
  const { error } = await client.storage.from("fight-videos").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "video/mp4"
  });
  if (error) throw error;
  const { data } = client.storage.from("fight-videos").getPublicUrl(path);
  return data.publicUrl;
}

async function saveEvent(submitEvent) {
  submitEvent.preventDefault();
  const client = getSupabaseClient();
  if (!client || !isAdmin()) return toast("Admin access is required.");
  const data = Object.fromEntries(new FormData(submitEvent.target));
  const previous = state.events.find((event) => event.id === data.id);
  try {
    let streamUrl = String(data.streamUrl || "").trim();
    let thumbnailUrl = String(data.thumbnail || "").trim();
    
    const thumbnailFile = submitEvent.target.elements.thumbnailFile?.files?.[0];
    if (thumbnailFile) {
      toast("Uploading event thumbnail...");
      thumbnailUrl = await uploadEventThumbnail(thumbnailFile);
    }
    
    const videoFile = submitEvent.target.elements.videoFile?.files?.[0];
    if (videoFile) {
      toast("Uploading fight video to Supabase...");
      streamUrl = await uploadFightVideo(videoFile);
    }
    
    const payload = {
      title: String(data.title).trim(),
      fight_card: String(data.fightCard || "").trim(),
      description: String(data.description).trim(),
      thumbnail: thumbnailUrl,
      stream_url: streamUrl,
      venue: String(data.venue).trim(),
      event_date: new Date(data.eventDate).toISOString(),
      status: data.status,
      viewer_count: Number(data.viewerCount || 0),
      theme: previous?.theme || posterThemes[state.events.length % posterThemes.length]
    };
    if (payload.status === "Live" && !payload.stream_url) {
      throw new Error("Upload a video or provide a stream URL before going live.");
    }
    if (payload.status === "Live") {
      await client.from("events").update({ status: "Upcoming" }).eq("status", "Live");
    }
    const query = previous
      ? client.from("events").update(payload).eq("id", previous.id)
      : client.from("events").insert(payload);
    const { error } = await query;
    if (error) throw error;
    await loadEvents();
    adminEventDraft = { id: "", title: "", description: "", thumbnail: "", streamUrl: "", venue: "", eventDate: "", status: "Upcoming", viewerCount: 0, fightCard: "" };
    toast(payload.status === "Live" ? "Event is live for everyone now." : "Event saved to Supabase.");
  } catch (error) {
    toast(error.message);
  }
}

function editEvent(id) {
  const event = state.events.find((item) => item.id === id);
  const holder = document.querySelector(".pro-form");
  if (!event || !holder) return;
  adminEventDraft = { ...event };
  holder.outerHTML = eventForm(adminEventDraft);
  
  // Scroll up to the form
  const formElement = document.querySelector(".pro-form");
  if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  toast("Event loaded for editing.");
}

async function publishLive(id) {
  const client = getSupabaseClient();
  if (!client || !isAdmin()) return toast("Admin access is required.");
  try {
    await client.from("events").update({ status: "Upcoming" }).eq("status", "Live");
    const { error } = await client.from("events").update({ status: "Live" }).eq("id", id);
    if (error) throw error;
    await loadEvents();
    toast("Event is live. Everyone can see it now.");
  } catch (error) {
    toast(error.message);
  }
}

async function deleteEvent(id) {
  const client = getSupabaseClient();
  if (!client || !isAdmin()) return toast("Admin access is required.");
  try {
    const { error } = await client.from("events").delete().eq("id", id);
    if (error) throw error;
    await loadEvents();
    toast("Event deleted from Supabase.");
  } catch (error) {
    toast(error.message);
  }
}

function toggleReminder(id) {
  const exists = state.reminders.includes(id);
  state.reminders = exists ? state.reminders.filter((item) => item !== id) : [...state.reminders, id];
  saveState();
  toast(exists ? "Reminder removed." : "Reminder set. Push notification queued.");
}

function toggleFavorite(id) {
  const exists = state.favorites.includes(id);
  state.favorites = exists ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  saveState();
  toast(exists ? "Removed from favorites." : "Added to favorites.");
}

async function shareEvent(id) {
  const event = state.events.find((item) => item.id === id);
  if (!event) return;
  const url = `${location.origin}${location.pathname}?event=${event.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: event.name || 'UFC Event',
        url: url
      });
      return;
    } catch (err) {
      console.log('Share aborted or failed:', err);
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => toast("Share link copied."))
      .catch(() => toast("Failed to copy link."));
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast("Share link copied.");
    } catch (err) {
      toast("Failed to copy link.");
    }
    document.body.removeChild(textArea);
  }
}

function openStreamLink(encodedUrl) {
  window.open(decodeURIComponent(encodedUrl), "_blank", "noopener,noreferrer");
}

function handlePlayerError() {
  toast("This video cannot play. Check that the Supabase video URL is public and valid.");
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function toggleFanFavorite(event, id) {
  event.stopPropagation();
  const exists = state.fanLikes.includes(id);
  state.fanLikes = exists ? state.fanLikes.filter((item) => item !== id) : [...state.fanLikes, id];
  saveState();
  toast(exists ? "Removed from wallpapers collection." : "Saved to wallpapers collection!");
  render();
}

function openLightbox(src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!modal || !img || !cap) return;
  img.src = src;
  cap.textContent = caption;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox(event) {
  if (event && event.target.id === "lightboxImg") return;
  const modal = document.getElementById("lightboxModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

const MOCK_RANKINGS = {
  "Pound-for-Pound": {
    acronym: "P4P",
    champion: {
      name: "Islam Makhachev",
      division: "Welterweight Champion",
      record: "28-1",
      koWins: 5,
      lastFightDate: "Nov 15, 2025",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "RUS",
      subWins: 12,
      decWins: 11,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Islam Makhachev", record: "28-1", lastFight: "Nov 15, 2025\nWin vs Della Maddalena", movement: "-" },
      { rank: 2, name: "Alexander Volkanovski", record: "28-4", lastFight: "Apr 2026\nWin vs Lopes", movement: "-" },
      { rank: 3, name: "Petr Yan", record: "20-5", lastFight: "Mar 2026\nWin vs O'Malley", movement: "-" },
      { rank: 4, name: "Justin Gaethje", record: "28-5", lastFight: "Jun 14, 2026\nWin vs Topuria", movement: "-" },
      { rank: 5, name: "Ilia Topuria", record: "18-1", lastFight: "Jun 14, 2026\nLoss vs Gaethje", movement: "-" },
      { rank: 6, name: "Tom Aspinall", record: "16-3", lastFight: "Jan 2026\nWin vs Gane", movement: "-" },
      { rank: 7, name: "Dricus du Plessis", record: "24-3", lastFight: "Feb 2026\nLoss vs Strickland", movement: "-" },
      { rank: 8, name: "Magomed Ankalaev", record: "22-1-1", lastFight: "Mar 2026\nWin vs Pereira", movement: "-" },
      { rank: 9, name: "Alexandre Pantoja", record: "30-6", lastFight: "May 2026\nLoss vs Van", movement: "-" },
      { rank: 10, name: "Merab Dvalishvili", record: "20-5", lastFight: "Jan 2026\nWin vs Nurmagomedov", movement: "-" },
      { rank: 11, name: "Sean O'Malley", record: "20-3", lastFight: "Jun 2026\nWin vs Zahabi", movement: "-" },
      { rank: 12, name: "Ciryl Gane", record: "14-3", lastFight: "Jun 2026\nWin vs Pereira", movement: "-" },
      { rank: 13, name: "Sean Strickland", record: "31-7", lastFight: "May 2026\nWin vs Chimaev", movement: "-" },
      { rank: 14, name: "Khamzat Chimaev", record: "15-1", lastFight: "May 2026\nLoss vs Strickland", movement: "-" },
      { rank: 15, name: "Joshua Van", record: "16-2", lastFight: "May 2026\nWin vs Pantoja", movement: "-" }
    ]
  },
  "Women's Pound-for-Pound": {
    acronym: "WP4P",
    champion: {
      name: "Valentina Shevchenko",
      division: "Flyweight Champion",
      record: "26-4-1",
      koWins: 8,
      lastFightDate: "Feb 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "KGZ",
      subWins: 7,
      decWins: 11,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Valentina Shevchenko", record: "26-4-1", lastFight: "Feb 2026\nWin vs Fiorot", movement: "-" },
      { rank: 2, name: "Kayla Harrison", record: "19-1", lastFight: "Oct 2025\nWin vs Peña", movement: "-" },
      { rank: 3, name: "Zhang Weili", record: "26-4", lastFight: "Apr 2026\nLoss vs Jandiroba", movement: "-" },
      { rank: 4, name: "Natália Silva", record: "20-5-1", lastFight: "Mar 2026\nWin vs Blanchfield", movement: "-" },
      { rank: 5, name: "Manon Fiorot", record: "13-2", lastFight: "Feb 2026\nLoss vs Shevchenko", movement: "-" },
      { rank: 6, name: "Mackenzie Dern", record: "16-5", lastFight: "Apr 2026\nWin vs Weili", movement: "-" },
      { rank: 7, name: "Alexa Grasso", record: "17-5-1", lastFight: "Mar 2026\nWin vs Namajunas", movement: "-" },
      { rank: 8, name: "Erin Blanchfield", record: "14-2", lastFight: "Mar 2026\nLoss vs Silva", movement: "-" },
      { rank: 9, name: "Rose Namajunas", record: "14-7", lastFight: "Mar 2026\nLoss vs Grasso", movement: "-" },
      { rank: 10, name: "Jasmine Jasudavicius", record: "15-3", lastFight: "May 2026\nWin vs Maverick", movement: "-" },
      { rank: 11, name: "Virna Jandiroba", record: "22-4", lastFight: "Apr 2026\nWin vs Weili", movement: "-" },
      { rank: 12, name: "Amanda Lemos", record: "15-5-1", lastFight: "Feb 2026\nWin vs Gomes", movement: "-" },
      { rank: 13, name: "Tracy Cortez", record: "13-2", lastFight: "Jan 2026\nWin vs O'Neill", movement: "-" },
      { rank: 14, name: "Julianna Peña", record: "13-6", lastFight: "Oct 2025\nLoss vs Harrison", movement: "-" },
      { rank: 15, name: "Maycee Barber", record: "15-2", lastFight: "Feb 2026\nWin vs Maverick", movement: "-" }
    ]
  },
  "Heavyweight": {
    acronym: "HW",
    champion: {
      name: "Tom Aspinall",
      division: "Heavyweight Division",
      record: "15-3",
      koWins: 11,
      lastFightDate: "Oct 25, 2025",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "ENG",
      subWins: 3,
      decWins: 1,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Ciryl Gane", record: "13-3", lastFight: "Jun 14, 2026\nWin vs Pereira", movement: "-" },
      { rank: 2, name: "Alexander Volkov", record: "39-11", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Sergei Pavlovich", record: "19-3", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Jailton Almeida", record: "22-3", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Waldo Cortes-Acosta", record: "14-1", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Curtis Blaydes", record: "18-5 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Serghei Spivac", record: "18-5", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Shamil Gaziev", record: "14-1", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Marcin Tybura", record: "27-10", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Rodrigo Nascimento", record: "12-4", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Tallison Teixeira", record: "9-0", lastFight: "TBD", movement: "-" }
    ]
  },
  "Light Heavyweight": {
    acronym: "LHW",
    champion: {
      name: "Alex Pereira",
      division: "Light Heavyweight Division",
      record: "13-4",
      koWins: 10,
      lastFightDate: "Jun 14, 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "BRA",
      subWins: 0,
      decWins: 3,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Magomed Ankalaev", record: "21-2-1 (1 NC)", lastFight: "Oct 4, 2025\nLoss vs Pereira", movement: "-" },
      { rank: 2, name: "Carlos Ulberg", record: "15-1", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Jiří Procházka", record: "32-6-1", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Khalil Rountree Jr.", record: "14-6 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Jan Błachowicz", record: "29-11-2", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Nikita Krylov", record: "31-11", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Dominick Reyes", record: "16-5", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Azamat Murzakanov", record: "16-1", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Johnny Walker", record: "22-10", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Bogdan Guskov", record: "18-3", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Volkan Oezdemir", record: "21-8", lastFight: "TBD", movement: "-" }
    ]
  },
  "Middleweight": {
    acronym: "MW",
    champion: {
      name: "Sean Strickland",
      division: "Middleweight Division",
      record: "31-7",
      koWins: 11,
      lastFightDate: "May 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "USA",
      subWins: 4,
      decWins: 16,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Khamzat Chimaev", record: "15-1", lastFight: "May 2026\nLoss vs Strickland", movement: "-" },
      { rank: 2, name: "Dricus Du Plessis", record: "24-3", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Nassourdine Imavov", record: "17-5 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Caio Borralho", record: "18-1 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Robert Whittaker", record: "26-9", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Israel Adesanya", record: "24-5", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Jared Cannonier", record: "18-8", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Brendan Allen", record: "25-7", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Marvin Vettori", record: "19-8-1", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Anthony Hernandez", record: "15-2 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Roman Dolidze", record: "15-4", lastFight: "TBD", movement: "-" }
    ]
  },
  "Welterweight": {
    acronym: "WW",
    champion: {
      name: "Islam Makhachev",
      division: "Welterweight Division",
      record: "28-1",
      koWins: 5,
      lastFightDate: "Nov 15, 2025",
      nextFightOpponent: "Ian Machado Garry",
      nextFightEvent: "UFC 330",
      nextFightDate: "TBD",
      country: "RUS",
      subWins: 12,
      decWins: 11,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Ian Machado Garry", record: "17-1", lastFight: "Dec 7, 2024\nWin vs Rakhmonov", movement: "-" },
      { rank: 2, name: "Shavkat Rakhmonov", record: "19-0", lastFight: "Dec 7, 2024\nLoss vs Garry", movement: "-" },
      { rank: 3, name: "Carlos Prates", record: "24-7", lastFight: "May 2026\nWin vs Della Maddalena", movement: "-" },
      { rank: 4, name: "Michael Morales", record: "19-0", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Sean Brady", record: "18-2", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Belal Muhammad", record: "24-6", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Joaquin Buckley", record: "21-8", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Jack Della Maddalena", record: "18-3", lastFight: "May 2026\nLoss vs Prates", movement: "-" },
      { rank: 9, name: "Leon Edwards", record: "22-6", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Geoff Neal", record: "15-6", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Vicente Luque", record: "22-10-1", lastFight: "TBD", movement: "-" }
    ]
  },
  "Lightweight": {
    acronym: "LW",
    champion: {
      name: "Justin Gaethje",
      division: "Lightweight Division",
      record: "29-5",
      koWins: 20,
      lastFightDate: "Jun 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "USA",
      subWins: 1,
      decWins: 8,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Ilia Topuria", record: "18-1", lastFight: "Jun 2026\nLoss vs Gaethje", movement: "-" },
      { rank: 2, name: "Arman Tsarukyan", record: "23-3", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Charles Oliveira", record: "36-11 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Paddy Pimblett", record: "23-3", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Max Holloway", record: "27-8", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Mateusz Gamrot", record: "25-3 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Rafael Fiziev", record: "14-4", lastFight: "Jun 27, 2026\nWin vs Torres", movement: "-" },
      { rank: 8, name: "Benoît Saint Denis", record: "14-3", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Renato Moicano", record: "21-7-1", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Grant Dawson", record: "23-2-1", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Mauricio Ruffy", record: "12-1", lastFight: "TBD", movement: "-" }
    ]
  },
  "Featherweight": {
    acronym: "FW",
    champion: { name: "Ilia Topuria", division: "Featherweight Division", record: "15-0-0", koWins: 5, lastFightDate: "Feb 17, 2026", nextFightOpponent: "Max Holloway", nextFightEvent: "UFC 329", nextFightDate: "Jul 11, 2026", country: "ESP", subWins: 8, decWins: 2, isChamp: true },
    fighters: [
      { rank: 1, name: "Alexander Volkanovski", record: "26-4-0", lastFight: "Feb 17, 2026\\nLoss vs Topuria", movement: "-" },
      { rank: 2, name: "Max Holloway", record: "26-7-0", lastFight: "Apr 13, 2026\\nWin vs Gaethje", movement: "-" },
      { rank: 3, name: "Brian Ortega", record: "16-3-0", lastFight: "Feb 24, 2026\\nWin vs Rodriguez", movement: "-" },
      { rank: 4, name: "Yair Rodriguez", record: "19-5-0", lastFight: "Feb 24, 2026\\nLoss vs Ortega", movement: "-" },
      { rank: 5, name: "Movsar Evloev", record: "18-0-0", lastFight: "Jan 20, 2026\\nWin vs Allen", movement: "-" }
    ]
  },
  "Bantamweight": {
    acronym: "BW",
    champion: { name: "Sean O'Malley", division: "Bantamweight Division", record: "18-1-0", koWins: 12, lastFightDate: "Mar 9, 2026", nextFightOpponent: "Merab Dvalishvili", nextFightEvent: "UFC 332", nextFightDate: "Sep 14, 2026", country: "USA", subWins: 1, decWins: 5, isChamp: true },
    fighters: [
      { rank: 1, name: "Merab Dvalishvili", record: "17-4-0", lastFight: "Feb 17, 2026\\nWin vs Cejudo", movement: "-" },
      { rank: 2, name: "Cory Sandhagen", record: "17-5-0", lastFight: "Aug 3, 2026\\nLoss vs Nurmagomedov", movement: "-" },
      { rank: 3, name: "Petr Yan", record: "17-5-0", lastFight: "Mar 9, 2026\\nWin vs Yadong", movement: "-" },
      { rank: 4, name: "Marlon Vera", record: "23-9-1", lastFight: "Mar 9, 2026\\nLoss vs O'Malley", movement: "-" },
      { rank: 5, name: "Henry Cejudo", record: "16-4-0", lastFight: "Feb 17, 2026\\nLoss vs Dvalishvili", movement: "-" }
    ]
  },
  "Flyweight": {
    acronym: "FLW",
    champion: {
      name: "Joshua Van",
      division: "Flyweight Division",
      record: "17-2-0",
      koWins: 7,
      lastFightDate: "Jun 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "USA",
      subWins: 2,
      decWins: 8,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Alexandre Pantoja", record: "29-6", lastFight: "Dec 6, 2025\nLoss vs Van", movement: "-" },
      { rank: 2, name: "Brandon Royval", record: "16-7-0", lastFight: "Feb 2026\nWin vs Moreno", movement: "-" },
      { rank: 3, name: "Brandon Moreno", record: "21-8-2", lastFight: "Feb 2026\nLoss vs Royval", movement: "-" },
      { rank: 4, name: "Amir Albazi", record: "17-1-0", lastFight: "Jun 2025\nWin vs Kara-France", movement: "-" },
      { rank: 5, name: "Manel Kape", record: "21-7", lastFight: "Jun 20, 2026\nWin vs Horiguchi", movement: "-" },
      { rank: 6, name: "Tatsuro Taira", record: "16-1", lastFight: "Jun 2026\nLoss vs Van", movement: "-" },
      { rank: 7, name: "Asu Almabayev", record: "20-2", lastFight: "Jun 27, 2026\nWin vs Johnson", movement: "-" },
      { rank: 8, name: "Charles Johnson", record: "15-7", lastFight: "Jun 27, 2026\nLoss vs Almabayev", movement: "-" },
      { rank: 9, name: "Steve Erceg", record: "12-2", lastFight: "May 2026\nLoss vs Pantoja", movement: "-" },
      { rank: 10, name: "Tim Elliott", record: "20-13-1", lastFight: "Dec 2025\nWin vs Mudaerji", movement: "-" },
      { rank: 11, name: "Cody Durden", record: "16-5-1", lastFight: "Dec 2025\nLoss vs Johnson", movement: "-" }
    ]
  },
  "Women's Strawweight": {
    acronym: "WSW",
    champion: {
      name: "Mackenzie Dern",
      division: "Women's Strawweight Division",
      record: "16-5",
      koWins: 0,
      lastFightDate: "Oct 25, 2025",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "BRA",
      subWins: 7,
      decWins: 9,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Zhang Weili", record: "26-4", lastFight: "Nov 15, 2025\nLoss vs Shevchenko", movement: "-" },
      { rank: 2, name: "Tatiana Suarez", record: "12-1", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Virna Jandiroba", record: "23-4", lastFight: "Apr 4, 2026\nLoss vs Dern", movement: "-" },
      { rank: 4, name: "Yan Xiaonan", record: "19-5 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Gillian Robertson", record: "17-8", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Amanda Lemos", record: "15-6-1", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Jéssica Andrade", record: "27-14", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Loopy Godinez", record: "13-5", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Denise Gomes", record: "12-3", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Tabatha Ricci", record: "12-4", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Iasmin Lucindo", record: "18-6", lastFight: "TBD", movement: "-" }
    ]
  },
  "Women's Flyweight": {
    acronym: "WFW",
    champion: {
      name: "Valentina Shevchenko",
      division: "Women's Flyweight Division",
      record: "25-4-1",
      koWins: 8,
      lastFightDate: "Feb 2026",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "KGZ",
      subWins: 7,
      decWins: 10,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Manon Fiorot", record: "13-2", lastFight: "TBD", movement: "-" },
      { rank: 2, name: "Natália Silva", record: "19-5-1", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Alexa Grasso", record: "17-5-1", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Erin Blanchfield", record: "14-2", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Rose Namajunas", record: "14-7", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Jasmine Jasudavicius", record: "14-3", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Maycee Barber", record: "15-2", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Tracy Cortez", record: "13-2", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Miranda Maverick", record: "17-5", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Casey O'Neill", record: "10-2", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Viviane Araújo", record: "13-7", lastFight: "TBD", movement: "-" },
      { rank: 12, name: "Amanda Ribas", record: "13-6", lastFight: "TBD", movement: "-" },
      { rank: 13, name: "Karine Silva", record: "18-5", lastFight: "TBD", movement: "-" },
      { rank: 14, name: "Wang Cong", record: "7-1", lastFight: "TBD", movement: "-" }
    ]
  },
  "Women's Bantamweight": {
    acronym: "WBW",
    champion: {
      name: "Kayla Harrison",
      division: "Women's Bantamweight Division",
      record: "19-1",
      koWins: 6,
      lastFightDate: "Oct 2025",
      nextFightOpponent: "TBD",
      nextFightEvent: "TBD",
      nextFightDate: "TBD",
      country: "USA",
      subWins: 7,
      decWins: 6,
      isChamp: true
    },
    fighters: [
      { rank: 1, name: "Julianna Peña", record: "13-6", lastFight: "TBD", movement: "-" },
      { rank: 2, name: "Raquel Pennington", record: "17-10", lastFight: "TBD", movement: "-" },
      { rank: 3, name: "Ketlen Vieira", record: "15-4", lastFight: "TBD", movement: "-" },
      { rank: 4, name: "Norma Dumont", record: "12-3", lastFight: "TBD", movement: "-" },
      { rank: 5, name: "Macy Chiasson", record: "11-4", lastFight: "TBD", movement: "-" },
      { rank: 6, name: "Irene Aldana", record: "16-8", lastFight: "TBD", movement: "-" },
      { rank: 7, name: "Ailin Perez", record: "13-2", lastFight: "TBD", movement: "-" },
      { rank: 8, name: "Karol Rosa", record: "18-7", lastFight: "TBD", movement: "-" },
      { rank: 9, name: "Yana Santos", record: "15-9 (1 NC)", lastFight: "TBD", movement: "-" },
      { rank: 10, name: "Pannie Kianzad", record: "17-9", lastFight: "TBD", movement: "-" },
      { rank: 11, name: "Joselyne Edwards", record: "15-7", lastFight: "TBD", movement: "-" },
      { rank: 12, name: "Chelsea Chandler", record: "7-3", lastFight: "TBD", movement: "-" },
      { rank: 13, name: "Melissa Mullins", record: "8-1", lastFight: "TBD", movement: "-" },
      { rank: 14, name: "Daria Zhelezniakova", record: "10-2", lastFight: "TBD", movement: "-" }
    ]
  },
  "Women's Featherweight": {
    acronym: "WFEW",
    champion: { name: "Amanda Nunes", division: "Women's Featherweight Division", record: "23-5-0", koWins: 13, lastFightDate: "Jun 10, 2025", nextFightOpponent: "Retired", nextFightEvent: "N/A", nextFightDate: "N/A", country: "BRA", subWins: 4, decWins: 6, isChamp: true },
    fighters: [
      { rank: 1, name: "Norma Dumont", record: "11-2-0", lastFight: "Apr 6, 2026\\nWin vs de Randamie", movement: "-" },
      { rank: 2, name: "Chelsea Chandler", record: "6-2-0", lastFight: "Mar 16, 2026\\nWin vs Nunes", movement: "-" },
      { rank: 3, name: "Karol Rosa", record: "17-6-0", lastFight: "Dec 16, 2025\\nLoss vs Aldana", movement: "-" },
      { rank: 4, name: "Macy Chiasson", record: "10-3-0", lastFight: "Jun 29, 2026\\nWin vs Silva", movement: "-" },
      { rank: 5, name: "Josiane Nunes", record: "10-2-0", lastFight: "Mar 16, 2026\\nLoss vs Chandler", movement: "-" }
    ]
  }
};

const ALL_WEIGHT_CLASSES = [
  "Pound-for-Pound", "Women's Pound-for-Pound", "Heavyweight", "Light Heavyweight", "Middleweight", "Welterweight", 
  "Lightweight", "Featherweight", "Bantamweight", "Flyweight", 
  "Women's Strawweight", "Women's Flyweight", "Women's Bantamweight", "Women's Featherweight"
];

function renderMovement(mov) {
  if (mov === "-") return '<span class="rt-movement none">—</span>';
  if (mov.startsWith("up")) return `<span class="rt-movement up">▲ ${mov.split(' ')[1]}</span>`;
  if (mov.startsWith("down")) return `<span class="rt-movement down">▼ ${mov.split(' ')[1]}</span>`;
  return mov;
}

function renderRankings() {
  const currentData = MOCK_RANKINGS[activeWeightClass] || MOCK_RANKINGS["Pound-for-Pound"];
  const champ = currentData.champion;
  
  return `
    <main class="rankings-layout-pro">
      
      <!-- Left Sidebar -->
      <aside>
        <div class="rank-sidebar-menu">
          <div class="rank-sidebar-header">Weight Classes</div>
          ${ALL_WEIGHT_CLASSES.map(cat => `
            <button class="rank-sidebar-btn ${cat === activeWeightClass ? 'active' : ''}" onclick="setWeightClass(&quot;${cat}&quot;)">
              <div class="rank-sidebar-icon">${cat === "Pound-for-Pound" ? "🏆" : cat.split(' ').map(w => w[0]).join('').substring(0,3)}</div>
              ${cat}
            </button>
          `).join('')}
        </div>
        
        <div class="rank-right-box" style="margin-top:24px;">
          <div class="rank-right-header" style="margin-bottom:8px;">
            <h3 style="color:#a7a7a7; font-size: 0.8rem;">RANKINGS INFO</h3>
          </div>
          <p style="font-size: 0.85rem; color: #ccc; line-height: 1.5; margin-bottom: 16px;">
            Rankings are updated every Tuesday following all major UFC events.
          </p>
          <a href="#" style="color: #e10600; text-decoration: none; font-size: 0.85rem; font-weight: bold;">Learn More →</a>
        </div>
      </aside>

      <!-- Center Main Content -->
      <section>
        <div class="rank-main-header">
          <div class="rank-main-title">
            <h1>Official UFC Rankings</h1>
            <p>The best fighters in the world, ranked by the UFC.</p>
          </div>
          <div class="rank-meta-info">
            <div style="margin-bottom: 8px;">Last Updated: June 20, 2026</div>
            <button style="background:none; border:1px solid rgba(255,255,255,0.2); color:#ccc; padding:6px 12px; border-radius:6px; cursor:pointer;" onclick="openRankingsModal('how')">How Rankings Work ⓘ</button>
          </div>
        </div>

        <div class="rank-tabs-row">
          ${ALL_WEIGHT_CLASSES.slice(0,8).map(cat => `
            <button class="rank-tab ${cat === activeWeightClass ? 'active' : ''}" onclick="setWeightClass(&quot;${cat}&quot;)">
              ${cat === "Pound-for-Pound" ? "P4P" : cat.split(' ').map(w => w[0]).join('').substring(0,3)}
            </button>
          `).join('')}
        </div>

        <div class="rank-champ-card">
          <div class="champ-info">
            <div class="champ-badge">👑 CHAMPION</div>
            <h2>${champ.name}</h2>
            <p class="division">${champ.division}</p>
            <div class="champ-stats-row">
              <div class="champ-stat">
                <span class="val">${champ.record}</span>
                <span class="lbl">Record</span>
              </div>
              <div class="champ-stat">
                <span class="val">${champ.koWins}</span>
                <span class="lbl">Wins by KO</span>
              </div>
              <div class="champ-stat">
                <span class="val">${champ.lastFightDate}</span>
                <span class="lbl">Last Fight</span>
              </div>
            </div>
          </div>
          <div class="champ-next-fight">
            <div class="lbl">NEXT FIGHT</div>
            <div class="vs">vs ${champ.nextFightOpponent}</div>
            <div class="event">${champ.nextFightEvent}</div>
            <div class="date">${champ.nextFightDate}</div>
          </div>
        </div>

        <table class="rankings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fighter</th>
              <th>Record</th>
              <th>Last Fight</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            ${currentData.fighters.map(f => `
              <tr>
                <td class="rt-rank">${f.rank}</td>
                <td class="rt-fighter">${f.name}</td>
                <td class="rt-record">${f.record}</td>
                <td class="rt-lastfight">${f.lastFight}</td>
                <td>${renderMovement(f.movement)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <button class="rank-view-full-btn">View Full ${activeWeightClass} Rankings →</button>
        
        <div class="rank-footer-banner">
          <div class="rank-footer-item">
            <div class="rank-footer-icon">${icons.shield}</div>
            <div class="rank-footer-text">
              <h4>Official & Accurate</h4>
              <p>Rankings determined by UFC expert panel.</p>
            </div>
          </div>
          <div class="rank-footer-item">
            <div class="rank-footer-icon">${icons.calendar}</div>
            <div class="rank-footer-text">
              <h4>Updated Weekly</h4>
              <p>New rankings every Tuesday after fight events.</p>
            </div>
          </div>
          <div class="rank-footer-item">
            <div class="rank-footer-icon">${icons.list}</div>
            <div class="rank-footer-text">
              <h4>Transparent Process</h4>
              <p>Learn how UFC rankings are determined.</p>
            </div>
          </div>
          <div class="rank-footer-item">
            <div class="rank-footer-icon">${icons.star}</div>
            <div class="rank-footer-text">
              <h4>Global Standards</h4>
              <p>Consistent across all weight classes and divisions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Sidebar -->
      <aside>
        <div class="rank-right-box">
          <div class="rank-right-header">
            <h3>About The Champion</h3>
          </div>
          <h2 style="font-size: 1.5rem; text-transform: uppercase; margin: 0 0 8px 0;">${champ.name}</h2>
          <div style="display:flex; gap:8px; margin-bottom: 16px;">
            <span style="background:#d4af37; color:#000; font-weight:bold; font-size:0.7rem; padding:4px 8px; border-radius:4px;">CHAMPION</span>
            <span style="color:#a7a7a7; font-size:0.8rem; display:flex; align-items:center;">${activeWeightClass}</span>
          </div>
          <div style="font-size:0.85rem; color:#ccc; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
            ${champ.record} &nbsp;|&nbsp; <span style="color:#e10600; font-weight:bold;">${champ.country}</span>
          </div>
          <div class="champ-sidebar-stats">
            <div class="stat">
              <div class="val">${champ.koWins}</div>
              <div class="lbl">KO/TKO</div>
            </div>
            <div class="stat" style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
              <div class="val">${champ.subWins}</div>
              <div class="lbl">Submissions</div>
            </div>
            <div class="stat" style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 16px;">
              <div class="val">${champ.decWins}</div>
              <div class="lbl">Decisions</div>
            </div>
          </div>
          <button class="rank-view-full-btn" style="background:transparent; font-size: 0.9rem; margin-top: 24px;" onclick="openRankingsModal('profile', '${encodeURIComponent(JSON.stringify(champ))}')">View Fighter Profile →</button>
        </div>

        <div class="rank-right-box">
          <div class="rank-right-header">
            <h3>Rankings News</h3>
            <a href="#">View All</a>
          </div>
          <div class="rank-news-item">
            <h4>UFC Adopts New Meta UFC Rankings System</h4>
            <div class="date">June 20, 2026</div>
          </div>
          <div class="rank-news-item">
            <h4>Algorithm Replaces Media Voting Panel</h4>
            <div class="date">June 20, 2026</div>
          </div>
          <div class="rank-news-item">
            <h4>Islam Makhachev Tops Data-Driven List</h4>
            <div class="date">June 20, 2026</div>
          </div>
          <button class="rank-view-full-btn" style="background:transparent; font-size: 0.9rem;" onclick="openRankingsModal('news')">View All News →</button>
        </div>
      </aside>

    </main>
  `;
}

function currentView() {
  if (route === "stream") return renderStream();
  if (route === "events") return renderEvents();
  if (route === "live") return renderLive();
  if (route === "fans") return renderFans();
  if (route === "rankings") return renderRankings();
  if (route === "profile") return renderProfile();
  if (route === "admin") return renderAdmin();
  return renderHome();
}

function render() {
  if (!authUser && route !== "profile") {
    route = "profile";
  }
  
  document.getElementById("app").innerHTML = `
    <div class="app-shell ${route === "home" ? "home-shell" : ""}">
      ${topbar()}
      ${currentView()}
      ${bottomNav()}
    </div>
  `;
}

window.setRoute = setRoute;
window.setWeightClass = setWeightClass;
window.loginUser = loginUser;
window.signUpUser = signUpUser;
window.loginAdmin = loginAdmin;
window.logoutUser = logoutUser;
window.setAuthMode = setAuthMode;
window.setAdminTab = setAdminTab;
window.toggleNotifications = toggleNotifications;
window.updateProfile = updateProfile;
window.saveEvent = saveEvent;
window.editEvent = editEvent;
window.publishLive = publishLive;
window.deleteEvent = deleteEvent;
window.updateAdminEventDraft = updateAdminEventDraft;
window.toggleReminder = toggleReminder;
window.toggleFavorite = toggleFavorite;
window.shareEvent = shareEvent;
window.openStreamLink = openStreamLink;
window.handlePlayerError = handlePlayerError;
window.toggleFanFavorite = toggleFanFavorite;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

async function boot() {
  render();
  const user = await window.initSupabaseAuth(async (nextUser) => {
    await applySessionUser(nextUser);
  });
  authUser = user;
  await loadProfile();
  await loadEvents();
}

boot();
