// src/components/Header/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

// React Icons
import {
  FaHome,
  FaBookOpen,
  FaInfoCircle,
  FaEnvelope,
  FaRocket,
  FaBrain,
  FaNewspaper,
} from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineChip } from 'react-icons/hi';
import { MdOutlineScience } from 'react-icons/md';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  gradient?: string;
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('Home');
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle mobile menu state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 260);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Update active item based on pathname
  useEffect(() => {
    const path = location.pathname;
    const matching = navItems.find((n) => {
      if (n.to === '/') return path === '/';
      return path === n.to || path.startsWith(n.to + '/');
    });
    setActiveItem(matching?.label ?? '');
  }, [location.pathname]);

  const navItems: NavItem[] = [
    { label: 'Home', to: '/', icon: <FaHome />, gradient: 'linear-gradient(135deg, #64ffda 0%, #00b4d8 100%)' },
    { label: 'Courses', to: '/courses', icon: <FaBookOpen />, gradient: 'linear-gradient(135deg, #9d4edd 0%, #560bad 100%)' },
    { label: 'About Us', to: '/about', icon: <FaBrain />, gradient: 'linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)' },
    { label: 'Contact', to: '/contact', icon: <FaEnvelope />, gradient: 'linear-gradient(135deg, #ff9e00 0%, #ff0054 100%)' },
    { label: 'Testimonials', to: '/testimonials', icon: <FaInfoCircle /> },
    { label: 'Blog', to: '/blog', icon: <FaNewspaper />, gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
  ];

  // Unified navigation helper
  const navigateAndScrollTop = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Primary click handler
  const handleNavigate = (to: string, label: string) => {
    setActiveItem(label);
    setIsMobileMenuOpen(false);

    // Handle hash links
    if (to.startsWith('#')) {
      const id = to.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Normal navigation
    navigateAndScrollTop(to);
  };

  const handleLogoClick = () => {
    navigateAndScrollTop('/');
    setActiveItem('Home');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`finhdr ${isScrolled ? 'finhdr--scrolled' : ''} ${isMobileMenuOpen ? 'finhdr--mobile-open' : ''}`}
        data-testid="finhdr"
      >
        <div className="finhdr__container">
          {/* Logo - Always on left side */}
          <div
            className="finhdr__logo"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
            aria-label="Go to homepage"
          >
            <span className="finhdr__logo-text">MO_Finance Foundation</span>
            <span className="finhdr__logo-dot"> </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="finhdr__desktop-nav"
            aria-label="Main navigation"
            style={{ display: isMobile ? 'none' : 'flex' }}
          >
            <ul className="finhdr__desktop-nav-list">
              {navItems.map((item) => (
                <li key={item.label} className="finhdr__desktop-nav-item">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `finhdr__desktop-nav-link ${isActive || activeItem === item.label ? 'finhdr__desktop-nav-link--active' : ''}`
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.to, item.label);
                    }}
                    aria-current={activeItem === item.label ? 'page' : undefined}
                  >
                    <span className="finhdr__desktop-nav-icon" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="finhdr__desktop-nav-label">{item.label}</span>
                    <div className="finhdr__desktop-nav-hover-line" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle - On right side */}
          <button
            className={`finhdr__menu-toggle ${isMobileMenuOpen ? 'finhdr__menu-toggle--open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            style={{ display: isMobile ? 'flex' : 'none' }}
          >
            <span className="finhdr__menu-icon" />
          </button>

          {/* Mobile Navigation - Slides from left side */}
          <div
            ref={mobileNavRef}
            className={`finhdr__mobile-nav ${isMobileMenuOpen ? 'finhdr__mobile-nav--open' : ''} ${isLoading ? 'finhdr__mobile-nav--loading' : ''}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!isMobileMenuOpen}
            style={{ display: isMobile ? 'block' : 'none' }}
          >
            <div className="finhdr__mobile-nav-wrapper">
              {/* Mobile Header with logo and close button */}
              <div className="finhdr__mobile-header">
                <div className="finhdr__mobile-logo">
                  <span className="finhdr__mobile-logo-text"></span>
                  <span className="finhdr__mobile-logo-dot"> </span>
                </div>
                
              </div>

              <ul className="finhdr__mobile-nav-list">
                {navItems.map((item) => (
                  <li key={item.label} className="finhdr__mobile-nav-item">
                    <button
                      className={`finhdr__mobile-nav-link ${activeItem === item.label ? 'finhdr__mobile-nav-link--active' : ''}`}
                      onClick={() => handleNavigate(item.to, item.label)}
                      aria-current={activeItem === item.label ? 'page' : undefined}
                    >
                      <span className="finhdr__mobile-nav-icon" aria-hidden>
                        {item.icon}
                      </span>
                      <span className="finhdr__mobile-nav-label">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Mobile Footer */}
              <div className="finhdr__mobile-footer">
                <small>
                  © {new Date().getFullYear()} MO_Finance Foundation
                </small>
                <div className="finhdr__mobile-icons">
                  <FaRocket />
                  <HiOutlineLightningBolt />
                  <HiOutlineChip />
                  <MdOutlineScience />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        className={`finhdr__mobile-overlay ${isMobileMenuOpen ? 'finhdr__mobile-overlay--open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        onKeyDown={(e) => e.key === 'Enter' && setIsMobileMenuOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        aria-hidden={!isMobileMenuOpen}
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      />
    </>
  );
};

export default Header;
