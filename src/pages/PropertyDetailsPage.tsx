import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../services/mockData';

/**
 * PropertyDetailsPage Component
 * Displays full property details with images, specs, location, and booking panel
 * 
 * NOTE: SEO implementation available in SEO_IMPLEMENTATION.md
 * Once Property type includes all fields (bedrooms, bathrooms, area, address, images),
 * uncomment and update the useSEO hook with proper schema
 */
export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [visitType, setVisitType] = useState<'site_visit' | 'video_call'>('site_visit');

  // Find property by ID
  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="container" style={{ padding: '40px 24px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Property Not Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>The property you're looking for doesn't exist.</p>
        <button className="btn btn-gold btn-lg" onClick={() => navigate('/listings')}>
          ← Back to Listings
        </button>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.media.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + property.media.images.length) % property.media.images.length
    );
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Back Button */}
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate('/listings')}
          style={{ marginBottom: 24 }}
        >
          ← Back to Listings
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 32,
          marginBottom: 48
        }}>
          {/* Main Content */}
          <div>
            {/* Image Gallery */}
            <div className="gallery-main" style={{ position: 'relative', marginBottom: 16 }}>
              <img
                src={property.media.images[activeImageIndex]}
                alt={property.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <button
                className="gallery-btn gallery-btn-prev"
                onClick={prevImage}
              >
                ‹
              </button>
              <button
                className="gallery-btn gallery-btn-next"
                onClick={nextImage}
              >
                ›
              </button>
              <div className="gallery-counter">
                {activeImageIndex + 1}/{property.media.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="gallery-thumbs">
              {property.media.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`gallery-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Property Info */}
            <div style={{ marginTop: 48 }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--slate)',
                marginBottom: 8
              }}>
                {property.title}
              </h1>
              <p style={{
                fontSize: 14,
                color: 'var(--muted)',
                marginBottom: 20
              }}>
                {property.location.address}
              </p>

              {/* Price & Specs */}
              <div style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius-lg)',
                padding: 24,
                marginBottom: 24
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 24
                }}>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8
                    }}>
                      Price
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--gold)'
                    }}>
                      ₹{(property.price / 10000000).toFixed(1)} Cr
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 4
                    }}>
                      ₹{Math.round(property.price / property.specs.sqft)} / sqft
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8
                    }}>
                      Bedrooms
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--slate)'
                    }}>
                      {property.specs.beds}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8
                    }}>
                      Bathrooms
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--slate)'
                    }}>
                      {property.specs.baths}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 8
                    }}>
                      Area
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--slate)'
                    }}>
                      {property.specs.sqft}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 4
                    }}>
                      sqft
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--slate)',
                  marginBottom: 16
                }}>
                  About This Property
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 20
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
                      Type
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                      {property.type}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
                      Status
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                      {property.status}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
                      Furnishing
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                      {property.specs.furnished}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--slate)', marginBottom: 4 }}>
                      Floor
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                      {property.specs.floor}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Landmarks/Nearby */}
            <div style={{ marginTop: 40 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--slate)',
                marginBottom: 16
              }}>
                Nearby Landmarks
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12
              }}>
                {property.landmarks.map((landmark, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <div style={{
                      fontSize: 20,
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      📍
                    </div>
                    <div>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--slate)',
                        marginBottom: 2
                      }}>
                        {landmark.name}
                      </div>
                      <div style={{
                        fontSize: 12,
                        color: 'var(--muted)'
                      }}>
                        {landmark.distanceKm} km away
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Info */}
            {property.agent && (
            <div style={{ marginTop: 40, padding: 24, background: 'var(--cream)', borderRadius: 'var(--radius-lg)' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--slate)',
                marginBottom: 16
              }}>
                Agent Information
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  color: 'white',
                  flexShrink: 0
                }}>
                  👤
                </div>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--slate)',
                    marginBottom: 4
                  }}>
                    {property.agent.name}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    marginBottom: 4
                  }}>
                    📞 {property.agent.phone}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gold)'
                  }}>
                    ⭐ {property.agent.rating}/5.0
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Booking Panel Sidebar */}
          <div style={{ position: 'sticky', top: 88, height: 'fit-content' }}>
            <div className="booking-panel">
              <div className="booking-header">
                <div className="booking-price">
                  ₹{(property.price / 10000000).toFixed(1)} Cr
                  <span> / ₹{Math.round(property.price / property.specs.sqft)}</span>
                </div>
              </div>

              <div className="booking-body">
                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 12
                  }}>
                    Visit Type
                  </label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      className={`booking-option ${visitType === 'site_visit' ? 'selected' : ''}`}
                      onClick={() => setVisitType('site_visit')}
                    >
                      <div className="opt-icon">🏠</div>
                      <div className="opt-title">Site Visit</div>
                      <div className="opt-sub">In person</div>
                    </button>
                    <button
                      className={`booking-option ${visitType === 'video_call' ? 'selected' : ''}`}
                      onClick={() => setVisitType('video_call')}
                    >
                      <div className="opt-icon">📹</div>
                      <div className="opt-title">Video Call</div>
                      <div className="opt-sub">Online tour</div>
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="label">Date</label>
                  <input type="date" className="input" style={{ marginTop: 6 }} />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="label">Name</label>
                  <input type="text" className="input" placeholder="Your name" style={{ marginTop: 6 }} />
                </div>

                <div>
                  <label className="label">Phone</label>
                  <input type="tel" className="input" placeholder="10-digit number" style={{ marginTop: 6 }} />
                </div>
              </div>

              <div className="booking-footer">
                <button className="btn btn-gold btn-full" style={{ marginBottom: 8 }}>
                  Book a Visit
                </button>
                <button className="btn btn-outline btn-full">
                  Chat with Agent
                </button>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
                <div className="booking-trust">
                  <span>🔒</span>
                  <span style={{ fontSize: 12 }}>100% Safe & Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustment for mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .details-layout {
            grid-template-columns: 1fr;
          }
          .booking-panel {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
