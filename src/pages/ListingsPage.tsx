import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../services/mockData';
import { Property } from '../types';

/**
 * ListingsPage Component
 * Displays paginated property listings with grid/list view toggle
 */
export default function ListingsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());

  const toggleLike = (propId: string) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propId)) {
      newLiked.delete(propId);
    } else {
      newLiked.add(propId);
    }
    setLikedProperties(newLiked);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--slate)',
              marginBottom: 4
            }}>
              Available Properties
            </h1>
            <p style={{
              color: 'var(--muted)',
              fontSize: 14
            }}>
              {MOCK_PROPERTIES.length} properties available
            </p>
          </div>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            gap: 8,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: 4
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: viewMode === 'grid' ? 'var(--slate)' : 'transparent',
                color: viewMode === 'grid' ? 'white' : 'var(--muted)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                transition: 'all var(--transition)'
              }}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: viewMode === 'list' ? 'var(--slate)' : 'transparent',
                color: viewMode === 'list' ? 'white' : 'var(--muted)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                transition: 'all var(--transition)'
              }}
            >
              List
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          flexWrap: 'wrap'
        }}>
          <button className="filter-chip active">All Properties</button>
          <button className="filter-chip">Ready to Move</button>
          <button className="filter-chip">Under Construction</button>
          <button className="filter-chip">Premium</button>
        </div>

        {/* Properties Grid/List */}
        <div className={viewMode === 'grid' ? 'grid-3' : ''} style={{
          display: viewMode === 'list' ? 'flex' : 'grid',
          flexDirection: viewMode === 'list' ? 'column' : undefined,
          gap: viewMode === 'list' ? 16 : 24
        }}>
          {MOCK_PROPERTIES.map((property) => (
            <PropertyCardView
              key={property.id}
              property={property}
              viewMode={viewMode}
              isLiked={likedProperties.has(property.id)}
              onLike={() => toggleLike(property.id)}
              onViewDetails={() => navigate(`/property/${property.id}`)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginTop: 48
        }}>
          <button className="btn btn-outline btn-sm">← Previous</button>
          <div style={{
            display: 'flex',
            gap: 4,
            margin: '0 16px'
          }}>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                style={{
                  width: 32,
                  height: 32,
                  border: page === 1 ? '1px solid var(--gold)' : '1px solid var(--border)',
                  background: page === 1 ? 'var(--gold)' : 'white',
                  color: page === 1 ? 'white' : 'var(--slate)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                  transition: 'all var(--transition)'
                }}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="btn btn-outline btn-sm">Next →</button>
        </div>
      </div>
    </div>
  );
}

/**
 * PropertyCardView Component - Renders property in grid or list mode
 */
interface PropertyCardViewProps {
  property: Property;
  viewMode: 'grid' | 'list';
  isLiked: boolean;
  onLike: () => void;
  onViewDetails: () => void;
}

function PropertyCardView({
  property,
  viewMode,
  isLiked,
  onLike,
  onViewDetails
}: PropertyCardViewProps) {
  if (viewMode === 'list') {
    return (
      <div style={{
        display: 'flex',
        gap: 16,
        background: 'white',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all var(--transition)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
      >
        <img
          src={property.media.images[0]}
          alt={property.title}
          style={{
            width: 240,
            height: 200,
            objectFit: 'cover',
            flexShrink: 0
          }}
        />
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--gold)',
              marginBottom: 8
            }}>
              ₹{(property.price / 10000000).toFixed(1)} Cr
            </div>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--slate)',
              marginBottom: 4
            }}>
              {property.title}
            </h3>
            <p style={{
              fontSize: 13,
              color: 'var(--muted)',
              marginBottom: 12
            }}>
              {property.location.address}
            </p>
            <div style={{
              display: 'flex',
              gap: 20,
              fontSize: 12,
              color: 'var(--muted)'
            }}>
              <span>🛏️ {property.specs.beds} Beds</span>
              <span>🚿 {property.specs.baths} Baths</span>
              <span>📐 {property.specs.sqft} sqft</span>
            </div>
          </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            style={{
              width: 40,
              height: 40,
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              fontSize: 18,
              cursor: 'pointer',
              transition: 'all var(--transition)'
            }}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="btn btn-gold btn-sm"
          >
            View
          </button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      onClick={onViewDetails}
      style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        transition: 'all var(--transition)',
        cursor: 'pointer',
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
      <div style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden' }}>
        <img
          src={property.media.images[0]}
          alt={property.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 40,
            height: 40,
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            fontSize: 20,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition)'
          }}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--gold)',
          marginBottom: 8
        }}>
          ₹{(property.price / 10000000).toFixed(1)} Cr
        </div>
        <h3 style={{
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--slate)',
          marginBottom: 4,
          lineHeight: 1.4
        }}>
          {property.title}
        </h3>
        <p style={{
          fontSize: 13,
          color: 'var(--muted)',
          marginBottom: 12
        }}>
          {property.location.locality}
        </p>
        <div style={{
          display: 'flex',
          gap: 16,
          fontSize: 12,
          color: 'var(--muted)',
          paddingTop: 12,
          borderTop: '1px solid var(--border)'
        }}>
          <span>🛏️ {property.specs.beds}</span>
          <span>🚿 {property.specs.baths}</span>
          <span>📐 {property.specs.sqft}</span>
        </div>
      </div>
    </div>
  );
}
