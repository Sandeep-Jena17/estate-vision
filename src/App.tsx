import React, { useState, useCallback } from 'react';
import { Header, Footer } from './components/layout';
import { Property } from './types';
import { GLOBAL_STYLES } from './styles/global';
import { MOCK_PROPERTIES } from './services/mockData';

/**
 * Root App Component
 * Main application entry point with view routing
 */

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'listings' | 'detail'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleNavigate = useCallback((view: 'home' | 'listings') => {
    setCurrentView(view);
    setSelectedProperty(null);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Placeholder for view content */}
      <main>
        {currentView === 'home' && (
          <div className="container" style={{ padding: '80px 24px' }}>
            <h1>🏠 EstateVision — Premium Real Estate Platform</h1>
            <p style={{ marginTop: 16, fontSize: 16, color: 'var(--muted)' }}>
              A fully refactored, production-ready React TypeScript application with
              reusable components, custom hooks, and best practices implementation.
            </p>
            <button
              className="btn btn-gold btn-lg"
              onClick={() => handleNavigate('listings')}
              style={{ marginTop: 24 }}
            >
              Explore {MOCK_PROPERTIES.length} Properties →
            </button>
          </div>
        )}

        {currentView === 'listings' && (
          <div className="container" style={{ padding: '40px 24px' }}>
            <h2>Available Properties</h2>
            <div className="grid-3" style={{ marginTop: 32 }}>
              {MOCK_PROPERTIES.map((property) => (
                <div
                  key={property.id}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: 16,
                    cursor: 'pointer',
                    border: '1px solid var(--border)',
                  }}
                  onClick={() => handleSelectProperty(property)}
                >
                  <img
                    src={property.media.images[0]}
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 12,
                    }}
                  />
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                    {property.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 12 }}>
                    {property.location.locality}, {property.location.city}
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--gold)',
                    }}
                  >
                    ₹{(property.price / 10000000).toFixed(1)} Cr
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'detail' && selectedProperty && (
          <div className="container" style={{ padding: '40px 24px' }}>
            <button
              className="btn btn-outline"
              onClick={() => handleNavigate('listings')}
              style={{ marginBottom: 24 }}
            >
              ← Back to Listings
            </button>
            <h1>{selectedProperty.title}</h1>
            <p style={{ color: 'var(--muted)', marginTop: 8, marginBottom: 16 }}>
              {selectedProperty.location.address}
            </p>
            <img
              src={selectedProperty.media.images[0]}
              alt={selectedProperty.title}
              style={{
                width: '100%',
                maxHeight: 500,
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 24,
              }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 16,
                marginBottom: 32,
              }}
            >
              {[
                ['🛏', `${selectedProperty.specs.beds} BHK`],
                ['🚿', `${selectedProperty.specs.baths} Baths`],
                ['📐', `${selectedProperty.specs.sqft} Sqft`],
                ['🏢', selectedProperty.specs.floor],
                ['🚗', `${selectedProperty.specs.parking} Parking`],
              ].map(([icon, value]) => (
                <div
                  key={value}
                  style={{
                    textAlign: 'center',
                    background: 'white',
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
            <p style={{ lineHeight: 1.7 }}>{selectedProperty.description}</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
