import React, { useState, useEffect } from 'react';
import { Button } from '../common';

/**
 * Header/Navigation Component
 * Fixed navigation bar with logo and controls
 */

export interface HeaderProps {
  currentView: 'home' | 'listings' | 'detail';
  onNavigate: (view: 'home' | 'listings') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="nav"
      style={{
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,.08)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Logo */}
        <div
          className="nav-logo"
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="dot" />
          EstateVision
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'listings' ? 'active' : ''}`}
            onClick={() => onNavigate('listings')}
          >
            Properties
          </button>
          <button className="nav-link">Projects</button>
          <button className="nav-link">Agents</button>
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button variant="gold" size="sm">
            ✦ Post Property
          </Button>
        </div>
      </div>
    </nav>
  );
};

Header.displayName = 'Header';
