/**
 * AdminDashboardPage — for users with role: 'admin'
 * Full agency management: Listings, Agents, Leads, Analytics, Settings
 * Data is mock — will connect to real Lambda API in Week 3-4 sprint
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/* ─── Mock data ───────────────────────────────────────────── */
const MOCK_AGENTS = [
  { id: 'A001', name: 'Priya Sharma',  email: 'priya@sharmaRealty.com',  phone: '+91 98765 43210', listings: 8, leads: 22, deals: 3, status: 'active',   joined: '2025-01-10' },
  { id: 'A002', name: 'Arjun Nanda',   email: 'arjun@sharmaRealty.com',   phone: '+91 87654 32109', listings: 5, leads: 11, deals: 1, status: 'active',   joined: '2025-02-15' },
  { id: 'A003', name: 'Kavita Mohanty',email: 'kavita@sharmaRealty.com',  phone: '+91 76543 21098', listings: 3, leads: 7,  deals: 0, status: 'inactive', joined: '2025-03-01' },
];

const MOCK_LISTINGS = [
  { id: 'L001', title: 'Sunrise Heights 2BHK', agent: 'Priya Sharma',  locality: 'Patia',        price: '₹62L',    type: 'Sale', status: 'active',  views: 142, leads: 4 },
  { id: 'L002', title: 'Green Valley 3BHK',    agent: 'Arjun Nanda',   locality: 'Nayapalli',    price: '₹95L',    type: 'Sale', status: 'active',  views: 87,  leads: 2 },
  { id: 'L003', title: 'Metro Studio Flat',    agent: 'Priya Sharma',  locality: 'Saheed Nagar', price: '₹18K/mo', type: 'Rent', status: 'inactive',views: 31,  leads: 0 },
  { id: 'L004', title: 'Royal Villas 4BHK',    agent: 'Kavita Mohanty',locality: 'Chandrasekharpur', price: '₹1.8Cr', type: 'Sale', status: 'active', views: 210, leads: 9 },
];

const MOCK_LEADS = [
  { id: 'LD001', buyerName: 'Rohit Panda',  phone: '+91 98765 11111', budget: '₹60-70L', listing: 'Sunrise Heights 2BHK', agent: 'Priya Sharma',  status: 'hot',       time: '2 hrs ago'  },
  { id: 'LD002', buyerName: 'Sneha Das',    phone: '+91 87654 22222', budget: '₹90-1Cr', listing: 'Green Valley 3BHK',    agent: 'Arjun Nanda',   status: 'warm',      time: '1 day ago'  },
  { id: 'LD003', buyerName: 'Amit Mohanty', phone: '+91 76543 33333', budget: '₹15-20K', listing: 'Metro Studio Flat',    agent: 'Priya Sharma',  status: 'cold',      time: '3 days ago' },
  { id: 'LD004', buyerName: 'Priti Sahoo',  phone: '+91 65432 44444', budget: '₹1.5-2Cr',listing: 'Royal Villas 4BHK',   agent: 'Kavita Mohanty',status: 'converted', time: '5 hrs ago'  },
];

const STATUS_COLOR: Record<string, string> = {
  hot: '#ef4444', warm: '#f59e0b', cold: '#6b7280', converted: '#22c55e',
  active: '#22c55e', inactive: '#6b7280',
};

const TABS = [
  { id: 'overview',  icon: '⊞', label: 'Overview'     },
  { id: 'listings',  icon: '🏠', label: 'All Listings' },
  { id: 'agents',    icon: '👥', label: 'Agents'       },
  { id: 'leads',     icon: '💬', label: 'All Leads',   count: MOCK_LEADS.filter(l => l.status === 'hot').length },
  { id: 'analytics', icon: '📊', label: 'Analytics'   },
  { id: 'settings',  icon: '⚙',  label: 'Settings'    },
];

/* ─── Overview Tab ────────────────────────────────────────── */
function OverviewTab() {
  const totalViews   = MOCK_LISTINGS.reduce((s, l) => s + l.views, 0);
  const activeAgents = MOCK_AGENTS.filter(a => a.status === 'active').length;
  const hotLeads     = MOCK_LEADS.filter(l => l.status === 'hot').length;
  const totalDeals   = MOCK_AGENTS.reduce((s, a) => s + a.deals, 0);

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '🏠', label: 'Active Listings', value: MOCK_LISTINGS.filter(l => l.status === 'active').length, sub: `${MOCK_LISTINGS.length} total` },
          { icon: '👥', label: 'Active Agents',   value: activeAgents,    sub: `${MOCK_AGENTS.length} total` },
          { icon: '👁', label: 'Total Views',      value: totalViews,      sub: 'last 30 days' },
          { icon: '🔥', label: 'Hot Leads',        value: hotLeads,        sub: `${MOCK_LEADS.length} total` },
          { icon: '🤝', label: 'Deals Closed',     value: totalDeals,      sub: 'this month' },
          { icon: '💰', label: 'Est. Revenue',     value: '₹1.2L',         sub: 'commissions this month' },
        ].map(s => (
          <div key={s.label} className="panel" style={{ textAlign: 'center', padding: '18px 14px' }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--slate)' }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--slate)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top Agents */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Top Agents This Month</span></div>
          {MOCK_AGENTS.sort((a, b) => b.leads - a.leads).map((a, i) => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'var(--gold)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: i === 0 ? 'white' : 'var(--muted)', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--slate)' }}>{a.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{a.listings} listings · {a.leads} leads · {a.deals} deals</div>
              </div>
              <span style={{ background: STATUS_COLOR[a.status] + '20', color: STATUS_COLOR[a.status], padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{a.status}</span>
            </div>
          ))}
        </div>

        {/* Recent Leads */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Recent Leads</span></div>
          {MOCK_LEADS.slice(0, 4).map(l => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[l.status], flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--slate)' }}>{l.buyerName}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.listing} · {l.agent}</div>
              </div>
              <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Agents Tab ──────────────────────────────────────────── */
function AgentsTab() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: 0 }}>Agents ({MOCK_AGENTS.length})</h2>
        <button className="btn btn-gold" onClick={() => setShowInvite(!showInvite)}>+ Invite Agent</button>
      </div>

      {showInvite && (
        <div className="panel" style={{ marginBottom: 20, background: '#fffbeb', border: '1px solid #fde68a' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--slate)', margin: '0 0 14px' }}>Invite a New Agent</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="email"
              placeholder="agent@email.com"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}
            />
            <button className="btn btn-gold" onClick={() => { setShowInvite(false); setInviteEmail(''); }}>Send Invite</button>
            <button className="btn btn-outline" onClick={() => setShowInvite(false)}>Cancel</button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '10px 0 0' }}>Agent will receive an email invitation to create their account. Cognito will create their login automatically.</p>
        </div>
      )}

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
              {['Agent', 'Contact', 'Listings', 'Leads', 'Deals', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--muted)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_AGENTS.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--slate)' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Joined {a.joined}</div>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 12 }}>
                  <div>{a.email}</div>
                  <div>{a.phone}</div>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--slate)' }}>{a.listings}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--slate)' }}>{a.leads}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--gold)' }}>{a.deals}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: STATUS_COLOR[a.status] + '20', color: STATUS_COLOR[a.status], padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{a.status}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-outline btn-sm">View</button>
                    <button className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#ef4444' }}>Remove</button>
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

/* ─── All Listings Tab ────────────────────────────────────── */
function AllListingsTab() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: 0 }}>All Listings ({MOCK_LISTINGS.length})</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option>All Agents</option>{MOCK_AGENTS.map(a => <option key={a.id}>{a.name}</option>)}
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <option>All Status</option><option>Active</option><option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
              {['Property', 'Agent', 'Price', 'Type', 'Views', 'Leads', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--muted)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_LISTINGS.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--slate)' }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{l.locality}</div>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{l.agent}</td>
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
                    <button className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#ef4444' }}>Delete</button>
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

/* ─── All Leads Tab ───────────────────────────────────────── */
function AllLeadsTab() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? MOCK_LEADS : MOCK_LEADS.filter(l => l.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: 0 }}>All Leads ({MOCK_LEADS.length})</h2>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'hot', 'warm', 'cold', 'converted'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1.5px solid ${filter === f ? 'var(--gold)' : 'var(--border)'}`, background: filter === f ? 'var(--gold)' : 'white', color: filter === f ? 'white' : 'var(--muted)', textTransform: 'capitalize', fontFamily: 'var(--font-body)' }}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
              {['Buyer', 'Phone', 'Budget', 'Listing', 'Assigned To', 'Status', 'Time'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--muted)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--slate)' }}>{l.buyerName}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{l.phone}</td>
                <td style={{ padding: '14px 16px', color: 'var(--slate)' }}>{l.budget}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.listing}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{l.agent}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: STATUS_COLOR[l.status] + '20', color: STATUS_COLOR[l.status], padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{l.status}</span>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 11 }}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Analytics Tab ───────────────────────────────────────── */
function AnalyticsTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: '0 0 20px' }}>Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Lead conversion */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Lead Funnel</span></div>
          {[
            { label: 'Total Enquiries', count: 47, pct: 100, color: '#6b7280' },
            { label: 'Contacted',       count: 38, pct: 81,  color: '#3b82f6' },
            { label: 'Site Visits',     count: 14, pct: 30,  color: '#f59e0b' },
            { label: 'Deals Closed',    count: 4,  pct: 9,   color: '#22c55e' },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                <span style={{ color: 'var(--slate)', fontWeight: 500 }}>{row.label}</span>
                <span style={{ color: 'var(--muted)' }}>{row.count} ({row.pct}%)</span>
              </div>
              <div style={{ height: 8, background: 'var(--cream)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: 4, transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top localities */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Top Localities by Enquiries</span></div>
          {[
            { name: 'Patia', count: 18, color: '#ef4444' },
            { name: 'Nayapalli', count: 13, color: '#f59e0b' },
            { name: 'Saheed Nagar', count: 9, color: '#3b82f6' },
            { name: 'Chandrasekharpur', count: 7, color: '#22c55e' },
          ].map(row => (
            <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13, color: 'var(--slate)', fontWeight: 500 }}>{row.name}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate)' }}>{row.count}</div>
            </div>
          ))}
        </div>

        {/* Monthly trend placeholder */}
        <div className="panel" style={{ gridColumn: '1/-1' }}>
          <div className="panel-header"><span className="panel-title">Monthly Lead Trend</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, padding: '12px 0' }}>
            {[12, 18, 9, 24, 15, 30, 22, 35, 28, 40, 47, 38].map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: i === 11 ? 'var(--gold)' : 'var(--cream)', borderRadius: '4px 4px 0 0', height: `${(val / 47) * 100}px`, transition: 'height 0.3s', border: '1px solid var(--border)' }} />
                <span style={{ fontSize: 9, color: 'var(--muted)' }}>
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '8px 0 0' }}>Full analytics dashboard with real data will be built in Phase 3 (Month 3).</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Settings Tab ────────────────────────────────────────── */
function SettingsTab({ agencyName }: { agencyName: string }) {
  return (
    <div style={{ maxWidth: 560 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--slate)', margin: '0 0 20px' }}>Agency Settings</h2>

      <div className="panel" style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--slate)', margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Branding</h3>
        {[['Agency Name', agencyName], ['Subdomain', 'sharma-realty.estatevision.com'], ['Custom Domain', 'Not configured'], ['Plan', 'Growth — ₹5,999/month']].map(([l, v]) => (
          <div key={l} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
              <div style={{ fontSize: 14, color: 'var(--slate)', fontWeight: 500 }}>{v}</div>
            </div>
            <button className="btn btn-outline btn-sm">Edit</button>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--slate)', margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Subscription</h3>
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--slate)', marginBottom: 4 }}>Growth Plan</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>₹5,999/month · Renews on April 22, 2026</div>
          {[['Agents', '3 / 5'], ['Listings', '28 / Unlimited'], ['AI Writes', '32 / 50'], ['Valuation Reports', '4 / 10']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
              <span style={{ color: 'var(--muted)' }}>{label}</span>
              <span style={{ fontWeight: 600, color: 'var(--slate)' }}>{val}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Upgrade to Agency Plan — ₹9,999/mo</button>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>Razorpay billing integration coming in Phase 4 (Month 4).</p>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const name       = user?.name       ?? 'Admin';
  const agencyName = user?.agencyName ?? 'Your Agency';
  const email      = user?.email      ?? '';

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '32px 0 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: 'var(--slate)', flexShrink: 0 }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'white', margin: 0 }}>{agencyName}</h1>
                <span style={{ background: 'var(--gold)', color: 'var(--slate)', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>ADMIN</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>Managed by {name} &nbsp;·&nbsp; {email}</div>
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
                style={{ padding: '14px 20px', fontSize: 13, color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,.5)', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '2px solid var(--gold)' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', fontWeight: activeTab === tab.id ? 600 : 400 }}
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
        {activeTab === 'overview'  && <OverviewTab />}
        {activeTab === 'listings'  && <AllListingsTab />}
        {activeTab === 'agents'    && <AgentsTab />}
        {activeTab === 'leads'     && <AllLeadsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'settings'  && <SettingsTab agencyName={agencyName} />}
      </div>
    </div>
  );
}
