import { useState, useMemo } from "react";
import { PROPERTIES } from "./data/properties"; // import your data

/* ── MOCK DATA (remove if importing from data file) ── */
const MOCK_PROPERTIES = [
  { id:1, premium:true, badge:"new", title:"Prestige Lakeview Residences", type:"Apartment", price:8500000, priceLabel:"₹85 Lakh", pricePerSqft:5312, location:"Patia, Bhubaneswar", beds:3, baths:2, sqft:1600, parking:1, furnished:"Semi", status:"Ready to Move", possession:"Immediate", images:["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"], agent:{name:"Priya Sharma",avatar:"https://i.pravatar.cc/32?img=47",rating:4.9}, postedDate:"2 days ago", has3D:true, hasVideo:true, amenities:["Pool","Gym","Security"] },
  { id:2, premium:true, badge:"hot", title:"Royal Villas — Gated Community", type:"Villa", price:25000000, priceLabel:"₹2.5 Cr", pricePerSqft:7142, location:"Nayapalli, Bhubaneswar", beds:4, baths:4, sqft:3500, parking:2, furnished:"Fully", status:"Under Construction", possession:"Dec 2025", images:["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600"], agent:{name:"Rohit Patel",avatar:"https://i.pravatar.cc/32?img=12",rating:4.8}, postedDate:"1 week ago", has3D:true, hasVideo:true, amenities:["Private Pool","Theater","Smart Home"] },
  { id:3, premium:false, badge:"verified", title:"Sunrise Heights 2BHK", type:"Apartment", price:4200000, priceLabel:"₹42 Lakh", pricePerSqft:4200, location:"Chandrasekharpur, Bhubaneswar", beds:2, baths:2, sqft:1000, parking:1, furnished:"Unfurnished", status:"Ready to Move", possession:"Immediate", images:["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"], agent:{name:"Ananya Mishra",avatar:"https://i.pravatar.cc/32?img=23",rating:4.7}, postedDate:"3 days ago", has3D:false, hasVideo:false, amenities:["Gym","Security","Lift"] },
  { id:4, premium:true, badge:"new", title:"Emerald Court Penthouse", type:"Penthouse", price:15000000, priceLabel:"₹1.5 Cr", pricePerSqft:8333, location:"Saheed Nagar, Bhubaneswar", beds:3, baths:3, sqft:1800, parking:2, furnished:"Fully", status:"Ready to Move", possession:"Immediate", images:["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600"], agent:{name:"Arjun Nanda",avatar:"https://i.pravatar.cc/32?img=33",rating:5.0}, postedDate:"Today", has3D:true, hasVideo:true, amenities:["Private Terrace","Pool","Smart Home"] },
  { id:5, premium:false, badge:"verified", title:"Green Valley Apartments", type:"Apartment", price:3600000, priceLabel:"₹36 Lakh", pricePerSqft:3600, location:"Khandagiri, Bhubaneswar", beds:2, baths:1, sqft:1000, parking:1, furnished:"Semi", status:"Ready to Move", possession:"Immediate", images:["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600"], agent:{name:"Sunita Das",avatar:"https://i.pravatar.cc/32?img=56",rating:4.6}, postedDate:"5 days ago", has3D:false, hasVideo:false, amenities:["Security","Garden"] },
  { id:6, premium:true, badge:"hot", title:"Silicon Heights Smart Homes", type:"Apartment", price:6800000, priceLabel:"₹68 Lakh", pricePerSqft:5666, location:"Infocity, Bhubaneswar", beds:3, baths:2, sqft:1200, parking:1, furnished:"Fully", status:"Under Construction", possession:"Mar 2026", images:["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600"], agent:{name:"Vikram Singh",avatar:"https://i.pravatar.cc/32?img=67",rating:4.8}, postedDate:"1 day ago", has3D:true, hasVideo:true, amenities:["Smart Home","Fibre","Co-working"] },
];

const LOCALITIES = ["All Locations","Patia","Nayapalli","Saheed Nagar","Chandrasekharpur","Khandagiri","Infocity","Unit 1","Bhubaneswar Central"];
const TYPES      = ["All Types","Apartment","Villa","Penthouse","Plot","Commercial"];
const BHK        = ["Any","1","2","3","4+"];
const SORT_OPTS  = [
  { value:"relevance",   label:"Relevance" },
  { value:"price_asc",   label:"Price: Low → High" },
  { value:"price_desc",  label:"Price: High → Low" },
  { value:"newest",      label:"Newest First" },
  { value:"sqft_desc",   label:"Largest Area" },
];

/* ── MAP PINS MOCK ── */
const MAP_PINS = [
  { id:1, x:"32%", y:"28%", price:"₹85L",  active:false },
  { id:2, x:"58%", y:"55%", price:"₹2.5Cr",active:false },
  { id:3, x:"48%", y:"38%", price:"₹42L",  active:false },
  { id:4, x:"62%", y:"30%", price:"₹1.5Cr",active:false },
  { id:5, x:"25%", y:"60%", price:"₹36L",  active:false },
  { id:6, x:"70%", y:"42%", price:"₹68L",  active:false },
];

export default function SearchListingsPage({ onSelectProperty, savedIds=[], onToggleSave }) {
  /* ── FILTER STATE ── */
  const [locality,    setLocality]    = useState("All Locations");
  const [type,        setType]        = useState("All Types");
  const [bhk,         setBhk]         = useState("Any");
  const [minPrice,    setMinPrice]    = useState(0);
  const [maxPrice,    setMaxPrice]    = useState(30000000);
  const [minSqft,     setMinSqft]     = useState(0);
  const [furnished,   setFurnished]   = useState([]);
  const [status,      setStatus]      = useState([]);
  const [amenities,   setAmenities]   = useState([]);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [has3D,       setHas3D]       = useState(false);
  const [sortBy,      setSortBy]      = useState("relevance");
  const [viewMode,    setViewMode]    = useState("grid"); // grid | list | map
  const [activePin,   setActivePin]   = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [searchQ,     setSearchQ]     = useState("");

  /* ── TOGGLE HELPERS ── */
  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(v=>v!==val) : [...arr, val]);

  /* ── FILTERED + SORTED DATA ── */
  const results = useMemo(() => {
    let list = MOCK_PROPERTIES.filter(p => {
      if (searchQ && !p.title.toLowerCase().includes(searchQ.toLowerCase()) && !p.location.toLowerCase().includes(searchQ.toLowerCase())) return false;
      if (locality !== "All Locations" && !p.location.includes(locality)) return false;
      if (type !== "All Types" && p.type !== type) return false;
      if (bhk !== "Any") {
        const n = parseInt(bhk);
        if (bhk === "4+" ? p.beds < 4 : p.beds !== n) return false;
      }
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (p.sqft < minSqft) return false;
      if (furnished.length && !furnished.includes(p.furnished)) return false;
      if (status.length && !status.includes(p.status)) return false;
      if (premiumOnly && !p.premium) return false;
      if (has3D && !p.has3D) return false;
      return true;
    });
    if (sortBy === "price_asc")  list = list.sort((a,b) => a.price - b.price);
    if (sortBy === "price_desc") list = list.sort((a,b) => b.price - a.price);
    if (sortBy === "newest")     list = list.sort((a,b) => b.id - a.id);
    if (sortBy === "sqft_desc")  list = list.sort((a,b) => b.sqft - a.sqft);
    return list;
  }, [locality,type,bhk,minPrice,maxPrice,minSqft,furnished,status,premiumOnly,has3D,sortBy,searchQ]);

  const resetFilters = () => {
    setLocality("All Locations"); setType("All Types"); setBhk("Any");
    setMinPrice(0); setMaxPrice(30000000); setMinSqft(0);
    setFurnished([]); setStatus([]); setAmenities([]);
    setPremiumOnly(false); setHas3D(false); setSearchQ("");
  };

  const priceStr = (v) => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : `₹${(v/100000).toFixed(0)}L`;

  return (
    <div style={{ paddingTop:68, minHeight:"100vh", background:"var(--cream)" }}>
      {/* ── TOP SEARCH BAR ── */}
      <div style={{ background:"white", borderBottom:"1px solid var(--border)", padding:"14px 0", position:"sticky", top:68, zIndex:500 }}>
        <div className="container" style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          {/* Search Input */}
          <div style={{ flex:1, minWidth:220, display:"flex", alignItems:"center", gap:10, background:"var(--cream)", border:"1.5px solid var(--border)", borderRadius:8, padding:"0 14px", height:42 }}>
            <span style={{ color:"var(--muted)" }}>🔍</span>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search by name, locality..." style={{ border:"none", background:"transparent", outline:"none", fontSize:14, color:"var(--slate)", width:"100%", fontFamily:"var(--font-body)" }} />
            {searchQ && <button onClick={()=>setSearchQ("")} style={{ background:"none", border:"none", color:"var(--muted)", cursor:"pointer", fontSize:16 }}>×</button>}
          </div>

          {/* Quick type chips */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {TYPES.slice(1).map(t => (
              <button key={t} onClick={()=>setType(type===t?"All Types":t)}
                style={{ padding:"6px 14px", borderRadius:20, border:`1.5px solid ${type===t?"var(--slate)":"var(--border)"}`, background:type===t?"var(--slate)":"white", color:type===t?"white":"var(--muted)", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"var(--font-body)", transition:"all .2s" }}>
                {t}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display:"flex", gap:4, background:"var(--cream)", padding:4, borderRadius:8, border:"1px solid var(--border)" }}>
            {[["grid","⊞","Grid"],["list","☰","List"],["map","🗺","Map"]].map(([v,icon,label]) => (
              <button key={v} onClick={()=>setViewMode(v)}
                style={{ padding:"6px 12px", borderRadius:6, border:"none", background:viewMode===v?"var(--slate)":"transparent", color:viewMode===v?"white":"var(--muted)", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"var(--font-body)", display:"flex", alignItems:"center", gap:4, transition:"all .2s" }}>
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            style={{ height:40, padding:"0 12px", border:"1.5px solid var(--border)", borderRadius:8, background:"white", fontSize:13, color:"var(--slate)", fontFamily:"var(--font-body)", outline:"none", cursor:"pointer" }}>
            {SORT_OPTS.map(o => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="container" style={{ padding:"24px 24px", display:"flex", gap:24, alignItems:"flex-start" }}>

        {/* ── SIDEBAR FILTERS ── */}
        {viewMode !== "map" && (
          <aside style={{ width:filtersOpen?260:52, flexShrink:0, transition:"width .3s ease" }}>
            <div style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden", position:"sticky", top:136 }}>
              {/* Sidebar header */}
              <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                {filtersOpen && <span style={{ fontWeight:700, fontSize:14, color:"var(--slate)" }}>Filters</span>}
                <button onClick={()=>setFiltersOpen(!filtersOpen)}
                  style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", fontSize:18, marginLeft:"auto" }}>
                  {filtersOpen ? "◀" : "▶"}
                </button>
              </div>

              {filtersOpen && (
                <div style={{ padding:"0 0 16px", maxHeight:"calc(100vh - 200px)", overflowY:"auto" }}>

                  {/* Active filter count */}
                  {[locality,type,bhk].filter(v=>!v.includes("All")&&v!=="Any").length > 0 && (
                    <div style={{ margin:"12px 20px 0", padding:"8px 12px", background:"var(--gold-lt)", borderRadius:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:12, color:"var(--gold)", fontWeight:600 }}>Filters active</span>
                      <button onClick={resetFilters} style={{ fontSize:11, color:"var(--gold)", background:"none", border:"none", cursor:"pointer", fontWeight:600, fontFamily:"var(--font-body)" }}>Clear all</button>
                    </div>
                  )}

                  {/* Locality */}
                  <FilterSection title="Location">
                    <select value={locality} onChange={e=>setLocality(e.target.value)} className="select" style={{ fontSize:13 }}>
                      {LOCALITIES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </FilterSection>

                  {/* BHK */}
                  <FilterSection title="BHK Type">
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {BHK.map(b => (
                        <button key={b} onClick={()=>setBhk(b)}
                          style={{ padding:"5px 14px", borderRadius:20, border:`1.5px solid ${bhk===b?"var(--slate)":"var(--border)"}`, background:bhk===b?"var(--slate)":"white", color:bhk===b?"white":"var(--muted)", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"var(--font-body)" }}>
                          {b === "Any" ? "Any" : `${b} BHK`}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  {/* Price Range */}
                  <FilterSection title="Price Range">
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--muted)", marginBottom:8 }}>
                      <span>{priceStr(minPrice)}</span>
                      <span>{priceStr(maxPrice)}</span>
                    </div>
                    <input type="range" min={0} max={30000000} step={500000} value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)}
                      style={{ width:"100%", accentColor:"var(--gold)", cursor:"pointer" }} />
                    <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>Up to {priceStr(maxPrice)}</div>
                  </FilterSection>

                  {/* Min Area */}
                  <FilterSection title="Min Area (sqft)">
                    <input type="number" placeholder="e.g. 800" value={minSqft||""} onChange={e=>setMinSqft(+e.target.value)}
                      className="input" style={{ fontSize:13, height:38 }} />
                  </FilterSection>

                  {/* Furnished */}
                  <FilterSection title="Furnishing">
                    {["Fully","Semi","Unfurnished"].map(f => (
                      <CheckChip key={f} label={f} checked={furnished.includes(f)} onChange={()=>toggleArr(furnished,setFurnished,f)} />
                    ))}
                  </FilterSection>

                  {/* Status */}
                  <FilterSection title="Status">
                    {["Ready to Move","Under Construction"].map(s => (
                      <CheckChip key={s} label={s} checked={status.includes(s)} onChange={()=>toggleArr(status,setStatus,s)} />
                    ))}
                  </FilterSection>

                  {/* Toggles */}
                  <FilterSection title="Special">
                    <ToggleRow label="✦ Premium Only"  checked={premiumOnly} onChange={()=>setPremiumOnly(!premiumOnly)} />
                    <ToggleRow label="⟳ Has 3D Tour"   checked={has3D}       onChange={()=>setHas3D(!has3D)} />
                  </FilterSection>

                  <div style={{ padding:"0 20px" }}>
                    <button className="btn btn-gold btn-full" style={{ marginTop:4 }}>Apply Filters</button>
                    <button onClick={resetFilters} className="btn btn-ghost btn-full" style={{ marginTop:8, fontSize:12 }}>Reset All</button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex:1, minWidth:0 }}>

          {/* Result count */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <span style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, color:"var(--slate)" }}>
                {results.length} Properties
              </span>
              <span style={{ fontSize:13, color:"var(--muted)", marginLeft:8 }}>
                {locality !== "All Locations" ? `in ${locality}` : "in Bhubaneswar"}
              </span>
            </div>
            {results.length > 0 && (
              <span style={{ fontSize:12, color:"var(--muted)" }}>
                Showing {results.length} of {MOCK_PROPERTIES.length}
              </span>
            )}
          </div>

          {/* ── MAP VIEW ── */}
          {viewMode === "map" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20, height:"75vh" }}>
              <MapWithPins pins={MAP_PINS} activePin={activePin} setActivePin={setActivePin}
                properties={results} onSelectProperty={onSelectProperty} />
              <div style={{ overflowY:"auto", display:"flex", flexDirection:"column", gap:12 }}>
                {results.map(p => (
                  <MiniPropCard key={p.id} property={p} active={activePin===p.id}
                    onHover={()=>setActivePin(p.id)} onLeave={()=>setActivePin(null)}
                    onClick={()=>onSelectProperty?.(p)} saved={savedIds.includes(p.id)}
                    onToggleSave={()=>onToggleSave?.(p.id)} />
                ))}
              </div>
            </div>
          )}

          {/* ── GRID VIEW ── */}
          {viewMode === "grid" && (
            results.length === 0
              ? <EmptyState onReset={resetFilters} />
              : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
                  {results.map(p => (
                    <PropCardFull key={p.id} property={p} onClick={()=>onSelectProperty?.(p)}
                      saved={savedIds.includes(p.id)} onToggleSave={()=>onToggleSave?.(p.id)} />
                  ))}
                </div>
          )}

          {/* ── LIST VIEW ── */}
          {viewMode === "list" && (
            results.length === 0
              ? <EmptyState onReset={resetFilters} />
              : <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {results.map(p => (
                    <PropCardList key={p.id} property={p} onClick={()=>onSelectProperty?.(p)}
                      saved={savedIds.includes(p.id)} onToggleSave={()=>onToggleSave?.(p.id)} />
                  ))}
                </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── SUB-COMPONENTS ──────────────────────────── */

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom:"1px solid var(--border)", padding:"14px 20px" }}>
      <button onClick={()=>setOpen(!open)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", padding:0 }}>
        <span style={{ fontSize:12, fontWeight:700, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em" }}>{title}</span>
        <span style={{ fontSize:12, color:"var(--muted)", transition:"transform .2s", transform:open?"rotate(180deg)":"" }}>▾</span>
      </button>
      {open && <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>{children}</div>}
    </div>
  );
}

function CheckChip({ label, checked, onChange }) {
  return (
    <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:13, color:"var(--slate)" }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor:"var(--gold)", width:14, height:14 }} />
      {label}
    </label>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:13, color:"var(--slate)" }}>{label}</span>
      <div onClick={onChange} style={{ width:40, height:22, borderRadius:11, background:checked?"var(--gold)":"var(--border)", cursor:"pointer", position:"relative", transition:"background .2s" }}>
        <div style={{ position:"absolute", top:3, left:checked?20:3, width:16, height:16, borderRadius:"50%", background:"white", transition:"left .2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
      </div>
    </div>
  );
}

function MapWithPins({ pins, activePin, setActivePin, properties, onSelectProperty }) {
  return (
    <div style={{ background:"#dce8f0", borderRadius:16, border:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>
      {/* Grid lines */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(80,120,160,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(80,120,160,.15) 1px,transparent 1px)", backgroundSize:"50px 50px" }} />
      {/* Roads */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.3 }} viewBox="0 0 800 600">
        <line x1="0" y1="300" x2="800" y2="300" stroke="#5a7a9a" strokeWidth="10"/>
        <line x1="400" y1="0" x2="400" y2="600" stroke="#5a7a9a" strokeWidth="10"/>
        <line x1="0" y1="150" x2="800" y2="150" stroke="#5a7a9a" strokeWidth="4"/>
        <line x1="0" y1="450" x2="800" y2="450" stroke="#5a7a9a" strokeWidth="4"/>
        <line x1="200" y1="0" x2="200" y2="600" stroke="#5a7a9a" strokeWidth="4"/>
        <line x1="600" y1="0" x2="600" y2="600" stroke="#5a7a9a" strokeWidth="4"/>
        <ellipse cx="400" cy="300" rx="120" ry="80" fill="none" stroke="#5a7a9a" strokeWidth="3"/>
        <text x="390" y="305" fill="#3a5a7a" fontSize="12" opacity=".5">Bhubaneswar</text>
      </svg>

      {/* Property Pins */}
      {pins.map((pin, i) => {
        const prop = properties[i];
        if (!prop) return null;
        const isActive = activePin === prop.id;
        return (
          <div key={pin.id} style={{ position:"absolute", left:pin.x, top:pin.y, transform:"translate(-50%,-100%)", zIndex:isActive?20:10, cursor:"pointer" }}
            onMouseEnter={()=>setActivePin(prop.id)} onMouseLeave={()=>setActivePin(null)}
            onClick={()=>onSelectProperty?.(prop)}>
            <div style={{ background:isActive?"var(--slate)":"white", color:isActive?"white":"var(--slate)", padding:"5px 10px", borderRadius:20, fontSize:12, fontWeight:700, boxShadow:"0 4px 16px rgba(0,0,0,.2)", border:`2px solid ${isActive?"var(--slate)":"var(--gold)"}`, whiteSpace:"nowrap", transition:"all .2s", transform:isActive?"scale(1.1)":"scale(1)" }}>
              {prop.priceLabel}
            </div>
            <div style={{ width:0, height:0, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderTop:`8px solid ${isActive?"var(--slate)":"var(--gold)"}`, margin:"0 auto", transition:"all .2s" }} />
          </div>
        );
      })}

      {/* Map label */}
      <div style={{ position:"absolute", bottom:12, right:12, background:"rgba(255,255,255,.85)", padding:"4px 10px", borderRadius:6, fontSize:11, color:"var(--muted)" }}>
        📍 Interactive map — Google Maps ready
      </div>
    </div>
  );
}

function MiniPropCard({ property: p, active, onHover, onLeave, onClick, saved, onToggleSave }) {
  return (
    <div onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}
      style={{ background:"white", borderRadius:12, border:`1.5px solid ${active?"var(--gold)":"var(--border)"}`, overflow:"hidden", cursor:"pointer", transition:"all .2s", boxShadow:active?"var(--shadow-md)":"none" }}>
      <div style={{ position:"relative", height:120 }}>
        <img src={p.images[0]} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        {p.premium && <div className="badge badge-premium" style={{ position:"absolute", top:8, left:8, fontSize:10 }}>✦ Premium</div>}
        <button onClick={e=>{e.stopPropagation();onToggleSave();}}
          style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,.9)", border:"none", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:saved?"#dc2626":"var(--muted)" }}>
          {saved?"♥":"♡"}
        </button>
      </div>
      <div style={{ padding:"10px 12px" }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:700, color:"var(--slate)" }}>{p.priceLabel}</div>
        <div style={{ fontSize:12, color:"var(--slate)", fontWeight:500, marginTop:2 }}>{p.title}</div>
        <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>📍 {p.location}</div>
        <div style={{ display:"flex", gap:10, marginTop:6, fontSize:11, color:"var(--muted)" }}>
          <span>🛏 {p.beds} BHK</span><span>📐 {p.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </div>
  );
}

function PropCardFull({ property: p, onClick, saved, onToggleSave }) {
  return (
    <div onClick={onClick} style={{ background:"white", borderRadius:20, border:"1px solid var(--border)", overflow:"hidden", cursor:"pointer", transition:"all .22s" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow-lg)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
      <div style={{ position:"relative", aspectRatio:"4/3", overflow:"hidden" }}>
        <img src={p.images[0]} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .6s" }} />
        <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6, flexWrap:"wrap" }}>
          {p.premium && <span className="badge badge-premium">✦ Premium</span>}
          {p.badge==="new" && <span className="badge badge-new">● New</span>}
          {p.badge==="hot" && <span className="badge badge-hot">🔥 Hot</span>}
          {p.badge==="verified" && <span className="badge badge-verified">✓ Verified</span>}
        </div>
        <div style={{ position:"absolute", top:12, right:12, display:"flex", gap:6 }}>
          {p.has3D && <span style={{ background:"rgba(255,255,255,.92)", padding:"3px 8px", borderRadius:20, fontSize:10, fontWeight:700, color:"#059669" }}>3D</span>}
          <button onClick={e=>{e.stopPropagation();onToggleSave();}}
            style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,.92)", border:"none", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:saved?"#dc2626":"var(--muted)" }}>
            {saved?"♥":"♡"}
          </button>
        </div>
      </div>
      <div style={{ padding:"18px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color:"var(--slate)" }}>{p.priceLabel}</div>
          <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>₹{p.pricePerSqft.toLocaleString()}/sqft</div>
        </div>
        <div style={{ fontSize:14, fontWeight:600, color:"var(--slate)", margin:"5px 0 3px", lineHeight:1.4 }}>{p.title}</div>
        <div style={{ fontSize:12, color:"var(--muted)", display:"flex", alignItems:"center", gap:4 }}>📍 {p.location}</div>
        <div style={{ display:"flex", gap:14, marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)" }}>
          {[[`🛏 ${p.beds} BHK`],[`🚿 ${p.baths}`],[`📐 ${p.sqft.toLocaleString()}`],[`🚗 ${p.parking}`]].map(([s],i) => (
            <span key={i} style={{ fontSize:12, color:"var(--muted)" }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ padding:"10px 20px 12px", background:"var(--cream)", borderTop:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <img src={p.agent.avatar} style={{ width:24, height:24, borderRadius:"50%" }} alt={p.agent.name} />
          <span style={{ fontSize:12, color:"var(--muted)" }}>{p.agent.name}</span>
        </div>
        <span style={{ fontSize:11, color:"var(--muted)" }}>{p.postedDate}</span>
      </div>
    </div>
  );
}

function PropCardList({ property: p, onClick, saved, onToggleSave }) {
  return (
    <div onClick={onClick} style={{ background:"white", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden", display:"flex", cursor:"pointer", transition:"all .22s" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--shadow-md)";e.currentTarget.style.borderColor="var(--border2)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="var(--border)";}}>
      <div style={{ width:240, flexShrink:0, position:"relative" }}>
        <img src={p.images[0]} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        {p.premium && <div className="badge badge-premium" style={{ position:"absolute", top:10, left:10, fontSize:10 }}>✦ Premium</div>}
      </div>
      <div style={{ flex:1, padding:"20px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, color:"var(--slate)" }}>{p.priceLabel}</div>
            <div style={{ display:"flex", gap:8 }}>
              {p.has3D && <span className="badge badge-new" style={{ fontSize:10 }}>3D Tour</span>}
              {p.badge==="hot" && <span className="badge badge-hot" style={{ fontSize:10 }}>🔥 Hot</span>}
            </div>
          </div>
          <div style={{ fontSize:15, fontWeight:600, color:"var(--slate)", margin:"6px 0 3px" }}>{p.title}</div>
          <div style={{ fontSize:13, color:"var(--muted)" }}>📍 {p.location}</div>
          <div style={{ display:"flex", gap:20, marginTop:10 }}>
            {[["🛏",`${p.beds} BHK`],["📐",`${p.sqft.toLocaleString()} sqft`],["🏢",p.floors||p.type],["🚗",`${p.parking} Car`]].map(([icon,val])=>(
              <span key={val} style={{ fontSize:12, color:"var(--muted)", display:"flex", gap:4 }}>{icon} <strong style={{ color:"var(--slate)" }}>{val}</strong></span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <span style={{ padding:"3px 10px", borderRadius:20, background:"var(--cream)", border:"1px solid var(--border)", fontSize:11, color:"var(--muted)" }}>{p.status}</span>
          <span style={{ padding:"3px 10px", borderRadius:20, background:"var(--cream)", border:"1px solid var(--border)", fontSize:11, color:"var(--muted)" }}>{p.furnished}</span>
        </div>
      </div>
      <div style={{ padding:"20px 16px", borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column", justifyContent:"center", gap:8, minWidth:140 }}>
        <button className="btn btn-gold btn-sm" onClick={e=>{e.stopPropagation();onClick();}}>View Details</button>
        <button onClick={e=>{e.stopPropagation();onToggleSave();}}
          className="btn btn-outline btn-sm" style={{ color:saved?"#dc2626":"var(--slate)" }}>
          {saved?"♥ Saved":"♡ Save"}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div style={{ textAlign:"center", padding:"80px 0" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🔍</div>
      <div style={{ fontFamily:"var(--font-display)", fontSize:26, color:"var(--slate)", marginBottom:8 }}>No Properties Found</div>
      <div style={{ fontSize:14, color:"var(--muted)", marginBottom:24 }}>Try adjusting or clearing your filters</div>
      <button className="btn btn-gold" onClick={onReset}>Clear All Filters</button>
    </div>
  );
}
