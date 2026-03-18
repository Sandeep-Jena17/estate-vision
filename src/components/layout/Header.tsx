import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../common';

// ── Theme hook (no separate file needed) ─────────────
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ev-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('ev-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggle: () => setIsDark(d => !d) };
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle }                    = useTheme();
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { label: 'Home',       path: '/'           },
    { label: 'Listings',   path: '/listings'   },
    { label: 'Properties', path: '/properties' },
    { label: 'Projects',   path: '/projects'   },
    { label: 'Agents',     path: '/agents'     },
  ];

  return (
    <>
      {/* ── NAV ──────────────────────────────────────── */}
      <nav
        className="nav"
        style={{ boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,.08)' : 'none' }}
      >
        {/*
          ✅ KEY FIX: replaced the inline style div with .nav-inner
          Old code had padding:'0 24px' + maxWidth:1280px + margin:'0 auto'
          which created horizontal overflow on iPhone SE (375px)

          .nav-inner uses var(--px) which is:
            16px on mobile  (≤640px)
            20px on tablet  (≤768px)
            24px on desktop (≥768px)
        */}
        <div className="nav-inner">

          {/* Logo */}
          <button className="nav-logo" onClick={() => navigate('/')}>
            <span className="dot" />
            EstateVision
          </button>

          {/* Desktop nav links */}
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

          {/* Desktop: theme toggle + auth buttons */}
          <div className="nav-desktop-auth">
            <button
              className="theme-toggle"
              onClick={toggle}
              title={isDark ? 'Switch to light' : 'Switch to dark'}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <Button variant="ghost" size="sm">Log In</Button>
            <Button variant="gold"  size="sm">✦ Post Property</Button>
          </div>

          {/* Mobile: theme toggle + hamburger (both in one row) */}
          <div className="nav-mobile-right">
            <button
              className="theme-toggle"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </nav>

      {/* ── MOBILE OVERLAY ───────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── MOBILE MENU ──────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <button
              key={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
          <div className="mobile-menu-auth">
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