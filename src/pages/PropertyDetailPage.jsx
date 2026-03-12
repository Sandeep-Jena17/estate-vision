import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   PROPERTY DETAIL PAGE
   Features:
   - Full image gallery + lightbox
   - Sticky booking / contact panel
   - Map with landmark distance cards
   - 3D tour & video tabs
   - Amenities, specs, floor plan
   - Save to wishlist
   - Similar properties scroll
   - Agent contact form
───────────────────────────────────────────── */

/* ── MOCK DATA (replace with props/API) ── */
const MOCK_PROPERTY = {
  id: 1,
  premium: true,
  badge: "new",
  rera: "OD/APT/2024/001234",
  title: "Prestige Lakeview Residences",
  type: "Apartment",
  price: 8500000,
  priceLabel: "₹85 Lakh",
  pricePerSqft: 5312,
  emiFrom: "₹42,800/mo",
  location: "Patia, Bhubaneswar, Odisha — 751024",
  status: "Ready to Move",
  possession: "Immediate",
  postedDate: "2 days ago",
  views: 342,
  saves: 28,
  beds: 3, baths: 2, sqft: 1600,
  floor: "12th", totalFloors: 18, parking: 1,
  furnished: "Semi-Furnished",
  facing: "East",
  societyName: "Prestige Group",
  age: 0,
  description: `Discover unparalleled luxury living at Prestige Lakeview Residences — a landmark development nestled in the heart of Patia, Bhubaneswar's most sought-after IT corridor. 

These stunning east-facing 3BHK apartments offer sweeping lake views, premium Italian marble flooring, modular kitchen with branded appliances, and floor-to-ceiling windows that flood every room with natural light.

The project is RERA-registered, legally clear, and features world-class amenities including a rooftop infinity pool, fully-equipped gymnasium, and 24/7 concierge service.`,
  highlights: ["Lake-facing units","Italian marble floors","Modular kitchen","EV charging ready","RERA certified","100% Vastu compliant"],
  amenities: [
    { cat:"Fitness", items:["Swimming Pool","Gymnasium","Jogging Track","Yoga Deck","Squash Court"] },
    { cat:"Social",  items:["Club House","Party Hall","Library","Co-working Space","Rooftop Lounge"] },
    { cat:"Kids",    items:["Play Area","Sand Pit","Mini Theatre","Activity Room"] },
    { cat:"Safety",  items:["24/7 CCTV","Intercom","Fire Safety","Security Cabin","Boom Barrier"] },
    { cat:"Utilities",items:["Power Backup","EV Charging","Solar Panels","Rain Water Harvesting","STP Plant"] },
  ],
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200",
    "https://images.unsplash.com/photo-1560185008-a33f5c7b088f?w=1200",
  ],
  floorPlanUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  has3D: true,
  hasVideo: true,
  matterportId: "demo_3d_id",
  youtubeId: "dQw4w9WgXcQ",
  landmarks: [
    { name:"Biju Patnaik Airport", icon:"✈️", bg:"#eff6ff", distKm:"8.5", driveMin:"18", walkMin:null },
    { name:"Bhubaneswar Railway Stn", icon:"🚆", bg:"#f0fdf4", distKm:"5.2", driveMin:"12", walkMin:null },
    { name:"AIIMS Bhubaneswar", icon:"🏥", bg:"#fef2f2", distKm:"3.1", driveMin:"8", walkMin:"38" },
    { name:"Infocity IT Park", icon:"💼", bg:"#fefce8", distKm:"2.8", driveMin:"7", walkMin:"34" },
    { name:"DAV Public School", icon:"🏫", bg:"#f0fdf4", distKm:"0.9", driveMin:"3", walkMin:"11" },
    { name:"Esplanade One Mall", icon:"🛍️", bg:"#fdf4ff", distKm:"4.2", driveMin:"10", walkMin:null },
    { name:"Bhubaneswar Metro Stn", icon:"🚇", bg:"#eff6ff", distKm:"1.2", driveMin:"4", walkMin:"15" },
    { name:"Apollo Hospitals", icon:"💊", bg:"#fef2f2", distKm:"2.5", driveMin:"6", walkMin:"30" },
  ],
  agent: {
    name:"Priya Sharma", role:"Senior Property Consultant",
    avatar:"https://i.pravatar.cc/80?img=47",
    phone:"+91 98765 43210", email:"priya@estatevision.com",
    rating:4.9, deals:214, responseTime:"< 1 hour",
  },
  similar: [
    { id:2, title:"Royal Villas Gated Community", priceLabel:"₹2.5 Cr", beds:4, sqft:3500, image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400", location:"Nayapalli" },
    { id:3, title:"Sunrise Heights 2BHK", priceLabel:"₹42 Lakh", beds:2, sqft:1000, image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", location:"Chandrasekharpur" },
    { id:4, title:"Emerald Court Penthouse", priceLabel:"₹1.5 Cr", beds:3, sqft:1800, image:"https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400", location:"Saheed Nagar" },
    { id:6, title:"Silicon Heights Smart Homes", priceLabel:"₹68 Lakh", beds:3, sqft:1200, image:"https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400", location:"Infocity" },
  ],
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function PropertyDetailPage({ property = MOCK_PROPERTY, onBack, onSelectSimilar }) {
  const [activeImg,    setActiveImg]    = useState(0);
  const [lightbox,     setLightbox]     = useState(false);
  const [activeTab,    setActiveTab]    = useState("overview");
  const [saved,        setSaved]        = useState(false);
  const [showBooking,  setShowBooking]  = useState(false);
  const [toastMsg,     setToastMsg]     = useState("");
  const [activeLmType, setActiveLmType] = useState("All");

  const showToast = (msg) => { setToastMsg(msg); setTimeout(()=>setToastMsg(""), 2800); };
  const handleSave = () => { setSaved(!saved); showToast(saved ? "Removed from saved" : "✅ Saved to wishlist!"); };

  const lmTypes = ["All","Airport","Hospital","School","IT Park","Metro","Mall"];
  const filteredLm = property.landmarks.filter(lm => {
    if (activeLmType === "All") return true;
    const map = { Airport:"✈️", Hospital:"🏥", School:"🏫", "IT Park":"💼", Metro:"🚇", Mall:"🛍️" };
    return lm.icon === map[activeLmType];
  });

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div style={{ paddingTop:68, background:"var(--cream)", minHeight:"100vh" }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ background:"white", borderBottom:"1px solid var(--border)" }}>
        <div className="container" style={{ padding:"12px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div className="breadcrumb" style={{ padding:0 }}>
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", fontSize:13, fontFamily:"var(--font-body)" }}>Home</button>
            <span className="sep">›</span>
            <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", fontSize:13, fontFamily:"var(--font-body)" }}>Properties</button>
            <span className="sep">›</span>
            <span className="current">{property.title}</span>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-outline btn-sm" onClick={()=>navigator.clipboard?.writeText(window.location.href).then(()=>showToast("🔗 Link copied!"))}>⤴ Share</button>
            <button className={`btn btn-sm ${saved?"":"btn-outline"}`}
              style={saved ? { background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca" } : {}}
              onClick={handleSave}>{saved?"♥ Saved":"♡ Save"}</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:"28px 24px" }}>

        {/* ── TITLE ROW ── */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, marginBottom:24, flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
              {property.premium && <span className="badge badge-premium">✦ Premium</span>}
              <span className="badge badge-rera">RERA ✓</span>
              <span className={`badge ${property.status==="Ready to Move"?"badge-new":"badge-verified"}`}>{property.status}</span>
              {property.has3D && <span className="badge" style={{ background:"#f0fdf4", color:"#059669", border:"1px solid #a7f3d0" }}>⟳ 3D Tour</span>}
            </div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,3.5vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:6, lineHeight:1.2 }}>{property.title}</h1>
            <div style={{ fontSize:14, color:"var(--muted)", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
              <span>📍 {property.location}</span>
              <span>👁 {property.views} views</span>
              <span>♥ {property.saves} saves</span>
              <span>🕐 Listed {property.postedDate}</span>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:700, color:"var(--slate)", lineHeight:1 }}>{property.priceLabel}</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>₹{property.pricePerSqft.toLocaleString()}/sq ft</div>
            <div style={{ fontSize:12, color:"var(--green)", marginTop:4 }}>EMI from {property.emiFrom} 🏦</div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:28, alignItems:"start" }}>

          {/* LEFT */}
          <div>
            {/* ── IMAGE GALLERY ── */}
            <div style={{ marginBottom:20 }}>
              {/* Main image */}
              <div style={{ position:"relative", borderRadius:16, overflow:"hidden", aspectRatio:"16/9", cursor:"zoom-in" }} onClick={()=>setLightbox(true)}>
                <img src={property.images[activeImg]} alt={property.title}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <button onClick={e=>{e.stopPropagation();setActiveImg(i=>(i-1+property.images.length)%property.images.length);}}
                  style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,.9)", border:"none", fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"var(--shadow-md)", zIndex:2 }}>‹</button>
                <button onClick={e=>{e.stopPropagation();setActiveImg(i=>(i+1)%property.images.length);}}
                  style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,.9)", border:"none", fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"var(--shadow-md)", zIndex:2 }}>›</button>
                <div style={{ position:"absolute", bottom:14, right:14, background:"rgba(0,0,0,.6)", color:"white", fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:20 }}>
                  {activeImg+1} / {property.images.length}
                </div>
                <button onClick={e=>{e.stopPropagation();setLightbox(true);}}
                  style={{ position:"absolute", bottom:14, left:14, background:"rgba(255,255,255,.9)", border:"none", fontSize:12, fontWeight:600, color:"var(--slate)", padding:"6px 14px", borderRadius:20, cursor:"pointer", fontFamily:"var(--font-body)" }}>⊞ All {property.images.length} Photos</button>
              </div>
              {/* Thumbnails */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6, marginTop:8 }}>
                {property.images.slice(0,5).map((img,i) => (
                  <div key={i} onClick={()=>setActiveImg(i)}
                    style={{ borderRadius:8, overflow:"hidden", aspectRatio:"4/3", cursor:"pointer", border:`2px solid ${activeImg===i?"var(--gold)":"transparent"}`, transition:"border-color .2s" }}>
                    <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── QUICK SPECS ── */}
            <div style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", padding:"20px 24px", display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0, marginBottom:20 }}>
              {[["🛏",`${property.beds} BHK`,"Bedrooms"],["🚿",property.baths,"Bathrooms"],["📐",`${property.sqft.toLocaleString()} sqft`,"Carpet Area"],["🏢",`${property.floor} / ${property.totalFloors}`,"Floor"],["🚗",`${property.parking} Car`,"Parking"]].map(([icon,val,label],i,arr)=>(
                <div key={label} style={{ textAlign:"center", borderRight:i<arr.length-1?"1px solid var(--border)":0 }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>{icon}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:"var(--slate)" }}>{val}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* ── HIGHLIGHT PILLS ── */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
              {property.highlights.map(h => (
                <span key={h} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:20, background:"var(--gold-lt)", color:"var(--gold)", fontSize:12, fontWeight:600, border:"1px solid #e8c97a" }}>
                  ✓ {h}
                </span>
              ))}
            </div>

            {/* ── TABS ── */}
            <div style={{ display:"flex", gap:0, borderBottom:"2px solid var(--border)", marginBottom:28 }}>
              {[["overview","Overview"],["amenities","Amenities"],["media","3D & Video"],["map","Location"],["floorplan","Floor Plan"]].map(([id,label])=>(
                <button key={id} onClick={()=>setActiveTab(id)}
                  style={{ padding:"11px 20px", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:13, fontWeight:500, color:activeTab===id?"var(--slate)":"var(--muted)", borderBottom:activeTab===id?"2px solid var(--gold)":"2px solid transparent", marginBottom:-2, transition:"all .2s", whiteSpace:"nowrap" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <div style={{ animation:"slideUp .3s ease" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:14 }}>About this Property</h2>
                <div style={{ fontSize:14, color:"#4b5563", lineHeight:1.9, marginBottom:28, whiteSpace:"pre-line" }}>{property.description}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, background:"white", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden" }}>
                  {[
                    ["Property Type",property.type],["Status",property.status],
                    ["Possession",property.possession],["Furnished",property.furnished],
                    ["Floor",`${property.floor} of ${property.totalFloors}`],["Facing",property.facing],
                    ["Society",property.societyName],["Parking",`${property.parking} Covered`],
                    ["Age",property.age===0?"New Property":`${property.age} Years`],["RERA No.",property.rera],
                  ].map(([k,v],i)=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 20px", borderBottom:"1px solid var(--border)", borderRight:i%2===0?"1px solid var(--border)":"0", background:i%4<2?"white":"#fdfdfd" }}>
                      <span style={{ fontSize:13, color:"var(--muted)" }}>{k}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:"var(--slate)", textAlign:"right", maxWidth:"55%" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── AMENITIES TAB ── */}
            {activeTab === "amenities" && (
              <div style={{ animation:"slideUp .3s ease" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Amenities & Facilities</h2>
                {property.amenities.map(cat => (
                  <div key={cat.cat} style={{ marginBottom:24 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>{cat.cat}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
                      {cat.items.map(item => (
                        <div key={item} style={{ display:"flex", alignItems:"center", gap:10, background:"white", border:"1px solid var(--border)", borderRadius:10, padding:"11px 14px" }}>
                          <span style={{ color:"var(--green)", fontSize:15, flexShrink:0 }}>✓</span>
                          <span style={{ fontSize:13, color:"var(--slate)", fontWeight:500 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── 3D & VIDEO TAB ── */}
            {activeTab === "media" && (
              <div style={{ animation:"slideUp .3s ease" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:8 }}>Virtual Tours & Media</h2>
                <div style={{ fontSize:13, color:"var(--muted)", marginBottom:20 }}>Experience the property from the comfort of your home</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  {/* 3D Tour card */}
                  {property.has3D && (
                    <MediaCard icon="⟳" badge={{ bg:"#f0fdf4", color:"#059669", border:"#a7f3d0", text:"3D TOUR" }}
                      title="Virtual 3D Walkthrough" sub="Explore every room in 360°" image={property.images[0]}
                      onClick={()=>showToast("🔭 Opening 3D tour... (Matterport embed goes here)")} />
                  )}
                  {/* Video tour card */}
                  {property.hasVideo && (
                    <MediaCard icon="▶" badge={{ bg:"#fef2f2", color:"#dc2626", border:"#fecaca", text:"VIDEO TOUR" }}
                      title="Property Video Tour" sub="Full walkthrough with commentary" image={property.images[1]}
                      onClick={()=>showToast("▶ Opening video... (YouTube/AWS IVS embed goes here)")} />
                  )}
                </div>
                <div style={{ marginTop:20, background:"var(--cream)", borderRadius:12, border:"1px dashed var(--border2)", padding:"16px 20px", fontSize:13, color:"var(--muted)" }}>
                  💡 <strong style={{ color:"var(--slate)" }}>Integration note:</strong> Replace the onClick handlers above with:
                  <br/>3D: <code style={{ background:"white", padding:"1px 6px", borderRadius:4, fontSize:12 }}>my.matterport.com/show/?m={"{property.matterportId}"}</code>
                  <br/>Video: <code style={{ background:"white", padding:"1px 6px", borderRadius:4, fontSize:12 }}>youtube.com/embed/{"{property.youtubeId}"}</code>
                </div>
              </div>
            )}

            {/* ── LOCATION / MAP TAB ── */}
            {activeTab === "map" && (
              <div style={{ animation:"slideUp .3s ease" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:6 }}>Location & Connectivity</h2>
                <div style={{ fontSize:13, color:"var(--muted)", marginBottom:20 }}>📍 {property.location}</div>

                {/* Simulated Map */}
                <MapView property={property} />

                {/* Landmark filter chips */}
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", margin:"20px 0 14px" }}>
                  {lmTypes.map(t => (
                    <button key={t} onClick={()=>setActiveLmType(t)}
                      style={{ padding:"5px 14px", borderRadius:20, border:`1.5px solid ${activeLmType===t?"var(--slate)":"var(--border)"}`, background:activeLmType===t?"var(--slate)":"white", color:activeLmType===t?"white":"var(--muted)", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"var(--font-body)", transition:"all .2s" }}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Landmark distance cards */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {filteredLm.map((lm,i) => (
                    <div key={i} style={{ background:"white", border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, transition:"all .2s" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="";}}>
                      <div style={{ width:42, height:42, borderRadius:10, background:lm.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{lm.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{lm.name}</div>
                        <div style={{ fontSize:11, color:"var(--muted)", marginTop:1 }}>{lm.distKm} km away</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:"var(--green)" }}>🚗 {lm.driveMin} min</div>
                        {lm.walkMin && <div style={{ fontSize:10, color:"var(--muted)" }}>🚶 {lm.walkMin} min</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FLOOR PLAN TAB ── */}
            {activeTab === "floorplan" && (
              <div style={{ animation:"slideUp .3s ease" }}>
                <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Floor Plan</h2>
                <div style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden" }}>
                  <img src={property.floorPlanUrl} alt="Floor Plan" style={{ width:"100%", maxHeight:500, objectFit:"contain", background:"#f8f8f8", display:"block" }} />
                </div>
                <div style={{ marginTop:16, display:"flex", gap:10 }}>
                  <button className="btn btn-outline btn-sm">⬇ Download PDF</button>
                  <button className="btn btn-outline btn-sm">🔍 View Full Screen</button>
                </div>
              </div>
            )}

            {/* ── SIMILAR PROPERTIES ── */}
            <div style={{ marginTop:48 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)" }}>Similar Properties</h3>
                <button onClick={onBack} className="btn btn-outline btn-sm">View All →</button>
              </div>
              <div style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:8 }}>
                {property.similar.map(p => (
                  <div key={p.id} onClick={()=>onSelectSimilar?.(p)}
                    style={{ minWidth:220, borderRadius:14, border:"1px solid var(--border)", overflow:"hidden", cursor:"pointer", flexShrink:0, background:"white", transition:"all .22s" }}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-md)";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform="";}}>
                    <img src={p.image} alt={p.title} style={{ width:"100%", height:120, objectFit:"cover", display:"block" }} />
                    <div style={{ padding:"12px 14px" }}>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, color:"var(--slate)" }}>{p.priceLabel}</div>
                      <div style={{ fontSize:12, fontWeight:500, color:"var(--slate)", marginTop:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>📍 {p.location}</div>
                      <div style={{ display:"flex", gap:10, marginTop:8, fontSize:11, color:"var(--muted)" }}>
                        <span>🛏 {p.beds} BHK</span><span>📐 {p.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: BOOKING PANEL ── */}
          <BookingPanel property={property} onBooked={()=>showToast("✅ Booking confirmed! Agent will call you.")} />
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.95)", zIndex:3000, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={()=>setLightbox(false)}>
          <button onClick={()=>{ setActiveImg(i=>(i-1+property.images.length)%property.images.length); }} style={{ position:"absolute", left:24, top:"50%", transform:"translateY(-50%)", width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"none", fontSize:26, color:"white", cursor:"pointer" }}>‹</button>
          <img src={property.images[activeImg]} alt="" style={{ maxWidth:"80vw", maxHeight:"85vh", objectFit:"contain", borderRadius:8 }} onClick={e=>e.stopPropagation()} />
          <button onClick={()=>{ setActiveImg(i=>(i+1)%property.images.length); }} style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"none", fontSize:26, color:"white", cursor:"pointer" }}>›</button>
          <button onClick={()=>setLightbox(false)} style={{ position:"absolute", top:24, right:24, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"none", fontSize:18, color:"white", cursor:"pointer" }}>✕</button>
          <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
            {property.images.map((_,i) => (
              <div key={i} onClick={e=>{e.stopPropagation();setActiveImg(i);}} style={{ width:activeImg===i?24:8, height:8, borderRadius:4, background:activeImg===i?"var(--gold)":"rgba(255,255,255,.4)", cursor:"pointer", transition:"all .2s" }} />
            ))}
          </div>
        </div>
      )}

      {/* ── BOOKING MODAL ── */}
      {showBooking && <BookingModal property={property} onClose={()=>setShowBooking(false)} onSuccess={()=>{ setShowBooking(false); showToast("✅ Visit booked! Agent will call you."); }} />}

      {/* ── TOAST ── */}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}

/* ════════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════════ */

/* ── Simulated Map ── */
function MapView({ property }) {
  return (
    <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid var(--border)", background:"#dce8f0", position:"relative", height:320 }}>
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(80,120,160,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(80,120,160,.15) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
      {/* SVG roads */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.25 }} viewBox="0 0 800 320">
        <line x1="0" y1="160" x2="800" y2="160" stroke="#4a7a9a" strokeWidth="10"/>
        <line x1="400" y1="0" x2="400" y2="320" stroke="#4a7a9a" strokeWidth="8"/>
        <line x1="0" y1="80" x2="800" y2="80" stroke="#4a7a9a" strokeWidth="3"/>
        <line x1="0" y1="240" x2="800" y2="240" stroke="#4a7a9a" strokeWidth="3"/>
        <line x1="180" y1="0" x2="180" y2="320" stroke="#4a7a9a" strokeWidth="3"/>
        <line x1="600" y1="0" x2="600" y2="320" stroke="#4a7a9a" strokeWidth="3"/>
        <ellipse cx="400" cy="160" rx="90" ry="55" fill="none" stroke="#4a7a9a" strokeWidth="2"/>
        {/* Landmark dots */}
        {[[120,60,"✈"],[660,290,"🚆"],[580,110,"🏥"],[170,260,"🏫"],[470,65,"💼"],[640,180,"🛍️"]].map(([x,y,e],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="13" fill="white" stroke="#c9b896" strokeWidth="1.5" opacity=".9"/>
            <text x={x} y={y+5} textAnchor="middle" fontSize="11">{e}</text>
          </g>
        ))}
      </svg>
      {/* Property pin */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-100%)" }}>
        <div style={{ background:"var(--gold)", width:40, height:40, borderRadius:"50% 50% 50% 0", transform:"rotate(-45deg)", boxShadow:"0 4px 16px rgba(184,134,11,.5)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <div style={{ width:12, height:12, background:"white", borderRadius:"50%", transform:"rotate(45deg)" }} />
        </div>
        <div style={{ background:"white", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:700, color:"var(--slate)", boxShadow:"var(--shadow-sm)", marginTop:4, whiteSpace:"nowrap", textAlign:"center" }}>
          {property.priceLabel}
        </div>
      </div>
      {/* Attribution */}
      <div style={{ position:"absolute", bottom:10, right:10, background:"rgba(255,255,255,.85)", padding:"3px 10px", borderRadius:6, fontSize:10, color:"var(--muted)" }}>
        📍 Google Maps integration ready
      </div>
    </div>
  );
}

/* ── Media Card ── */
function MediaCard({ icon, badge, title, sub, image, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{ borderRadius:14, overflow:"hidden", border:"1px solid var(--border)", cursor:"pointer", transition:"all .22s", boxShadow:hover?"var(--shadow-md)":"", transform:hover?"translateY(-2px)":"" }}>
      <div style={{ position:"relative", aspectRatio:"16/9", overflow:"hidden" }}>
        <img src={image} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .4s", transform:hover?"scale(1.04)":"" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.35)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(255,255,255,.92)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, transition:"transform .2s", transform:hover?"scale(1.12)":"" }}>{icon}</div>
        </div>
        <div style={{ position:"absolute", top:10, left:10 }}>
          <span style={{ padding:"3px 9px", borderRadius:20, fontSize:10, fontWeight:700, background:badge.bg, color:badge.color, border:`1px solid ${badge.border}` }}>{badge.text}</span>
        </div>
      </div>
      <div style={{ padding:"13px 16px", background:"white" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"var(--slate)" }}>{title}</div>
        <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ── Booking Panel (sticky sidebar) ── */
function BookingPanel({ property, onBooked }) {
  const [visitType, setVisitType] = useState("site");
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("10:00");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [step, setStep]           = useState(1); // 1 = form, 2 = confirm

  const submit = () => {
    if (!name || !phone || !date) return;
    setStep(2);
    setTimeout(()=>{ onBooked?.(); setStep(1); setName(""); setPhone(""); setDate(""); }, 2400);
  };

  return (
    <div style={{ position:"sticky", top:88, background:"white", borderRadius:20, border:"1px solid var(--border)", overflow:"hidden", boxShadow:"var(--shadow-md)" }}>
      {/* Header */}
      <div style={{ background:"var(--slate)", padding:"20px 24px" }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,.55)", letterSpacing:".08em", textTransform:"uppercase", marginBottom:4 }}>Starting Price</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:700, color:"white" }}>
          {property.priceLabel} <span style={{ fontSize:14, fontWeight:400, opacity:.6 }}>onwards</span>
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:4 }}>
          ₹{property.pricePerSqft.toLocaleString()}/sqft · {property.sqft.toLocaleString()} sqft
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <span className="badge badge-rera" style={{ fontSize:10 }}>RERA ✓</span>
          {property.status==="Ready to Move" && <span className="badge badge-new" style={{ fontSize:10 }}>Ready to Move</span>}
        </div>
      </div>

      {/* Agent strip */}
      <div style={{ padding:"12px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12, background:"#fafaf8" }}>
        <img src={property.agent.avatar} alt={property.agent.name} style={{ width:38, height:38, borderRadius:"50%", border:"2px solid var(--gold)" }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--slate)" }}>{property.agent.name}</div>
          <div style={{ fontSize:11, color:"var(--muted)" }}>⭐ {property.agent.rating} · {property.agent.deals} deals · {property.agent.responseTime}</div>
        </div>
        <a href={`tel:${property.agent.phone}`} className="btn btn-gold btn-sm" style={{ textDecoration:"none" }}>Call</a>
      </div>

      {/* Form / Confirm */}
      <div style={{ padding:"20px 24px" }}>
        {step === 2 ? (
          <div style={{ textAlign:"center", padding:"16px 0" }}>
            <div style={{ fontSize:48, marginBottom:10 }}>✅</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--slate)" }}>Booking Confirmed!</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:6, lineHeight:1.7 }}>{property.agent.name} will contact you shortly at <strong>{phone}</strong>.</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", letterSpacing:".07em", textTransform:"uppercase", marginBottom:12 }}>Schedule a Visit</div>

            {/* Visit type */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {[["site","🏠","Site Visit"],["video","📹","Video Call"]].map(([v,icon,label])=>(
                <div key={v} onClick={()=>setVisitType(v)}
                  style={{ padding:"10px 8px", border:`1.5px solid ${visitType===v?"var(--gold)":"var(--border)"}`, borderRadius:10, cursor:"pointer", textAlign:"center", background:visitType===v?"var(--gold-lt)":"white", transition:"all .2s" }}>
                  <div style={{ fontSize:18 }}>{icon}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:visitType===v?"var(--gold)":"var(--muted)", marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              <input className="input" type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={e=>setDate(e.target.value)} style={{ fontSize:13, height:40 }} />
              <select className="select" value={time} onChange={e=>setTime(e.target.value)} style={{ height:40, fontSize:13 }}>
                {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t=><option key={t}>{t}</option>)}
              </select>
              <input className="input" placeholder="Your Name *" value={name} onChange={e=>setName(e.target.value)} style={{ fontSize:13, height:40 }} />
              <input className="input" placeholder="Phone Number *" value={phone} onChange={e=>setPhone(e.target.value)} style={{ fontSize:13, height:40 }} />
            </div>

            <button className="btn btn-gold btn-full" onClick={submit} disabled={!name||!phone||!date}
              style={{ fontSize:14, padding:"12px 0" }}>
              Book a Visit →
            </button>
            <button className="btn btn-outline btn-full" style={{ marginTop:8, fontSize:13 }}>
              💬 Chat with Agent
            </button>
          </>
        )}
      </div>

      {/* Trust footer */}
      <div style={{ padding:"12px 20px", background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div style={{ fontSize:11, color:"var(--muted)", display:"flex", gap:16 }}>
          <span>🔒 100% Safe & Secure</span>
          <span>📋 No Hidden Charges</span>
        </div>
      </div>
    </div>
  );
}

/* ── Booking Modal (full-screen) ── */
function BookingModal({ property, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", phone:"", email:"", date:"", time:"10:00", type:"Site Visit", message:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-premium" style={{ marginBottom:8 }}>✦ EstateVision</span>
            <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)" }}>
              {step===1?"Choose Your Visit":step===2?"Your Details":"Booking Confirmed!"}
            </div>
            <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{property.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Progress */}
        <div style={{ padding:"12px 28px 0" }}>
          <div style={{ display:"flex", gap:6 }}>
            {[1,2,3].map(s=><div key={s} style={{ flex:1, height:3, borderRadius:2, background:s<=step?"var(--gold)":"var(--border)", transition:"background .3s" }} />)}
          </div>
          <div style={{ fontSize:10, color:"var(--muted)", marginTop:5 }}>Step {step} of 3</div>
        </div>

        <div className="modal-body">
          {step===1 && (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
                {[["🏠","Site Visit","In-person tour"],["📹","Video Call","Virtual walkthrough"],["📞","Phone Call","Quick inquiry"]].map(([icon,t,s])=>(
                  <div key={t} onClick={()=>set("type",t)}
                    style={{ padding:"14px 10px", border:`1.5px solid ${form.type===t?"var(--gold)":"var(--border)"}`, borderRadius:12, cursor:"pointer", textAlign:"center", background:form.type===t?"var(--gold-lt)":"white" }}>
                    <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:"var(--slate)" }}>{t}</div>
                    <div style={{ fontSize:10, color:"var(--muted)" }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                <div className="field">
                  <label className="label">Date</label>
                  <input className="input" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={e=>set("date",e.target.value)} />
                </div>
                <div className="field">
                  <label className="label">Time</label>
                  <select className="select" value={form.time} onChange={e=>set("time",e.target.value)}>
                    {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn btn-gold btn-full btn-lg" onClick={()=>setStep(2)} disabled={!form.date}>Next →</button>
            </>
          )}

          {step===2 && (
            <>
              {[["Full Name *","name","text"],["Phone Number *","phone","tel"],["Email","email","email"]].map(([label,key,type])=>(
                <div key={key} className="field" style={{ marginBottom:12 }}>
                  <label className="label">{label}</label>
                  <input className="input" type={type} placeholder={label} value={form[key]} onChange={e=>set(key,e.target.value)} />
                </div>
              ))}
              <div className="field" style={{ marginBottom:20 }}>
                <label className="label">Message</label>
                <textarea className="textarea" rows={3} placeholder="Any requirements..." value={form.message} onChange={e=>set("message",e.target.value)} />
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn btn-outline" style={{ flex:1 }} onClick={()=>setStep(1)}>← Back</button>
                <button className="btn btn-gold" style={{ flex:2 }} disabled={!form.name||!form.phone} onClick={()=>setStep(3)}>Confirm →</button>
              </div>
            </>
          )}

          {step===3 && (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ width:72, height:72, background:"#ecfdf5", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 16px" }}>✓</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)", marginBottom:8 }}>You're All Set!</div>
              <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.8, marginBottom:20 }}>
                Your <strong>{form.type}</strong> has been scheduled for <strong>{form.date}</strong> at <strong>{form.time}</strong>.<br/>
                The agent will call you at <strong>{form.phone}</strong>.
              </div>
              <button className="btn btn-primary btn-full" onClick={onSuccess}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
