// src/components/Footer/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaGlobe,
  FaRocket,
  FaBrain
} from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    // { label: 'Features', path: '/features' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com', color: '#0077B5' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com', color: '#FF0000' },
    { name: 'Discord', icon: <FaDiscord />, url: 'https://discord.com', color: '#5865F2' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com', color: '#333' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com', color: '#E4405F' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'GDPR', path: '/gdpr' },
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section */}
        <div className="footer__top">
          <div className="footer__brand-section">
            <div className="footer__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="footer__logo-text">FINANCE</span>
              <span className="footer__logo-dot"></span>
              <FaBrain className="footer__logo-icon" />
            </div>
            <p className="footer__tagline">
              Revolutionizing financial education with cutting-edge technology.
            </p>
            
          </div>

          <div className="footer__links-section">
            <h3 className="footer__section-title">Quick Links</h3>
            <ul className="footer__links-list">
              {quickLinks.map((link) => (
                <li key={link.label} className="footer__link-item">
                  <Link 
                    to={link.path} 
                    className="footer__link"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span className="footer__link-icon">→</span>
                    <span className="footer__link-label">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact-section">
            <h3 className="footer__section-title">Contact Us</h3>
            <div className="footer__contact-info">
              <a href="mailto:hello@financeai.com" className="footer__contact-link">
                <FaEnvelope />
                <span>mosesmfonundofia@gmail.com</span>
              </a>
              <a href="https://financeai.com" className="footer__contact-link">
                <FaGlobe />
                <span>www.finance.com</span>
              </a>
            </div>
            <div className="footer__newsletter">
              <h4 className="footer__newsletter-title">Stay Updated</h4>
              <p className="footer__newsletter-text">Get finance insights delivered weekly</p>
              <form className="footer__newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="footer__newsletter-input"
                />
                <button type="submit" className="footer__newsletter-btn">
                  <HiOutlineLightningBolt />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section - Social */}
        <div className="footer__middle">
          <h3 className="footer__social-title">Connect With Us</h3>
          <div className="footer__social-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="footer__social-link"
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--social-color': link.color } as React.CSSProperties}
              >
                <span className="footer__social-icon">{link.icon}</span>
                <span className="footer__social-glow"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © {currentYear} <span className="footer__copyright-highlight">Finance</span>. All rights reserved.
          </div>
          
          <div className="footer__legal-links">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.path} className="footer__legal-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* <div className="footer__extra">
            <span className="footer__version">v2.1.0 • AI Engine</span>
            <div className="footer__ai-status">
              <div className="footer__ai-indicator"></div>
              <span>AI Active</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer__decoration">
        <div className="footer__particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="footer__particle"></div>
          ))}
        </div>
      </div>
    </footer>
  );
};