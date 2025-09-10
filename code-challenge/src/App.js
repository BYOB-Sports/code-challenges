import React, { useEffect, useMemo, useState } from "react";

/* ===========================================================
   Tennis Courts – Mobile App (no extra libs)
   New:
     • Login (mock)
     • Court specs (length/width/runoff/area)
     • Side-by-side Compare view (area & length)
     • Coaches per court + bios/certs
     • Subscription ranges (derived from coach rates & size)
   Kept:
     • List (search/filter/sort 60+)
     • Detail (reviews in localStorage)
   =========================================================== */

/* ---------- minimal, mobile-first styles ---------- */
const styles = `
:root { --w:480px; --muted:#6b7280; --line:#e5e7eb; }
*{box-sizing:border-box} body{margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,sans-serif;background:#f8fafc;color:#111827}
.app{min-height:100vh;display:flex;justify-content:center}
.phone{width:100%;max-width:var(--w);min-height:100vh;background:#fff;box-shadow:0 0 0 1px #0001}
.header{position:sticky;top:0;z-index:10;background:#ffffffcc;backdrop-filter:saturate(180%) blur(8px);border-bottom:1px solid var(--line);height:56px;display:flex;align-items:center;gap:12px;padding:0 16px}
.iconbtn{height:36px;width:36px;border:1px solid var(--line);border-radius:999px;background:#fff;display:flex;align-items:center;justify-content:center}
.h1{font-weight:600}
.main{padding:16px}
.input{height:48px;width:100%;border:1px solid var(--line);border-radius:12px;padding:0 14px}
.search{position:relative}
.search .in{padding-left:42px;padding-right:46px}
.search .l{position:absolute;left:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--muted)}
.search .r{position:absolute;right:8px;top:50%;transform:translateY(-50%)}
.pills{display:flex;flex-wrap:wrap;gap:8px}
.pill{height:36px;padding:0 12px;border-radius:999px;border:1px solid var(--line);background:#fff}
.pill.on{background:#111827;color:#fff;border-color:#111827}
.card{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
.card + .card{margin-top:12px}
.thumb{aspect-ratio:16/9;background:#f1f5f9;width:100%;display:block;object-fit:cover}
.pad{padding:12px}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.dim{color:var(--muted);font-size:12px;display:flex;align-items:center;gap:4px}
.meta{margin-top:6px;display:flex;align-items:center;gap:8px;color:#475569;font-size:12px;flex-wrap:wrap}
.grid{display:grid;gap:12px}
.btn{height:44px;padding:0 14px;border-radius:12px;border:1px solid var(--line);background:#111827;color:#fff}
.btn.alt{background:#fff;color:#111827}
.section{border:1px solid var(--line);border-radius:16px;background:#fff}
.section h3{margin:0;padding:12px;border-bottom:1px solid var(--line)}
.section .body{padding:12px}
.textarea{width:100%;min-height:96px;border:1px solid var(--line);border-radius:12px;padding:10px;resize:vertical}
.center{text-align:center;color:var(--muted);padding:24px 0}
.stars{display:flex;gap:4px}
.star{color:#f59e0b} .star.off{color:#e5e7eb}
.badge{border:1px solid var(--line);border-radius:999px;font-size:12px;padding:2px 8px;color:#374151;background:#fff}
.table{width:100%;border-collapse:collapse}
.table th,.table td{border-top:1px solid var(--line);padding:10px;text-align:left;font-size:14px}
.small{font-size:12px;color:var(--muted)}
.hr{height:1px;background:var(--line);margin:8px 0}
.login-wrap{display:grid;gap:12px}
`;

/* ---------- constants & mock helpers ---------- */
const SURFACE_TYPES = ["Hard", "Clay", "Grass", "Carpet"];
const CITY_LIST = ["Austin","Dallas","Houston","San Antonio","Plano","Frisco","Round Rock","Fort Worth","Arlington","Waco"];
const STORE_REVIEWS = "tennis_reviews_v3";
const STORE_AUTH = "tennis_auth_v1";

// Tennis court standard playing area: 23.77 m x 8.23 (singles) / 10.97 (doubles)
// We'll add randomized run-off space to make areas vary realistically.
const PLAY_LENGTH_M = 23.77;
const PLAY_WIDTH_SINGLES_M = 8.23;
const PLAY_WIDTH_DOUBLES_M = 10.97;

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCoaches(rand, city) {
  const first = ["Alex","Jordan","Taylor","Casey","Morgan","Riley","Sam","Avery","Jamie","Cameron"];
  const last  = ["Lee","Patel","Nguyen","Garcia","Johnson","Kim","Brown","Davis","Martinez","Wilson"];
  const certs = ["USPTA Elite", "PTR Professional", "RPT Level 2", "ITF Level 1"];
  const bios  = [
    "Focus on footwork, serve consistency, and point construction.",
    "High-rep drills and video feedback for faster gains.",
    "Doubles tactics and net play specialist.",
    "Junior development, technique cleanup, and fitness."
  ];
  const count = 1 + ((rand() * 3) | 0); // 1..3 coaches
  const out = [];
  for (let i = 0; i < count; i++) {
    const name = `${first[(rand()*first.length)|0]} ${last[(rand()*last.length)|0]}`;
    const exp = 2 + ((rand()*18)|0);
    const rating = Math.round((3.8 + rand()*1.2)*10)/10; // 3.8..5.0
    const price = 35 + ((rand()*55)|0); // $35..$90/hr
    out.push({
      id: crypto.randomUUID(),
      name,
      city,
      years: exp,
      rating,
      pricePerHour: price,
      certifications: [certs[(rand()*certs.length)|0]],
      bio: bios[(rand()*bios.length)|0],
    });
  }
  return out;
}

function generateMockVenues(count = 64, seed = 19) {
  const rand = rng(seed);
  const venues = [];
  for (let i = 1; i <= count; i++) {
    const surface = SURFACE_TYPES[(rand() * SURFACE_TYPES.length) | 0];
    const city = CITY_LIST[(rand() * CITY_LIST.length) | 0];

    // Dimensions (meters): randomized run-off while keeping play area fixed
    const runoffLong = 3 + (rand() * 4);  // 3–7m behind each baseline
    const runoffWide = 2 + (rand() * 3);  // 2–5m on each side
    const lengthM = +(PLAY_LENGTH_M + 2 * runoffLong).toFixed(2);
    const widthM  = +((surface === "Grass" ? PLAY_WIDTH_SINGLES_M : PLAY_WIDTH_DOUBLES_M) + 2 * runoffWide).toFixed(2);
    const areaM2  = +(lengthM * widthM).toFixed(2);

    const courts = 2 + ((rand() * 10) | 0);
    const lights = rand() > 0.4;
    const indoor = rand() > 0.75;
    const baseRating = Math.round((3 + rand() * 2) * 10) / 10;
    const ratingsCount = 5 + ((rand() * 60) | 0);

    const hue = (rand() * 360) | 0;
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
        <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='hsl(${hue},70%,60%)'/>
          <stop offset='100%' stop-color='hsl(${(hue+40)%360},70%,45%)'/>
        </linearGradient></defs>
        <rect fill='url(#g)' width='100%' height='100%'/>
        <rect x='80' y='60' width='640' height='330' fill='none' stroke='white' stroke-width='8'/>
        <line x1='400' y1='60' x2='400' y2='390' stroke='white' stroke-width='6'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='44' font-family='Inter,system-ui,sans-serif'>${city}</text>
      </svg>`;

    venues.push({
      id: String(i),
      name: `Court ${i} • ${surface} • ${city}`,
      city, surface, courts, lights, indoor,
      rating: baseRating, ratingsCount,
      image: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      specs: { lengthM, widthM, areaM2, runoffLongM: +runoffLong.toFixed(2), runoffWideM: +runoffWide.toFixed(2) },
      coaches: makeCoaches(rand, city),
    });
  }
  return venues;
}

/* ---------- tiny hash router ---------- */
function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "login");
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || "login");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const navigate = (to) => (window.location.hash = to);
  return { route, navigate };
}

/* ---------- auth ---------- */
function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORE_AUTH)) || null; }
    catch { return null; }
  });
  const login = (email) => {
    const u = { email, name: email.split("@")[0] };
    setUser(u);
    localStorage.setItem(STORE_AUTH, JSON.stringify(u));
  };
  const logout = () => { setUser(null); localStorage.removeItem(STORE_AUTH); };
  return { user, login, logout };
}

/* ---------- reviews stored locally ---------- */
function useLocalReviews() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORE_REVIEWS)) || []; }
    catch { return []; }
  });
  useEffect(() => localStorage.setItem(STORE_REVIEWS, JSON.stringify(items)), [items]);
  const add = (r) => setItems((prev) => [r, ...prev]);
  const byVenue = (id) => items.filter((x) => x.venueId === id);
  return { items, add, byVenue };
}

/* ---------- UI atoms ---------- */
function RatingStars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const slots = Array.from({ length: 5 }, (_, i) => (i < full ? 1 : i === full && half ? 0.5 : 0));
  return (
    <div className="stars" aria-label={`Rating ${value} of 5`}>
      {slots.map((v, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" className={`star ${v ? "" : "off"}`} aria-hidden>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
function Pill({ label, active, onClick }) {
  return (
    <button className={`pill ${active ? "on" : ""}`} onClick={onClick}>{label}</button>
  );
}

/* ---------- header ---------- */
function TopBar({ onBack, onLogout, user }) {
  return (
    <div className="header">
      {onBack ? (
        <button className="iconbtn" aria-label="Back" onClick={onBack}>←</button>
      ) : (
        <div style={{ width: 36, height: 36 }} />
      )}
      <div className="h1">Tennis Courts</div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        {user && <span className="small">Hi, {user.name}</span>}
        {user && <button className="iconbtn" aria-label="Logout" onClick={onLogout}>⎋</button>}
      </div>
    </div>
  );
}

/* ---------- login ---------- */
function LoginScreen({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const canGo = email.includes("@") && pass.length >= 3;

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div className="pad">
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Sign in</h2>
        <p className="small" style={{ marginTop: 6 }}>Use any email & password (mock auth).</p>
        <div className="login-wrap">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          <button className="btn" disabled={!canGo} onClick={()=>onSuccess(email)}>Continue</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- filters/search ---------- */
function FiltersPanel({ query, setQuery, surface, setSurface, city, setCity, sort, setSort }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="search">
        <span className="l">🔎</span>
        <input
          className="input in"
          placeholder="Search courts or cities"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
        <button className="iconbtn r" aria-label="Filters" onClick={() => setOpen((v) => !v)}>⚙️</button>
      </div>

      {open && (
        <div style={{ marginTop: 10 }}>
          <div className="pills">
            <Pill label="All surfaces" active={surface === "All"} onClick={() => setSurface("All")} />
            {SURFACE_TYPES.map((s) => (
              <Pill key={s} label={s} active={surface === s} onClick={() => setSurface(s)} />
            ))}
          </div>
          <div style={{ height: 8 }} />
          <div className="pills">
            <Pill label="All cities" active={city === "All"} onClick={() => setCity("All")} />
            {CITY_LIST.map((c) => (
              <Pill key={c} label={c} active={city === c} onClick={() => setCity(c)} />
            ))}
          </div>
          <div style={{ height: 8 }} />
          <div className="pills">
            <span className="badge">Sort</span>
            <Pill label="Top rated" active={sort === "rating"} onClick={() => setSort("rating")} />
            <Pill label="Name" active={sort === "name"} onClick={() => setSort("name")} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- list page ---------- */
function VenueList({ venues, onSelect, onComparePick }) {
  if (!venues.length) return <div className="center">No courts match your filters.</div>;
  return (
    <ul style={{ display: "grid", gap: 12, marginTop: 12 }}>
      {venues.map((v) => (
        <li key={v.id}>
          <div className="card">
            <button style={{ width: "100%", textAlign: "left" }} onClick={() => onSelect(v.id)}>
              <img className="thumb" src={v.image} alt="Tennis court" />
              <div className="pad">
                <div className="row">
                  <div style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {v.name}
                  </div>
                  <div className="dim">📍 {v.city}</div>
                </div>
                <div className="meta">
                  <RatingStars value={v.rating} />
                  <span>({v.ratingsCount})</span>
                  <span>• {v.surface}</span>
                  <span>• {v.specs.lengthM} × {v.specs.widthM} m</span>
                  <span>• {v.specs.areaM2} m²</span>
                </div>
              </div>
            </button>
            <div className="pad" style={{ display: "flex", gap: 8 }}>
              <button className="btn alt" onClick={() => onComparePick(v.id)}>Compare</button>
              <button className="btn" onClick={() => onSelect(v.id)}>Open</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- detail page ---------- */
function VenueDetail({ venue, reviews, addReview }) {
  const [text, setText] = useState("");
  const [score, setScore] = useState(5);

  const submit = () => {
    if (!text.trim()) return;
    addReview({
      id: crypto.randomUUID(),
      venueId: venue.id,
      rating: score,
      text: text.trim(),
      createdAt: Date.now(),
    });
    setText(""); setScore(5);
  };

  const coachMedian = Math.round(
    venue.coaches.reduce((a,c)=>a+c.pricePerHour,0) / venue.coaches.length
  );

  const priceFor = (sessions) => {
    // Base from coach median; size factor from area (normalize ~ 800–1200 m²)
    const sizeFactor = Math.max(0.9, Math.min(1.15, venue.specs.areaM2 / 1000));
    return Math.round(coachMedian * sessions * sizeFactor);
  };

  return (
    <div className="grid">
      <div className="card">
        <img className="thumb" src={venue.image} alt="Court" />
        <div className="pad">
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{venue.name}</h2>
          <div className="meta" style={{ marginTop: 6 }}>
            <span>📍 {venue.city}</span>
          </div>
          <div className="meta">
            <RatingStars value={venue.rating} />
            <span>({venue.ratingsCount})</span>
            <span>• {venue.surface}</span>
            <span>• {venue.courts} courts</span>
            {venue.indoor && <span>• Indoor</span>}
            {venue.lights && <span>• Lights</span>}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="section">
        <h3>Specifications</h3>
        <div className="body">
          <table className="table">
            <tbody>
              <tr><th>Length</th><td>{venue.specs.lengthM} m</td></tr>
              <tr><th>Width</th><td>{venue.specs.widthM} m</td></tr>
              <tr><th>Area</th><td>{venue.specs.areaM2} m²</td></tr>
              <tr><th>Run-off (baseline)</th><td>{venue.specs.runoffLongM} m each end</td></tr>
              <tr><th>Run-off (sideline)</th><td>{venue.specs.runoffWideM} m each side</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaches */}
      <div className="section">
        <h3>Coaches ({venue.coaches.length})</h3>
        <ul>
          {venue.coaches.map(c => (
            <li key={c.id} className="body" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="row">
                <div style={{ fontWeight: 600 }}>{c.name}</div>
                <div className="dim">${c.pricePerHour}/hr</div>
              </div>
              <div className="meta">
                <span>⭐ {c.rating}</span>
                <span>• {c.years} yrs exp</span>
                <span>• {c.certifications.join(", ")}</span>
                <span>• {c.city}</span>
              </div>
              <div className="small" style={{ marginTop: 6 }}>{c.bio}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Subscriptions (derived ranges) */}
      <div className="section">
        <h3>Subscription ranges</h3>
        <div className="body">
          <table className="table">
            <thead>
              <tr><th>Plan</th><th>Includes</th><th>Est. monthly</th></tr>
            </thead>
            <tbody>
              <tr><td>Starter</td><td>4 sessions / month</td><td>${priceFor(4)}</td></tr>
              <tr><td>Standard</td><td>8 sessions / month</td><td>${priceFor(8)}</td></tr>
              <tr><td>Pro</td><td>12 sessions / month</td><td>${priceFor(12)}</td></tr>
            </tbody>
          </table>
          <div className="small" style={{ marginTop: 6 }}>
            Prices estimated from coach rates and court area. Actual offers may vary.
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="section">
        <h3>Reviews</h3>
        <div className="body">
          <div className="pills" role="radiogroup" aria-label="Rating">
            {[1,2,3,4,5].map(n => (
              <button key={n} role="radio" aria-checked={score===n}
                className={`pill ${score===n?"on":""}`} onClick={()=>setScore(n)}>
                ⭐ {n}
              </button>
            ))}
          </div>
          <div className="hr" />
          <textarea className="textarea"
            placeholder="What should other players know?"
            value={text} onChange={(e)=>setText(e.target.value)} />
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:10 }}>
            <button className="btn" onClick={submit}>Post review</button>
          </div>
        </div>
        {reviews.length === 0 ? (
          <div className="body" style={{ color: "var(--muted)" }}>No reviews yet. Be the first!</div>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li key={r.id} className="body" style={{ borderTop: "1px solid var(--line)" }}>
                <div className="meta">
                  <RatingStars value={r.rating} />
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.5 }}>{r.text}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- compare page (side-by-side area & length) ---------- */
function CompareView({ a, b }) {
  if (!a || !b) return <div className="center">Choose two courts to compare.</div>;
  const rows = [
    ["City", `${a.city}`, `${b.city}`],
    ["Surface", `${a.surface}`, `${b.surface}`],
    ["Length (m)", `${a.specs.lengthM}`, `${b.specs.lengthM}`],
    ["Width (m)", `${a.specs.widthM}`, `${b.specs.widthM}`],
    ["Area (m²)", `${a.specs.areaM2}`, `${b.specs.areaM2}`],
    ["Run-off baseline (m)", `${a.specs.runoffLongM}`, `${b.specs.runoffLongM}`],
    ["Run-off sideline (m)", `${a.specs.runoffWideM}`, `${b.specs.runoffWideM}`],
    ["Rating", `${a.rating} (${a.ratingsCount})`, `${b.rating} (${b.ratingsCount})`],
  ];
  return (
    <div className="section">
      <h3>Compare courts</h3>
      <div className="body">
        <table className="table">
          <thead><tr><th>Spec</th><th>{a.name}</th><th>{b.name}</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}><th>{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- root app ---------- */
export default function App() {
  const { route, navigate } = useHashRoute();
  const { user, login, logout } = useAuth();

  // redirect to login if not authenticated
  useEffect(() => {
    if (!user && !route.startsWith("login")) navigate("login");
  }, [user, route, navigate]);

  const [venues] = useState(() => generateMockVenues(64));
  const { items: reviews, add: addReview, byVenue } = useLocalReviews();

  // compare state: pick two ids
  const [comparePick, setComparePick] = useState({ first: null, second: null });

  // search/filter/sort
  const [q, setQ] = useState("");
  const [surface, setSurface] = useState("All");
  const [city, setCity] = useState("All");
  const [order, setOrder] = useState("rating");

  const results = useMemo(() => {
    let list = [...venues];
    const needle = q.trim().toLowerCase();
    if (needle) list = list.filter(v => v.name.toLowerCase().includes(needle) || v.city.toLowerCase().includes(needle));
    if (surface !== "All") list = list.filter(v => v.surface === surface);
    if (city !== "All") list = list.filter(v => v.city === city);

    // fold in new reviews to visible rating
    const accum = {};
    for (const r of reviews) {
      (accum[r.venueId] ??= { sum: 0, n: 0 });
      accum[r.venueId].sum += r.rating; accum[r.venueId].n += 1;
    }
    list = list.map(v => {
      const a = accum[v.id];
      if (!a) return v;
      const total = v.rating * v.ratingsCount + a.sum;
      const count = v.ratingsCount + a.n;
      return { ...v, rating: Math.round((total / count) * 10) / 10, ratingsCount: count };
    });

    if (order === "rating") list.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [venues, q, surface, city, order, reviews]);

  const isLogin = route.startsWith("login");
  const isDetail = route.startsWith("detail/");
  const isCompare = route.startsWith("compare/");
  const id = isDetail ? route.split("/")[1] : null;
  const chosen = isDetail ? results.find(v => v.id === id) || venues.find(v => v.id === id) : null;

  // compare targets
  const [idA, idB] = isCompare ? route.split("/")[1]?.split("-") || [] : [];
  const cmpA = isCompare ? venues.find(v=>v.id===idA) : null;
  const cmpB = isCompare ? venues.find(v=>v.id===idB) : null;

  // infinite scroll-ish
  const [limit, setLimit] = useState(16);
  useEffect(() => { setLimit(16); }, [q, surface, city]);
  useEffect(() => {
    if (isDetail || isCompare) return;
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
      if (nearBottom) setLimit(l => Math.min(l + 12, results.length));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [results.length, isDetail, isCompare]);

  const handleComparePick = (vid) => {
    if (!comparePick.first) {
      setComparePick({ first: vid, second: null });
      return;
    }
    if (!comparePick.second && vid !== comparePick.first) {
      setComparePick({ first: comparePick.first, second: vid });
      navigate(`compare/${comparePick.first}-${vid}`);
    }
  };

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="phone">
        <TopBar
          onBack={(isDetail || isCompare) ? () => navigate("list") : undefined}
          onLogout={user ? logout : undefined}
          user={user}
        />
        <main className="main">
          {/* LOGIN */}
          {isLogin && (
            user ? (
              <div className="center">
                You are signed in. <button className="btn" onClick={()=>navigate("list")} style={{ marginLeft: 8 }}>Go to courts</button>
              </div>
            ) : (
              <LoginScreen onSuccess={(email)=>{ login(email); navigate("list"); }} />
            )
          )}

          {/* LIST */}
          {!isLogin && !isDetail && !isCompare && (
            <>
              <FiltersPanel
                query={q} setQuery={setQ}
                surface={surface} setSurface={setSurface}
                city={city} setCity={setCity}
                sort={order} setSort={setOrder}
              />
              {comparePick.first && (
                <div className="card" style={{ marginTop: 12 }}>
                  <div className="pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div className="small">Selected for compare: <b>{comparePick.first}</b> — pick another card to compare</div>
                    <button className="btn alt" onClick={()=>setComparePick({first:null, second:null})}>Clear</button>
                  </div>
                </div>
              )}
              <VenueList
                venues={results.slice(0, limit)}
                onSelect={(vid) => navigate(`detail/${vid}`)}
                onComparePick={handleComparePick}
              />
              {limit < results.length && <div className="center">Loading more…</div>}
            </>
          )}

          {/* DETAIL */}
          {isDetail && (
            chosen ? (
              <VenueDetail venue={chosen} reviews={byVenue(chosen.id)} addReview={addReview} />
            ) : (
              <div className="center">Court not found.</div>
            )
          )}

          {/* COMPARE */}
          {isCompare && (
            <CompareView a={cmpA} b={cmpB} />
          )}
        </main>
      </div>
    </div>
  );
}


