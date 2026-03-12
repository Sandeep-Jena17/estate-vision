import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../common';

/**
 * Header/Navigation Component
 * Fixed navigation bar with logo and controls
 * Fully responsive with mobile hamburger menu
 */

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Manage body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Close menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Listings', path: '/listings' },
    { label: 'Properties', path: '/properties' },
    { label: 'Projects', path: '/projects' },
    { label: 'Agents', path: '/agents' }
  ];

  return (
    <>
      <nav
        className="nav"
        style={{
          boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,.08)' : 'none',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          height: '100%',
        }}>
          {/* Logo */}
          <button
            className="nav-logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <div className="dot" />
            EstateVision
          </button>

          {/* Desktop Navigation Links */}
          <div className="nav-desktop-links">
            {navItems.map(item => (
              <button
                key={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="nav-desktop-auth">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="gold" size="sm">
              ✦ Post Property
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-mobile-toggle"
            title="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Only show on mobile when open */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel - Only show on mobile when open */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {/* Mobile Nav Items */}
          {navItems.map(item => (
            <button
              key={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Auth Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '12px 20px',
            borderTop: '1px solid var(--border)',
            marginTop: 8
          }}>
            <Button variant="ghost" size="sm" style={{ width: '100%' }}>
              Log In
            </Button>
            <Button variant="gold" size="sm" style={{ width: '100%' }}>
              ✦ Post Property
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

Header.displayName = 'Header';
