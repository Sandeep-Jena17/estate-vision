import { useState } from "react";

/* ── MOCK USER DATA ── */
const MOCK_USER = {
  name: "Sandeep Kumar Jena",
  email: "jenasandeep595@gmail.com",
  phone: "+91 89174 04918",
  avatar: "https://i.pravatar.cc/100?img=11",
  location: "Bhubaneswar, Odisha",
  plan: "premium",
  memberSince: "January 2024",
  verified: true,
  stats: { viewed: 48, saved: 12, inquiries: 7, tours: 3 },
};

const SAVED_PROPERTIES = [
  { id:1, title:"Prestige Lakeview Residences", priceLabel:"₹85 Lakh", location:"Patia, Bhubaneswar", beds:3, sqft:1600, image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400", status:"Ready to Move", savedOn:"2 days ago", priceChange:"+₹2L", priceUp:true },
  { id:2, title:"Royal Villas — Gated Community", priceLabel:"₹2.5 Cr",  location:"Nayapalli, Bhubaneswar", beds:4, sqft:3500, image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400", status:"Under Construction", savedOn:"1 week ago", priceChange:null },
  { id:4, title:"Emerald Court Penthouse",        priceLabel:"₹1.5 Cr",  location:"Saheed Nagar, Bhubaneswar", beds:3, sqft:1800, image:"https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400", status:"Ready to Move", savedOn:"3 days ago", priceChange:"-₹5L", priceUp:false },
];

const BOOKINGS = [
  { id:"BK001", property:"Prestige Lakeview Residences", image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80", type:"Site Visit", date:"2025-03-20", time:"11:00 AM", agent:"Priya Sharma", agentAvatar:"https://i.pravatar.cc/32?img=47", status:"confirmed" },
  { id:"BK002", property:"Emerald Court Penthouse",       image:"https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=80", type:"Video Call",  date:"2025-03-25", time:"03:00 PM", agent:"Arjun Nanda",  agentAvatar:"https://i.pravatar.cc/32?img=33", status:"pending" },
  { id:"BK003", property:"Silicon Heights Smart Homes",   image:"https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=80", type:"Site Visit", date:"2025-02-10", time:"10:00 AM", agent:"Vikram Singh", agentAvatar:"https://i.pravatar.cc/32?img=67", status:"completed" },
];

const RECENTLY_VIEWED = [
  { id:3, title:"Sunrise Heights 2BHK",    priceLabel:"₹42 Lakh", image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300", beds:2, sqft:1000 },
  { id:5, title:"Green Valley Apartments", priceLabel:"₹36 Lakh", image:"https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=300", beds:2, sqft:1000 },
  { id:6, title:"Silicon Heights",         priceLabel:"₹68 Lakh", image:"https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=300", beds:3, sqft:1200 },
];

const STATUS_STYLES = {
  confirmed: { bg:"#ecfdf5", color:"#059669", border:"#a7f3d0", label:"Confirmed" },
  pending:   { bg:"#fefce8", color:"#d97706", border:"#fde68a", label:"Pending" },
  completed: { bg:"#f3f4f6", color:"#6b7280", border:"#e5e7eb", label:"Completed" },
  cancelled: { bg:"#fef2f2", color:"#dc2626", border:"#fecaca", label:"Cancelled" },
};

export default function UserDashboardPage({ onSelectProperty }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode,  setEditMode]  = useState(false);
  const [saved,     setSaved]     = useState(SAVED_PROPERTIES);
  const [form,      setForm]      = useState({ name:MOCK_USER.name, email:MOCK_USER.email, phone:MOCK_USER.phone, location:MOCK_USER.location });
  const [toastMsg,  setToastMsg]  = useState("");

  const showToast = (msg) => { setToastMsg(msg); setTimeout(()=>setToastMsg(""),2500); };
  const removeSaved = (id) => { setSaved(s=>s.filter(p=>p.id!==id)); showToast("Removed from saved"); };

  const TABS = [
    { id:"overview",  icon:"⊞",  label:"Overview"  },
    { id:"saved",     icon:"♥",  label:"Saved",     count:saved.length },
    { id:"bookings",  icon:"📅", label:"Bookings",  count:BOOKINGS.filter(b=>b.status!=="completed").length },
    { id:"history",   icon:"🕐", label:"History"   },
    { id:"settings",  icon:"⚙", label:"Settings"  },
  ];

  return (
    <div style={{ paddingTop:68, minHeight:"100vh", background:"var(--cream)" }}>

      {/* ── PROFILE HEADER BANNER ── */}
      <div style={{ background:"linear-gradient(135deg,var(--slate) 0%,#1a2035 100%)", padding:"40px 0 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", border:"60px solid rgba(184,134,11,.1)" }} />
        <div style={{ position:"absolute", bottom:-40, left:200, width:200, height:200, borderRadius:"50%", border:"40px solid rgba(184,134,11,.07)" }} />
        <div className="container" style={{ position:"relative", zIndex:2 }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:24, paddingBottom:24, flexWrap:"wrap" }}>
            {/* Avatar */}
            <div style={{ position:"relative" }}>
              <img src={MOCK_USER.avatar} alt={MOCK_USER.name} style={{ width:88, height:88, borderRadius:"50%", border:"3px solid var(--gold)", objectFit:"cover" }} />
              {MOCK_USER.verified && (
                <div style={{ position:"absolute", bottom:2, right:2, width:22, height:22, background:"#2563eb", borderRadius:"50%", border:"2px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"white" }}>✓</div>
              )}
            </div>
            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                <h1 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:700, color:"white" }}>{MOCK_USER.name}</h1>
                {MOCK_USER.plan==="premium" && <span className="badge badge-premium">✦ Premium</span>}
              </div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                {[["✉",MOCK_USER.email],["📱",MOCK_USER.phone],["📍",MOCK_USER.location]].map(([icon,val])=>(
                  <span key={val} style={{ fontSize:13, color:"rgba(255,255,255,.6)", display:"flex", gap:5, alignItems:"center" }}>{icon} {val}</span>
                ))}
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.4)", marginTop:6 }}>Member since {MOCK_USER.memberSince}</div>
            </div>
            {/* Edit button */}
            <button className="btn btn-outline" style={{ color:"white", borderColor:"rgba(255,255,255,.3)" }} onClick={()=>{ setActiveTab("settings"); setEditMode(true); }}>
              ✏ Edit Profile
            </button>
          </div>

          {/* Stats bar */}
          <div style={{ display:"flex", gap:0, borderTop:"1px solid rgba(255,255,255,.1)" }}>
            {[["👁",MOCK_USER.stats.viewed,"Properties Viewed"],["♥",MOCK_USER.stats.saved,"Saved"],["💬",MOCK_USER.stats.inquiries,"Inquiries Sent"],["🏠",MOCK_USER.stats.tours,"Tours Booked"]].map(([icon,val,label])=>(
              <div key={label} style={{ flex:1, padding:"16px 0", textAlign:"center", borderRight:"1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize:22, fontFamily:"var(--font-display)", fontWeight:700, color:"white" }}>{icon} {val}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.45)", marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab navigation */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.1)" }}>
          <div className="container" style={{ display:"flex", gap:0 }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                style={{ padding:"14px 20px", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:13, fontWeight:500, color:activeTab===tab.id?"white":"rgba(255,255,255,.5)", borderBottom:activeTab===tab.id?"2px solid var(--gold)":"2px solid transparent", transition:"all .2s", display:"flex", alignItems:"center", gap:7 }}>
                {tab.icon} {tab.label}
                {tab.count > 0 && <span style={{ background:"var(--gold)", color:"var(--slate)", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:10 }}>{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="container" style={{ padding:"32px 24px", maxWidth:1100 }}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, animation:"slideUp .3s ease" }}>
            {/* Upcoming bookings */}
            <div className="panel">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--slate)" }}>Upcoming Visits</div>
                <button onClick={()=>setActiveTab("bookings")} style={{ fontSize:12, color:"var(--gold)", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontWeight:600 }}>View All →</button>
              </div>
              {BOOKINGS.filter(b=>b.status!=="completed").map(b => (
                <BookingRow key={b.id} booking={b} />
              ))}
              {BOOKINGS.filter(b=>b.status!=="completed").length===0 && (
                <EmptyWidget icon="📅" text="No upcoming visits" action="Browse Properties" onAction={()=>{}} />
              )}
            </div>

            {/* Saved properties preview */}
            <div className="panel">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--slate)" }}>Saved Properties</div>
                <button onClick={()=>setActiveTab("saved")} style={{ fontSize:12, color:"var(--gold)", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontWeight:600 }}>View All ({saved.length}) →</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {saved.slice(0,3).map(p => (
                  <div key={p.id} onClick={()=>onSelectProperty?.(p)} style={{ display:"flex", gap:12, alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--border)", cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity=".8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    <img src={p.image} alt={p.title} style={{ width:52, height:40, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                      <div style={{ fontSize:12, color:"var(--muted)" }}>{p.priceLabel} · {p.beds} BHK</div>
                    </div>
                    {p.priceChange && (
                      <span style={{ fontSize:11, fontWeight:700, color:p.priceUp?"#dc2626":"#059669", flexShrink:0 }}>{p.priceChange}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recently viewed */}
            <div className="panel" style={{ gridColumn:"1/-1" }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Recently Viewed</div>
              <div style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:4 }}>
                {RECENTLY_VIEWED.map(p => (
                  <div key={p.id} onClick={()=>onSelectProperty?.(p)} style={{ minWidth:200, borderRadius:12, border:"1px solid var(--border)", overflow:"hidden", cursor:"pointer", flexShrink:0, transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-md)";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                    <img src={p.image} alt={p.title} style={{ width:"100%", height:110, objectFit:"cover", display:"block" }} />
                    <div style={{ padding:"10px 12px" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:"var(--slate)", fontFamily:"var(--font-display)" }}>{p.priceLabel}</div>
                      <div style={{ fontSize:12, color:"var(--muted)", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium CTA */}
            {MOCK_USER.plan !== "premium" && (
              <div style={{ gridColumn:"1/-1", background:"linear-gradient(135deg,var(--slate),#1a2035)", borderRadius:16, padding:28, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div className="badge badge-premium" style={{ marginBottom:8 }}>✦ Upgrade</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:20, color:"white", marginBottom:4 }}>Unlock AI Features</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,.6)" }}>Valuations, document scanner, AI assistant & more</div>
                </div>
                <button className="btn btn-gold btn-lg">Upgrade to Premium →</button>
              </div>
            )}
          </div>
        )}

        {/* SAVED PROPERTIES */}
        {activeTab === "saved" && (
          <div style={{ animation:"slideUp .3s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <div className="section-eyebrow">Wishlist</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"var(--slate)" }}>Saved Properties ({saved.length})</div>
              </div>
            </div>
            {saved.length === 0 ? (
              <EmptyWidget icon="♥" text="No saved properties yet" action="Browse Properties" onAction={()=>{}} />
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
                {saved.map(p => (
                  <div key={p.id} style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden" }}>
                    <div style={{ position:"relative" }}>
                      <img src={p.image} alt={p.title} style={{ width:"100%", height:180, objectFit:"cover", display:"block", cursor:"pointer" }} onClick={()=>onSelectProperty?.(p)} />
                      <button onClick={()=>removeSaved(p.id)}
                        style={{ position:"absolute", top:10, right:10, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,.92)", border:"none", fontSize:16, cursor:"pointer", color:"#dc2626" }}>♥</button>
                      {p.priceChange && (
                        <div style={{ position:"absolute", bottom:10, left:10, background:"rgba(0,0,0,.75)", color:p.priceUp?"#fca5a5":"#86efac", padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>
                          {p.priceUp?"↑":"↓"} {p.priceChange} since saved
                        </div>
                      )}
                    </div>
                    <div style={{ padding:"14px 16px" }}>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--slate)" }}>{p.priceLabel}</div>
                      <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)", margin:"4px 0 2px" }}>{p.title}</div>
                      <div style={{ fontSize:12, color:"var(--muted)" }}>📍 {p.location} · Saved {p.savedOn}</div>
                      <div style={{ display:"flex", gap:12, marginTop:10, paddingTop:10, borderTop:"1px solid var(--border)" }}>
                        <button className="btn btn-gold btn-sm" style={{ flex:1 }} onClick={()=>onSelectProperty?.(p)}>View Details</button>
                        <button className="btn btn-outline btn-sm" style={{ flex:1 }}>Schedule Visit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div style={{ animation:"slideUp .3s ease" }}>
            <div style={{ marginBottom:24 }}>
              <div className="section-eyebrow">My Schedule</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"var(--slate)" }}>Property Visits & Bookings</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {BOOKINGS.map(b => {
                const s = STATUS_STYLES[b.status];
                return (
                  <div key={b.id} style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", padding:"20px 24px", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                    <img src={b.image} alt={b.property} style={{ width:72, height:56, borderRadius:10, objectFit:"cover", flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:200 }}>
                      <div style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>{b.property}</div>
                      <div style={{ fontSize:13, color:"var(--muted)", marginTop:2 }}>{b.type} · 📅 {b.date} at {b.time}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
                        <img src={b.agentAvatar} style={{ width:22, height:22, borderRadius:"50%" }} alt={b.agent} />
                        <span style={{ fontSize:12, color:"var(--muted)" }}>Agent: {b.agent}</span>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10 }}>
                      <span style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700, background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>{s.label}</span>
                      <span style={{ fontSize:11, color:"var(--muted)" }}>#{b.id}</span>
                    </div>
                    {b.status !== "completed" && b.status !== "cancelled" && (
                      <div style={{ display:"flex", gap:8 }}>
                        <button className="btn btn-outline btn-sm">Reschedule</button>
                        <button className="btn btn-sm" style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" }}>Cancel</button>
                      </div>
                    )}
                    {b.status === "completed" && (
                      <button className="btn btn-outline btn-sm">Write Review</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (
          <div style={{ animation:"slideUp .3s ease" }}>
            <div style={{ marginBottom:24 }}>
              <div className="section-eyebrow">Activity</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"var(--slate)" }}>Viewing History</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[...RECENTLY_VIEWED,...RECENTLY_VIEWED].map((p,i) => (
                <div key={i} onClick={()=>onSelectProperty?.(p)} style={{ background:"white", borderRadius:12, border:"1px solid var(--border)", padding:"14px 18px", display:"flex", alignItems:"center", gap:16, cursor:"pointer", transition:"all .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                  <img src={p.image} alt={p.title} style={{ width:56, height:44, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:"var(--slate)" }}>{p.title}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{p.priceLabel} · {p.beds} BHK · {p.sqft.toLocaleString()} sqft</div>
                  </div>
                  <div style={{ fontSize:11, color:"var(--muted)" }}>{i === 0?"2h ago":i===1?"Yesterday":`${i+1} days ago`}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div style={{ animation:"slideUp .3s ease", maxWidth:660 }}>
            <div style={{ marginBottom:28 }}>
              <div className="section-eyebrow">Account</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"var(--slate)" }}>Profile Settings</div>
            </div>

            {/* Profile form */}
            <div className="panel" style={{ marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div style={{ fontSize:16, fontWeight:700, color:"var(--slate)" }}>Personal Information</div>
                <button onClick={()=>setEditMode(!editMode)} className="btn btn-outline btn-sm">
                  {editMode ? "Cancel" : "✏ Edit"}
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[["Full Name","name","text"],["Email","email","email"],["Phone","phone","tel"],["Location","location","text"]].map(([label,key,type])=>(
                  <div key={key} className="field">
                    <label className="label">{label}</label>
                    {editMode
                      ? <input className="input" type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} />
                      : <div style={{ height:44, padding:"0 14px", background:"var(--cream)", borderRadius:6, display:"flex", alignItems:"center", fontSize:14, color:"var(--slate)" }}>{form[key]}</div>
                    }
                  </div>
                ))}
              </div>
              {editMode && (
                <div style={{ display:"flex", gap:10, marginTop:20 }}>
                  <button className="btn btn-gold" onClick={()=>{ setEditMode(false); showToast("✅ Profile updated!"); }}>Save Changes</button>
                  <button className="btn btn-outline" onClick={()=>setEditMode(false)}>Cancel</button>
                </div>
              )}
            </div>

            {/* Notification preferences */}
            <div className="panel" style={{ marginBottom:24 }}>
              <div style={{ fontSize:16, fontWeight:700, color:"var(--slate)", marginBottom:16 }}>Notifications</div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  ["Price Alerts","Get notified when saved property prices change",true],
                  ["New Listings","Similar properties matching your search",true],
                  ["Booking Reminders","Reminders before your scheduled visits",true],
                  ["Agent Messages","Messages from property agents",false],
                  ["Platform Updates","New features & announcements",false],
                ].map(([title,desc,defaultVal])=>(
                  <NotifRow key={title} title={title} desc={desc} defaultVal={defaultVal} />
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="panel" style={{ border:"1px solid #fecaca" }}>
              <div style={{ fontSize:16, fontWeight:700, color:"#dc2626", marginBottom:4 }}>Danger Zone</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginBottom:16 }}>These actions are irreversible. Please be careful.</div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn btn-sm" style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" }}>Deactivate Account</button>
                <button className="btn btn-sm" style={{ background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" }}>Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}

function BookingRow({ booking: b }) {
  const s = STATUS_STYLES[b.status];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
      <img src={b.image} alt={b.property} style={{ width:48, height:36, borderRadius:6, objectFit:"cover", flexShrink:0 }} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.property}</div>
        <div style={{ fontSize:11, color:"var(--muted)" }}>{b.type} · {b.date}</div>
      </div>
      <span style={{ padding:"3px 8px", borderRadius:20, fontSize:10, fontWeight:700, background:s.bg, color:s.color, border:`1px solid ${s.border}`, flexShrink:0 }}>{s.label}</span>
    </div>
  );
}

function NotifRow({ title, desc, defaultVal }) {
  const [on, setOn] = useState(defaultVal);
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
      <div>
        <div style={{ fontSize:14, fontWeight:500, color:"var(--slate)" }}>{title}</div>
        <div style={{ fontSize:12, color:"var(--muted)" }}>{desc}</div>
      </div>
      <div onClick={()=>setOn(!on)} style={{ width:44, height:24, borderRadius:12, background:on?"var(--gold)":"var(--border)", cursor:"pointer", position:"relative", transition:"background .2s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3, left:on?22:3, width:18, height:18, borderRadius:"50%", background:"white", transition:"left .2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
      </div>
    </div>
  );
}

function EmptyWidget({ icon, text, action, onAction }) {
  return (
    <div style={{ textAlign:"center", padding:"32px 0" }}>
      <div style={{ fontSize:36, marginBottom:8 }}>{icon}</div>
      <div style={{ fontSize:14, color:"var(--muted)", marginBottom:12 }}>{text}</div>
      <button className="btn btn-gold btn-sm" onClick={onAction}>{action}</button>
    </div>
  );
}
