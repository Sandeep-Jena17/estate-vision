import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../services/mockData';
import '../styles/pages/projects.css';

/**
 * ProjectsPage Component
 * Displays real estate development projects
 */
export default function ProjectsPage() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock projects data (extended from properties)
  const projects = [
    {
      id: 'proj_001',
      name: 'Prestige Lakeview Residences',
      location: 'Patia, Bhubaneswar',
      status: 'Ready to Move',
      completion: '100%',
      units: 150,
      price: '₹85L - ₹1.5Cr',
      image: MOCK_PROPERTIES[0].media.images[0],
      description: 'Premium residential complex with world-class amenities and lakeside living',
      amenities: ['Swimming Pool', 'Gym', 'Shopping Mall', 'School', 'Hospital']
    },
    {
      id: 'proj_002',
      name: 'Royal Villas Luxury',
      location: 'Nayapalli, Bhubaneswar',
      status: 'Under Construction',
      completion: '65%',
      units: 45,
      price: '₹2Cr - ₹3.5Cr',
      image: MOCK_PROPERTIES[1].media.images[0],
      description: 'Exclusive luxury villa project with premium finishes and modern architecture',
      amenities: ['Private Garden', 'Smart Home', 'Gated Community', 'Parking', 'Security']
    },
    {
      id: 'proj_003',
      name: 'Sunrise Heights Apartments',
      location: 'Sachivalaya Marg, Bhubaneswar',
      status: 'Ready to Move',
      completion: '100%',
      units: 200,
      price: '₹42L - ₹1Cr',
      image: MOCK_PROPERTIES[2].media.images[0],
      description: 'Modern apartments with sustainable living and community spaces',
      amenities: ['Yoga Studio', 'Kids Zone', 'Co-working Space', 'Terrace Garden', 'Lift']
    }
  ];

  const filteredProjects = projects.filter((proj) => {
    if (selectedStatus === 'all') return true;
    return proj.status === selectedStatus;
  });

  const getStatusColor = (status: string) => {
    if (status === 'Ready to Move') return '#059669';
    if (status === 'Under Construction') return '#b8860b';
    return '#6b7280';
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: 'var(--slate)',
            marginBottom: 12
          }}>
            Development Projects
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: 15,
            maxWidth: 500
          }}>
            Explore our premium real estate development projects across the city
          </p>
        </div>

        {/* Filter Chips */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 32,
          flexWrap: 'wrap'
        }}>
          {['all', 'Ready to Move', 'Under Construction'].map((status) => (
            <button
              key={status}
              className={`filter-chip ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
              style={{
                borderColor: selectedStatus === status ? 'var(--gold)' : 'var(--border)',
                background: selectedStatus === status ? 'var(--gold)' : 'white',
                color: selectedStatus === status ? 'white' : 'var(--muted)'
              }}
            >
              {status === 'all' ? 'All Projects' : status}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-2" style={{ marginBottom: 48 }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              {/* Project Image */}
              <div style={{
                position: 'relative',
                paddingBottom: '66.66%',
                overflow: 'hidden'
              }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: getStatusColor(project.status),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: 11,
                  fontWeight: 600
                }}>
                  {project.status}
                </div>

                {/* Completion Progress */}
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  background: 'white',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--slate)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  {project.completion} Complete
                </div>
              </div>

              {/* Project Info */}
              <div style={{ padding: 24 }}>
                <h2 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--slate)',
                  marginBottom: 4
                }}>
                  {project.name}
                </h2>

                <p style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  📍 {project.location}
                </p>

                <p style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                  marginBottom: 16
                }}>
                  {project.description}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginBottom: 16,
                  padding: '16px',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 4
                    }}>
                      Units
                    </div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--slate)'
                    }}>
                      {project.units}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 4
                    }}>
                      Price Range
                    </div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--gold)'
                    }}>
                      {project.price}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div style={{
                  marginBottom: 16
                }}>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--slate)',
                    marginBottom: 8
                  }}>
                    Key Amenities
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: 6,
                    flexWrap: 'wrap'
                  }}>
                    {project.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        style={{
                          background: 'var(--gold-lt)',
                          color: 'var(--gold)',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: 11,
                          fontWeight: 600
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="btn btn-gold btn-full"
                  onClick={() => navigate('/properties')}
                  style={{ marginBottom: 0 }}
                >
                  View Properties →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Invest Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--slate) 0%, #1a2035 100%)',
          color: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: 48,
          marginBottom: 48
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 32,
            textAlign: 'center'
          }}>
            Why Invest in Our Projects?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32
          }}>
            {[
              { icon: '📍', title: 'Prime Locations', desc: 'Projects in high-demand areas' },
              { icon: '🏗️', title: 'Quality Build', desc: 'Built with finest materials and expertise' },
              { icon: '💰', title: 'Value Appreciation', desc: 'Strong appreciation potential' },
              { icon: '🤝', title: 'Hassle-free', desc: 'Professional project management' }
            ].map((reason, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: 36,
                  marginBottom: 12
                }}>
                  {reason.icon}
                </div>
                <h3 style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 8
                }}>
                  {reason.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  opacity: 0.8,
                  lineHeight: 1.5
                }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
