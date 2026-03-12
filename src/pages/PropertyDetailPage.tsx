import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_PROPERTY = {
  id: 1,
  title: 'Prestige Lakeview Residences',
  type: 'Apartment',
  priceLabel: '₹85 Lakh',
  price: 8500000,
  location: 'Patia, Bhubaneswar, Odisha',
  status: 'Ready to Move',
  bedrooms: 3,
  bathrooms: 2,
  area: 1600,
  floor: '12th',
  totalFloors: 18,
  parking: 1,
  furnished: 'Semi-Furnished',
  facing: 'East',
  description: 'Discover unparalleled luxury living at Prestige Lakeview Residences. These stunning east-facing 3BHK apartments offer sweeping views, premium marble flooring, modular kitchen with branded appliances.',
  highlights: ['Lake-facing units', 'Italian marble floors', 'Modular kitchen', 'EV charging ready', 'RERA certified'],
  amenities: [
    { category: 'Fitness', items: ['Swimming Pool', 'Gymnasium', 'Jogging Track'] },
    { category: 'Social', items: ['Club House', 'Party Hall', 'Library'] },
    { category: 'Security', items: ['24/7 CCTV', 'Security Cabin', 'Intercom'] },
  ],
  images: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
  ],
  agent: {
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 4.9,
    deals: 214,
  },
};

export default function PropertyDetailPage() {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);
  const property = MOCK_PROPERTY;

  return (
    <div style={{ paddingTop: 68, background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
              Home
            </button>
            <span style={{ margin: '0 8px', color: 'var(--muted)' }}>›</span>
            <button onClick={() => navigate('/search')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
              Properties
            </button>
            <span style={{ margin: '0 8px', color: 'var(--muted)' }}>›</span>
            <span style={{ color: 'var(--slate)', fontWeight: 600 }}>{property.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
              ⤴ Share
            </button>
            <button className={`btn btn-sm`} onClick={() => setSaved(!saved)} style={saved ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' } : {}}>
              {saved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '28px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, alignItems: 'start' }}>
        {/* Main Content */}
        <div>
          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="badge badge-new">New</span>
              <span className="badge badge-rera">RERA ✓</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 700, color: 'var(--slate)', marginBottom: 8 }}>{property.title}</h1>
            <div style={{ fontSize: 14, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <span>📍 {property.location}</span>
            </div>
          </div>

          {/* Gallery */}
          <div className="gallery-container">
            <div className="gallery-main">
              <img src={property.images[activeImg]} alt={property.title} />
              <button onClick={() => setActiveImg((i) => (i - 1 + property.images.length) % property.images.length)} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.9)', border: 'none', fontSize: 20, cursor: 'pointer' }}>
                ‹
              </button>
              <button onClick={() => setActiveImg((i) => (i + 1) % property.images.length)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.9)', border: 'none', fontSize: 20, cursor: 'pointer' }}>
                ›
              </button>
              <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(0,0,0,.6)', color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>
                {activeImg + 1} / {property.images.length}
              </div>
            </div>
            <div className="gallery-thumbnails">
              {property.images.map((img, i) => (
                <div key={i} className={`gallery-thumbnail ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, marginTop: 20, marginBottom: 20 }}>
            {[
              ['🛏', `${property.bedrooms} BHK`, 'Bedrooms'],
              ['🚿', property.bathrooms, 'Bathrooms'],
              ['📐', `${property.area.toLocaleString()} sqft`, 'Area'],
              ['🏢', `${property.floor} / ${property.totalFloors}`, 'Floor'],
              ['🚗', `${property.parking} Car`, 'Parking'],
            ].map(([icon, val, label], i, arr) => (
              <div key={label} style={{ textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 0 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--slate)' }}>{val}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {property.highlights.map((h) => (
              <span key={h} className="badge badge-gold">
                ✓ {h}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            {['overview', 'amenities', 'location'].map((tab) => (
              <button key={tab} className={`tab-button ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'overview' && 'Overview'}
                {tab === 'amenities' && 'Amenities'}
                {tab === 'location' && 'Location'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="slide-up">
              <h2 className="panel-title">About this Property</h2>
              <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.8, marginTop: 12 }}>{property.description}</p>

              <div className="panel" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {[
                  ['Property Type', property.type],
                  ['Status', property.status],
                  ['Furnished', property.furnished],
                  ['Facing', property.facing],
                ].map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid var(--border)', borderRight: i % 2 === 0 ? '1px solid var(--border)' : 0 }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="slide-up">
              <h2 className="panel-title">Amenities & Facilities</h2>
              {property.amenities.map((cat) => (
                <div key={cat.category} style={{ marginTop: 24 }}>
                  <div className="panel-subtitle" style={{ marginBottom: 12 }}>{cat.category}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10 }}>
                    {cat.items.map((item) => (
                      <div key={item} className="panel" style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span>
                        <span style={{ fontSize: 13, color: 'var(--slate)', fontWeight: 500 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'location' && (
            <div className="slide-up">
              <h2 className="panel-title">Location & Connectivity</h2>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>📍 {property.location}</div>
              <div className="panel" style={{ marginTop: 20, padding: '40px 24px', textAlign: 'center', background: 'var(--cream)', border: '2px dashed var(--border)', color: 'var(--muted)' }}>
                🗺 Map Integration Coming Soon
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="panel" style={{ position: 'sticky', top: 88 }}>
            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--slate)' }}>{property.priceLabel}</div>
            </div>

            {/* Quick Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 20 }}>
              <button className="btn btn-gold" style={{ justifyContent: 'center' }}>
                📞 Call Agent
              </button>
              <button className="btn" style={{ background: '#22c55e', color: 'white', justifyContent: 'center' }}>
                💬 WhatsApp
              </button>
              <button className="btn btn-outline" style={{ justifyContent: 'center' }}>
                📅 Schedule Visit
              </button>
            </div>

            {/* Agent */}
            <div className="panel" style={{ background: 'var(--cream)', border: 'none' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src={property.agent.avatar} alt={property.agent.name} className="avatar avatar-sm" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--slate)' }}>{property.agent.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>★ {property.agent.rating} ({property.agent.deals} deals)</div>
                </div>
              </div>
              <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
