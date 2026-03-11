import React from 'react';

/**
 * Footer Component
 * Application footer with links and information
 */

export interface FooterProps {
  onLinkClick?: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const sections = [
    {
      title: 'Properties',
      links: ['Buy', 'Rent', 'New Projects', 'Commercial', 'Plots'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press'],
    },
    {
      title: 'Support',
      links: ['Help Centre', 'Terms', 'Privacy', 'Contact'],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Branding */}
          <div>
            <div className="footer-logo">EstateVision</div>
            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.5)',
                lineHeight: 1.8,
                maxWidth: 300,
              }}
            >
              India's most trusted real estate platform. Find, compare and book your dream property with AI-powered insights.
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                {section.title}
              </div>
              {section.links.map((link) => (
                <button
                  key={link}
                  className="footer-link"
                  onClick={() => onLinkClick?.(link)}
                >
                  {link}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div style={{ fontSize: 12 }}>
            © 2025 EstateVision. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="badge badge-rera" style={{ fontSize: 10 }}>
              RERA Compliant
            </div>
            <div className="badge badge-verified" style={{ fontSize: 10 }}>
              ✓ ISO Certified
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
