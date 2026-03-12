import React, { useState } from 'react';

const MOCK_AGENT = {
  id: 'agent_001',
  name: 'Priya Sharma',
  role: 'Senior Property Consultant',
  avatar: 'https://i.pravatar.cc/160?img=47',
  coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
  bio: 'With over 9 years of experience in Bhubaneswar\'s premium real estate market, I specialise in luxury apartments, villas, and high-value investment properties.',
  email: 'priya.sharma@estatevision.com',
  phone: '+91 98765 43210',
  location: 'Patia, Bhubaneswar',
  verified: true,
  rating: 4.9,
  reviewCount: 127,
  dealsClosed: 214,
  totalValue: '₹42 Cr+',
  responseTime: '< 1 hour',
  yearsExp: 9,
  badges: ['Top Agent 2024', '100+ Deals', 'Luxury Specialist', 'RERA Certified'],
  listings: [
    { id: 1, title: 'Prestige Lakeview Residences', priceLabel: '₹85 Lakh', type: 'Apartment', beds: 3, sqft: 1600, status: 'Available', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', badge: 'new' },
    { id: 2, title: 'Royal Villas', priceLabel: '₹2.5 Cr', type: 'Villa', beds: 4, sqft: 3500, status: 'Available', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400', badge: 'hot' },
  ],
  reviews: [
    { id: 1, name: 'Rajesh Kumar', rating: 5, date: 'Feb 2025', review: 'Priya helped us find our dream home in Patia within 3 weeks. Extremely professional!' },
    { id: 2, name: 'Meena Nayak', rating: 5, date: 'Jan 2025', review: 'Best real estate agent in Bhubaneswar! She understood exactly what we wanted.' },
  ],
};

export default function AgentProfilePage() {
  const [activeTab, setActiveTab] = useState('listings');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const agent = MOCK_AGENT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent to ' + agent.name);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const avgRating = agent.reviews.reduce((sum, r) => sum + r.rating, 0) / agent.reviews.length;

  return (
    <div style={{ paddingTop: 68, background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Cover Image */}
      <div style={{ height: 220, overflow: 'hidden' }}>
        <img src={agent.coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Agent Card */}
      <div className="container" style={{ padding: '24px 24px', marginTop: -60, position: 'relative', zIndex: 10 }}>
        <div className="panel" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={agent.avatar} alt={agent.name} className="avatar avatar-lg" style={{ borderColor: 'var(--gold)' }} />
            {agent.verified && <div className="verified-badge">✓</div>}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--slate)', marginBottom: 4 }}>{agent.name}</h1>
            <div style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 600, marginBottom: 6 }}>{agent.role}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>📍 {agent.location}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {agent.badges.map((b) => (
                <span key={b} className="badge">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="rating-badge">
            <div className="rating-value">{agent.rating}</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-count">{agent.reviewCount} reviews</div>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginTop: 12 }}>
            <div className="stat-card">
              <div className="stat-value">{agent.dealsClosed}</div>
              <div className="stat-label">Deals Closed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{agent.totalValue}</div>
              <div className="stat-label">Total Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{agent.yearsExp}+ yrs</div>
              <div className="stat-label">Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container" style={{ padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>
        <div>
          <div className="tabs-container">
            <button className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => setActiveTab('listings')}>
              Listings
              <span className="tab-badge">{agent.listings.length}</span>
            </button>
            <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Reviews
              <span className="tab-badge">{agent.reviews.length}</span>
            </button>
            <button className={`tab-button ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
              About
            </button>
          </div>

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="slide-up">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                {agent.listings.map((p) => (
                  <div key={p.id} className="property-card">
                    <div className="property-card-image">
                      <img src={p.image} alt={p.title} />
                      {p.badge && <span className={`badge badge-${p.badge}`} style={{ position: 'absolute', top: 10, left: 10 }}>
                        {p.badge === 'new' && '● New'}
                        {p.badge === 'hot' && '🔥 Hot'}
                      </span>}
                    </div>
                    <div className="property-card-body">
                      <div className="property-card-price">{p.priceLabel}</div>
                      <div className="property-card-title">{p.title}</div>
                      <div className="property-card-meta">
                        <span>{p.type}</span>
                        <span>·</span>
                        <span>{p.beds} BHK</span>
                        <span>·</span>
                        <span>{p.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="slide-up">
              <div className="panel" style={{ marginBottom: 24, textAlign: 'center' }}>
                <div className="rating-value" style={{ fontSize: 56 }}>{avgRating.toFixed(1)}</div>
                <div className="rating-stars" style={{ fontSize: 24 }}>{'★'.repeat(5)}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Based on {agent.reviews.length} reviews</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {agent.reviews.map((r) => (
                  <div key={r.id} className="panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--slate)' }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{r.date}</div>
                      </div>
                      <div style={{ color: 'var(--gold)', fontSize: 14 }}>{'★'.repeat(r.rating)}</div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.6 }}>"{r.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="slide-up">
              <div className="panel" style={{ marginBottom: 24 }}>
                <h2 className="panel-title">About {agent.name}</h2>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.8, marginTop: 12 }}>{agent.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Sidebar */}
        <div>
          <div className="panel" style={{ position: 'sticky', top: 88 }}>
            <div className="panel-header" style={{ background: 'var(--slate)', color: 'white', padding: 20, margin: -24, marginBottom: 24, borderBottom: 'none' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{agent.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{agent.role}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              <a href={`tel:${agent.phone}`} className="btn btn-gold" style={{ textDecoration: 'none', justifyContent: 'center', fontSize: 12 }}>
                📞 Call
              </a>
              <a href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn" style={{ background: '#22c55e', color: 'white', textDecoration: 'none', justifyContent: 'center', fontSize: 12 }}>
                💬 Chat
              </a>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 8 }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 8 }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 8 }}
                />
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 8 }}
                />
              </div>
              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
