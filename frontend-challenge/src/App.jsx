import React, { useEffect, useMemo, useState } from "react";

// ---------------- Styles ----------------
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    :root{
      --ink:#fdf7ff; --muted:#dccfed;
      --accent:#ff62c0; --accent-2:#7a5cff;
      --glass: rgba(255,255,255,.12); --glass-stroke: rgba(255,255,255,.35);
      --focus: rgba(255,98,192,.55); --radius:18px;
    }

    *{box-sizing:border-box}
    html,body,#root{height:100%}
    body{
      margin:0; color:var(--ink);
      font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
      background: linear-gradient(135deg, #ff6fd8 0%, #3813c2 100%);
    }

    .wrap{max-width:560px;margin:0 auto;min-height:100%;display:flex;flex-direction:column}

    header{
      position:sticky; top:0; z-index:10;
      padding:12px 14px 10px;
      background: rgba(0,0,0,.3);
      backdrop-filter: blur(6px);
      border-bottom:1px solid rgba(255,255,255,.12);
    }
    .brand{display:flex;align-items:center;gap:12px}
    .dot{
      width:26px;height:26px;border-radius:8px;
      background: conic-gradient(from 180deg, var(--accent), var(--accent-2), var(--accent));
      box-shadow: 0 8px 24px rgba(255,98,192,.45);
      animation: spin 6s linear infinite;
    }
    @keyframes spin{from{transform:rotate(0)} to{transform:rotate(360deg)}}
    h1{font-size:18px;margin:0}
    h1::after{content:" ✨"}
    .sub{color:var(--muted);font-size:12px;margin-top:2px}

    .searchRow{display:flex;gap:10px;margin-top:12px}
    .search{
      flex:1; background:var(--glass); border:1px solid var(--glass-stroke);
      border-radius:14px; padding:10px 12px;
    }
    .search input{
      width:100%; background:transparent; border:0; outline:none; color:var(--ink); font-size:15px;
    }

    main{padding:12px 14px 96px}
    .grid{display:grid;grid-template-columns:1fr;gap:14px}

    .card{
      background:var(--glass); border:1px solid var(--glass-stroke);
      border-radius:var(--radius); padding:12px;
    }
    .row{display:flex;align-items:center;justify-content:space-between}
    .title{font-size:16px;margin:0}
    .meta{margin-top:6px;color:var(--muted);font-size:12px;display:flex;gap:10px;flex-wrap:wrap}

    .btnRow{display:flex;gap:10px;margin-top:12px}
    .btn{
      flex:1; border:1px solid rgba(255,255,255,.38);
      background: rgba(255,255,255,.10);
      border-radius:12px; padding:11px 12px;
      color:var(--ink); font-weight:600;
    }
    .btn.sec{border-color: rgba(122,92,255,.55); background: rgba(122,92,255,.25)}

    .back{
      display:flex;align-items:center;gap:10px;
      padding:10px 14px; background: rgba(0,0,0,.3);
      border-bottom:1px solid rgba(255,255,255,.12);
      position:sticky; top:0;
    }
    .ghost{
      background:transparent; border:1px solid rgba(255,255,255,.28);
      color:var(--ink); border-radius:10px; padding:8px 12px;
    }

    .hero{height:160px;background:#0b0f14;border-bottom:1px solid rgba(255,255,255,.12)}

    .section{padding:14px}
    .h2{font-size:16px;margin:0 0 8px}
    .chips{display:flex;flex-wrap:wrap;gap:8px}
    .chip{
      border:1px solid var(--glass-stroke);
      background: rgba(255,255,255,.1);
      border-radius:999px; padding:6px 10px;
      color:var(--muted); font-size:13px;
    }

    .review{
      background: linear-gradient(135deg, #ffdaf4, #ffe0ff);
      color:#3b2851; border-radius:18px 18px 8px 18px; padding:12px;
    }
    .reviewHead{display:flex;align-items:center;justify-content:space-between}
    .empty{padding:18px;text-align:center;color:var(--muted)}

    input,select,textarea{
      background: rgba(12,16,24,.6);
      border:1px solid rgba(255,255,255,.28);
      border-radius:12px; color:var(--ink);
      padding:10px 12px; font-size:15px;
    }

    /* --- pretty bottom sheet --- */
    .scrim{
      position:fixed; inset:0; background:rgba(10,12,18,.55);
      backdrop-filter: blur(4px);
    }
    .sheet{
      position:fixed; left:0; right:0; bottom:0;
      background: var(--glass);
      border:1px solid var(--glass-stroke);
      border-top-left-radius:24px; border-top-right-radius:24px;
      padding:14px; padding-bottom:16px;
      backdrop-filter: blur(14px) saturate(120%);
      box-shadow: 0 -18px 36px rgba(0,0,0,.45);
    }
    .drag{
      width:46px;height:5px;border-radius:999px;
      background:rgba(255,255,255,.45); margin:4px auto 10px;
    }
    .sheetHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
    .field{display:flex;flex-direction:column;gap:6px;margin-top:10px}
    label{font-size:13px;color:var(--muted)}
    input:focus,select:focus,textarea:focus{
      border-color: rgba(255,255,255,.6); box-shadow:0 0 0 3px var(--focus);
    }
    .actions{display:flex;gap:8px;margin-top:12px}
    .primary{
      background:var(--accent); color:#1a0720; border:0;
      border-radius:12px; padding:10px 12px; font-weight:700;
    }
  `}</style>
);

// ---------------- Helpers ----------------
const LS_KEY = "tennis_reviews_v1";
const readStore = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? {}; }
  catch { return {}; }
};
const writeStore = (data) => { try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {} };

const Star = ({ on }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 .9l3.2 6.7 7.4 1.1-5.3 5.2 1.2 7.1L12 17.9 5.5 21.9l1.2-7.1L1.4 8.7l7.4-1.1L12 .9z"
      fill={on ? "#ffd76a" : "#2b3545"} />
  </svg>
);

// ---------------- Mock data ----------------
const CITIES = ["Brooklyn","Queens","Bronx","Manhattan","Staten Island","Jersey City"];
const SURFACES = ["Hard Court","Clay","Grass"];
const NAMES = ["Prospect Park","Riverside","Battery Park","Astoria","Flushing Meadows"];
const r = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[r(arr.length)];
const makeCourts = (n=60) => Array.from({length:n},(_,i)=>({
  id:`c${i+1}`, name:`${pick(NAMES)} Courts`, city:pick(CITIES), surface:pick(SURFACES),
  courts:2+r(5), lights:Math.random()>.5, rating:+(3+Math.random()*2).toFixed(1), reviewCount:r(80)
}));

// ---------------- App ----------------
export default function App() {
  const [all] = useState(() => makeCourts());
  const [store, setStore] = useState(readStore());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState({name:"list"});
  const [open, setOpen] = useState(false);

  useEffect(()=>writeStore(store),[store]);

  const withStats = useMemo(()=>all.map(c=>{
    const revs = store[c.id]||[];
    if(!revs.length) return c;
    const avg = revs.reduce((s,r)=>s+r.rating,0)/revs.length;
    return {...c, rating:+avg.toFixed(1), reviewCount:revs.length};
  }),[all,store]);

  const list = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return withStats;
    return withStats.filter(c =>
      (c.name+" "+c.city+" "+c.surface).toLowerCase().includes(q)
    );
  },[withStats, query]);

  const current = page.name==="detail" ? withStats.find(c=>c.id===page.id) : null;
  const reviews = current ? (store[current.id]||[]) : [];

  const addReview = (id,rev)=>setStore(s=>{
    const next = {...(s||{})};
    next[id] = [rev, ...(next[id]||[])];
    return next;
  });

  return (
    <div className="wrap">
      <Styles/>

      {page.name==="list" && (
        <>
          <header>
            <div className="brand">
              <div className="dot"/><div>
                <h1>Tennis Courts</h1>
                <div className="sub">Find & review</div>
              </div>
            </div>
            <div className="searchRow">
              <div className="search">
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, city, surface…" />
              </div>
            </div>
          </header>

          <main>
            <div className="grid">
              {list.map(c=>(
                <article key={c.id} className="card">
                  <div className="row">
                    <h2 className="title">{c.name}</h2>
                    <div style={{display:"flex",alignItems:"center",gap:4}}>
                      {[1,2,3,4,5].map(n=><Star key={n} on={n<=Math.round(c.rating)}/>)}
                      <span style={{fontSize:12,color:"var(--muted)"}}>{c.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="meta">
                    {c.city} • {c.surface} • {c.courts} courts {c.lights && "• Lights"} • {c.reviewCount} reviews
                  </div>
                  <div className="btnRow">
                    <button className="btn" onClick={()=>setPage({name:"detail",id:c.id})}>View</button>
                    <button className="btn sec" onClick={()=>{setPage({name:"detail",id:c.id}); setOpen(true);}}>Review</button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </>
      )}

      {page.name==="detail" && current && (
        <>
          <div className="back">
            <button className="ghost" onClick={()=>setPage({name:"list"})}>← Back</button>
            <strong>{current.name}</strong>
            <button className="ghost" onClick={()=>setOpen(true)}>Add review</button>
          </div>

          <div className="hero" role="img" aria-label="Court cover" />

          <section className="section">
            <h2 className="h2">Overview</h2>
            <div className="chips">
              <div className="chip">{current.city}</div>
              <div className="chip">{current.surface}</div>
              <div className="chip">{current.courts} courts</div>
              {current.lights && <div className="chip">Lights</div>}
              <div className="chip" title="Average rating">
                {[1,2,3,4,5].map(n=><Star key={n} on={n<=Math.round(current.rating)}/>)}
                <span style={{marginLeft:8}}>{current.rating.toFixed(1)}</span>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="h2">Reviews ({reviews.length})</h2>
            {reviews.length===0 ? (
              <div className="empty">Be the first!</div>
            ) : (
              <div style={{display:"grid",gap:10}}>
                {reviews.map(r=>(
                  <article key={r.id} className="review">
                    <div className="reviewHead">
                      <div style={{fontWeight:600,fontSize:13}}>{r.name || "Anonymous"}</div>
                      <div style={{display:"flex",gap:4}}>{[1,2,3,4,5].map(n=><Star key={n} on={n<=r.rating}/>)}</div>
                    </div>
                    <div style={{marginTop:6,fontSize:14,lineHeight:1.35}}>{r.text}</div>
                    <div style={{marginTop:6,fontSize:11,color:"#a9b6c4"}}>
                      {new Date(r.createdAt).toLocaleString([], {month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit"})}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {open && (
            <ReviewSheet
              onClose={()=>setOpen(false)}
              onSubmit={(rev)=>{ addReview(current.id, rev); setOpen(false); }}
            />
          )}
        </>
      )}
    </div>
  );
}

// ---------------- Review sheet ----------------
function ReviewSheet({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const canSave = text.trim().length >= 5;

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Add review">
        <div className="drag" />
        <div className="sheetHead">
          <strong>Leave a review</strong>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>

        <div className="field">
          <label htmlFor="r_name">Name (optional)</label>
          <input id="r_name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="r_rating">Rating</label>
          <select id="r_rating" value={rating} onChange={(e)=>setRating(parseInt(e.target.value,10))}>
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} Stars</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="r_text">Review</label>
          <textarea
            id="r_text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Courts were spotless, vibes were immaculate ✨"
          />
        </div>

        <div className="actions">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <button
            className="primary"
            disabled={!canSave}
            onClick={()=>{
              if(!canSave) return;
              onSubmit({
                id: Math.random().toString(36).slice(2),
                name: name.trim(),
                rating,
                text: text.trim(),
                createdAt: new Date().toISOString(),
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
