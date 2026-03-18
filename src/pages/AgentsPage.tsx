import React from 'react';
import { MOCK_PROPERTIES } from '../services/mockData';
import '../styles/pages/agents.css';

/**
 * AgentsPage Component
 * Displays real estate agents/brokers with their details and properties
 */
export default function AgentsPage() {
  // Extract unique agents from mock properties
  const validProperties = MOCK_PROPERTIES.filter((p): p is typeof MOCK_PROPERTIES[0] & { agent: NonNullable<(typeof MOCK_PROPERTIES[0])['agent']> } => !!p.agent);
  
  const agents = Array.from(
    new Map(validProperties.map((p) => [p.agent.name, p.agent])).values()
  );

  // Group properties by agent
  const getAgentProperties = (agentName: string) => {
    return MOCK_PROPERTIES.filter((p) => p.agent?.name === agentName).length;
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: 'var(--slate)',
            marginBottom: 12
          }}>
            Meet Our Agents
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: 15,
            maxWidth: 500,
            margin: '0 auto'
          }}>
            Connect with experienced real estate professionals dedicated to finding your perfect property
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {agents.map((agent) => (
            <div
              key={agent.name}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                transition: 'all var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Agent Profile Image Background */}
              <div style={{
                height: 180,
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60
              }}>
                👤
              </div>

              {/* Agent Info */}
              <div style={{ padding: 24 }}>
                <h2 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--slate)',
                  marginBottom: 4
                }}>
                  {agent.name}
                </h2>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  marginBottom: 16,
                  fontSize: 14
                }}>
                  <span>⭐</span>
                  <span style={{ fontWeight: 600, color: 'var(--gold)' }}>
                    {agent.rating?.toFixed(1)}/5.0
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: 12 }}>
                    Highly Rated
                  </span>
                </div>

                {/* Contact */}
                <div style={{
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                  marginBottom: 16
                }}>
                  <p style={{
                    fontSize: 12,
                    color: 'var(--muted)',
                    marginBottom: 4,
                    marginTop: 0
                  }}>
                    📞 Phone
                  </p>
                  <a
                    href={`tel:${agent.phone}`}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--gold)',
                      textDecoration: 'none'
                    }}
                  >
                    {agent.phone}
                  </a>
                </div>

                {/* Properties Count */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: 12,
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 16
                }}>
                  <span style={{ fontSize: 16 }}>🏠</span>
                  <div>
                    <div style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginBottom: 2
                    }}>
                      Properties Listed
                    </div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--slate)'
                    }}>
                      {getAgentProperties(agent.name)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-gold btn-full" style={{ marginBottom: 0 }}>
                    Contact
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ flex: 1, marginBottom: 0 }}
                    title="Send message"
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <section style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-lg)',
          padding: 48,
          marginBottom: 48
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--slate)',
            marginBottom: 32,
            textAlign: 'center'
          }}>
            Why Choose Our Agents?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24
          }}>
            {[
              { icon: '🏆', title: 'Expert Knowledge', desc: 'Years of experience in real estate market' },
              { icon: '🔍', title: 'Property Matching', desc: 'Find properties that match your needs perfectly' },
              { icon: '💼', title: 'Professional Service', desc: 'End-to-end support throughout the process' },
              { icon: '⚡', title: 'Quick Turnaround', desc: 'Fast and efficient transaction handling' }
            ].map((benefit, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 40,
                  marginBottom: 12
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--slate)',
                  marginBottom: 8
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  lineHeight: 1.5
                }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
