/**
 * AgentDashboardPage — for users with role: 'agent'
 * Tabs: Overview | My Listings | Post Property | My Leads | Profile
 * Data is mock — will connect to real Lambda API in Week 3-4 sprint
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/* ─── Mock data (replace with API calls in Week 3-4) ──────── */
const MOCK_LISTINGS = [
  { id: 'L001', title: 'Sunrise Heights 2BHK', locality: 'Patia', price: '₹62 Lakh', type: 'Sale', status: 'active',  views: 142, leads: 4,  posted: '2026-03-10' },
  { id: 'L002', title: 'Green Valley 3BHK',    locality: 'Nayapalli', price: '₹95 Lakh', type: 'Sale', status: 'active',  views: 87,  leads: 2,  posted: '2026-03-15' },
  { id: 'L003', title: 'Metro Studio Flat',    locality: 'Saheed Nagar', price: '₹18K/mo', type: 'Rent', status: 'inactive', views: 31,  leads: 0,  posted: '2026-03-01' },
];

const MOCK_LEADS = [
  { id: 'LD001', buyerName: 'Rohit Panda',   phone: '+91 98765 11111', budget: '₹60-70L', listing: 'Sunrise Heights 2BHK', status: 'hot',  time: '2 hrs ago'  },
  { id: 'LD002', buyerName: 'Sneha Das',     phone: '+91 87654 22222', budget: '₹90-1Cr', listing: 'Green Valley 3BHK',    status: 'warm', time: '1 day ago'  },
  { id: 'LD003', buyerName: 'Amit Mohanty',  phone: '+91 76543 33333', budget: '₹15-20K', listing: 'Metro Studio Flat',    status: 'cold', time: '3 days ago' },
  { id: 'LD004', buyerName: 'Priti Sahoo',   phone: '+91 65432 44444', budget: '₹55-65L', listing: 'Sunrise Heights 2BHK', status: 'hot',  time: '5 hrs ago'  },
];

const AMENITIES = ['Parking', 'Lift', 'Power Backup', 'Security', 'Gym', 'Swimming Pool', 'Club House', 'Garden', 'Play Area', 'CCTV'];
const LOCALITIES = ['Patia', 'Nayapalli', 'Saheed Nagar', 'Bhubaneswar Old Town', 'Khandagiri', 'Chandrasekharpur', 'Mancheswar', 'Rasulgarh', 'Unit-4', 'VSS Nagar'];

const STATUS_COLOR: Record<string, string> = {
  hot:  '#ef4444', warm: '#f59e0b', cold: '#6b7280',
  active: '#22c55e', inactive: '#6b7280',
};

/* ─── Sub-components ──────────────────────────────────────── */

function OverviewTab({ listings, leads }: { listings: typeof MOCK_LISTINGS; leads: typeof MOCK_LEADS }) {
  const activeListings = listings.filter(l => l.status === 'active').length;
  const totalViews     = listings.reduce((s, l) => s + l.views, 0);
  const hotLeads       = leads.filter(l => l.status === 'hot').length;
  const totalLeads     = leads.length;

  return (
    <div>
      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '🏠', label: 'Active Listings', value: activeListings, sub: `${listings.length} total` },
          { icon: '👁', label: 'Total Views',      value: totalViews,    sub: 'last 30 days' },
          { icon: '🔥', label: 'Hot Leads',        value: hotLeads,      sub: `${totalLeads} total leads` },
          { icon: '📅', label: 'Visits Booked',    value: 2,             sub: 'this week' },
        ].map(s => (
          <div key={s.label} className="panel" style={{ textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--slate)' }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-header">
          <span className="panel-title">Recent Leads</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Buyer', 'Phone', 'Budget', 'Listing', 'Status', 'Time'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--muted)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, 4).map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px', fontWeight: 600, color: 'var(--slate)' }}>{l.buyerName}</td>
                <td style={{ padding: '10px', color: 'var(--muted)' }}>{l.phone}</td>
                <td style={{ padding: '10px', color: 'var(--slate)' }}>{l.budget}</td>
                <td style={{ padding: '10px', color: 'var(--muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.listing}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{l.status}</span>
                </td>
                <td style={{ padding: '10px', color: 'var(--muted)', fontSize: 11 }}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* My Listings quick view */}
      <div className="panel">
        <div className="panel-header"><span className="panel-title">My Listings</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {listings.map(l => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--slate)' }}>{l.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{l.locality} • {l.type} • Posted {l.posted}</div>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: 13 }}>{l.price}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>👁 {l.views} &nbsp;💬 {l.leads}</div>
              <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyListingsTab({ listings }: { listings: typeof MOCK_LISTINGS }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: 0 }}>My Listings ({listings.length})</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option>All Status</option><option>Active</option><option>Inactive</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option>All Types</option><option>Sale</option><option>Rent</option>
          </select>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
              {['Property', 'Locality', 'Price', 'Type', 'Views', 'Leads', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--muted)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listings.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--slate)' }}>{l.title}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{l.locality}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--gold)' }}>{l.price}</td>
                <td style={{ padding: '14px 16px', color: 'var(--slate)' }}>{l.type}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>👁 {l.views}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>💬 {l.leads}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{l.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-outline btn-sm">Edit</button>
                    <button className="btn btn-outline btn-sm" style={{ color: 'var(--error, #ef4444)', borderColor: 'var(--error, #ef4444)' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostPropertyTab() {
  const [form, setForm] = useState({
    title: '', type: 'sale', propertyType: 'apartment',
    price: '', area: '', bedrooms: '2', bathrooms: '2',
    floor: '', totalFloors: '', age: 'new',
    locality: '', description: '',
    amenities: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));
  const toggleAmenity = (a: string) =>
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const field = (label: string, node: React.ReactNode, required = false) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {node}
    </div>
  );

  const input = (key: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      {...props}
      value={(form as any)[key]}
      onChange={e => set(key, e.target.value)}
      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
    />
  );

  const select = (key: string, options: string[][]) => (
    <select
      value={(form as any)[key]}
      onChange={e => set(key, e.target.value)}
      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', background: 'white' }}
    >
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--slate)', margin: '0 0 6px' }}>Post a New Property</h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Fill in the details below. Use the AI writer to generate the description automatically.</p>
      </div>

      {submitted && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#166534', fontSize: 13, fontWeight: 600 }}>
          ✅ Listing submitted! It will be live after review.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="panel" style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--slate)', margin: '0 0 18px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Basic Information</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            {field('Property Title', input('title', { placeholder: 'e.g. Sunrise Heights 2BHK — Patia', required: true }), true)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {field('Listing Type', select('type', [['sale', 'For Sale'], ['rent', 'For Rent']]), true)}
              {field('Property Type', select('propertyType', [['apartment', 'Apartment'], ['villa', 'Villa / Independent House'], ['plot', 'Plot / Land'], ['commercial', 'Commercial']]), true)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {field('Locality', select('locality', [['', 'Select Locality'], ...LOCALITIES.map(l => [l.toLowerCase().replace(/ /g, '-'), l])]))}
              {field('Price', input('price', { placeholder: 'e.g. 6200000 (₹62 Lakh)', type: 'number' }), true)}
            </div>
          </div>
        </div>

        {/* Size & Layout */}
        <div className="panel" style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--slate)', margin: '0 0 18px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Size & Layout</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
            {field('Built-up Area (sqft)', input('area', { type: 'number', placeholder: '1200' }), true)}
            {field('Bedrooms', select('bedrooms', [['1','1 BHK'],['2','2 BHK'],['3','3 BHK'],['4','4 BHK'],['5','5+ BHK']]))}
            {field('Bathrooms', select('bathrooms', [['1','1'],['2','2'],['3','3'],['4','4+']]))}
            {field('Floor No.', input('floor', { type: 'number', placeholder: '3' }))}
            {field('Total Floors', input('totalFloors', { type: 'number', placeholder: '10' }))}
            {field('Property Age', select('age', [['new','New / Under Construction'],['0-5','0–5 Years'],['5-10','5–10 Years'],['10+','10+ Years']]))}
          </div>
        </div>

        {/* Description */}
        <div className="panel" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--slate)', margin: 0 }}>Description</h3>
            <button
              type="button"
              className="btn btn-gold btn-sm"
              style={{ fontSize: 12 }}
              onClick={() => set('description', `Spacious ${form.bedrooms} BHK ${form.propertyType} in ${form.locality || 'prime location'}. This beautifully designed property offers modern living with excellent connectivity to IT hubs and schools. Perfect for families looking for a comfortable and secure home.`)}
            >
              ✨ AI Generate
            </button>
          </div>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Describe the property — or click AI Generate above"
            rows={5}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', resize: 'vertical', boxSizing: 'border-box' }}
          />
        </div>

        {/* Amenities */}
        <div className="panel" style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--slate)', margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Amenities</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {AMENITIES.map(a => (
              <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', padding: '6px 14px', border: `1.5px solid ${form.amenities.includes(a) ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, background: form.amenities.includes(a) ? '#fef9ec' : 'white', transition: 'all 0.15s' }}>
                <input
                  type="checkbox"
                  checked={form.amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  style={{ display: 'none' }}
                />
                {form.amenities.includes(a) ? '✓ ' : ''}{a}
              </label>
            ))}
          </div>
        </div>

        {/* Photos — placeholder */}
        <div className="panel" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--slate)', margin: '0 0 14px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Photos</h3>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Click to upload photos</div>
            <div style={{ fontSize: 12 }}>S3 upload will be connected in Week 3-4. Max 10 photos, 5MB each.</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn btn-gold" style={{ padding: '12px 32px', fontSize: 15 }}>
            Submit Listing
          </button>
          <button type="button" className="btn btn-outline" style={{ padding: '12px 24px' }}>
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
}

function MyLeadsTab({ leads }: { leads: typeof MOCK_LEADS }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: 0 }}>My Leads ({leads.length})</h2>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'hot', 'warm', 'cold'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1.5px solid ${filter === f ? 'var(--gold)' : 'var(--border)'}`, background: filter === f ? 'var(--gold)' : 'white', color: filter === f ? 'white' : 'var(--muted)', textTransform: 'capitalize', fontFamily: 'var(--font-body)' }}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(l => (
          <div key={l.id} className="panel" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: STATUS_COLOR[l.status] + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {l.status === 'hot' ? '🔥' : l.status === 'warm' ? '⚡' : '🧊'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--slate)', marginBottom: 3 }}>{l.buyerName}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                📱 {l.phone} &nbsp;·&nbsp; Budget: {l.budget} &nbsp;·&nbsp; Interested in: {l.listing}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{l.status}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{l.time}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button className="btn btn-gold btn-sm">Call</button>
              <button className="btn btn-outline btn-sm">Schedule Visit</button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="panel" style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No {filter === 'all' ? '' : filter} leads yet</div>
            <div style={{ fontSize: 13 }}>Leads from your listings will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
const TABS = [
  { id: 'overview',  icon: '⊞',  label: 'Overview'      },
  { id: 'listings',  icon: '🏠',  label: 'My Listings'  },
  { id: 'post',      icon: '+',   label: 'Post Property' },
  { id: 'leads',     icon: '💬',  label: 'My Leads',     count: MOCK_LEADS.filter(l => l.status === 'hot').length },
  { id: 'profile',   icon: '👤',  label: 'Profile'      },
];

export default function AgentDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const name       = user?.name       ?? 'Agent';
  const agencyName = user?.agencyName ?? 'Your Agency';
  const email      = user?.email      ?? '';

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1a2035 0%, var(--slate) 100%)', padding: '32px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: 'var(--slate)', flexShrink: 0 }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'white', margin: 0 }}>{name}</h1>
                <span style={{ background: '#22c55e', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>AGENT</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{agencyName} &nbsp;·&nbsp; {email}</div>
            </div>
            <button className="btn btn-outline" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)', fontSize: 13 }} onClick={logout}>
              Sign Out
            </button>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,.1)', overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ padding: '14px 20px', fontSize: 13, color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,.5)', borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', fontWeight: activeTab === tab.id ? 600 : 400 }}
              >
                {tab.icon} {tab.label}
                {'count' in tab && (tab.count ?? 0) > 0 && (
                  <span style={{ background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container" style={{ padding: '28px 24px' }}>
        {activeTab === 'overview' && <OverviewTab listings={MOCK_LISTINGS} leads={MOCK_LEADS} />}
        {activeTab === 'listings' && <MyListingsTab listings={MOCK_LISTINGS} />}
        {activeTab === 'post'     && <PostPropertyTab />}
        {activeTab === 'leads'    && <MyLeadsTab leads={MOCK_LEADS} />}
        {activeTab === 'profile'  && (
          <div className="panel" style={{ maxWidth: 500 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--slate)', margin: '0 0 20px', paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>Agent Profile</h2>
            {[['Full Name', name], ['Email', email], ['Agency', agencyName], ['Role', 'Agent']].map(([label, val]) => (
              <div key={label} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 3, textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--slate)', fontWeight: 500 }}>{val}</div>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 16 }}>Full profile editing will be available in the next sprint.</p>
          </div>
        )}
      </div>
    </div>
  );
}
