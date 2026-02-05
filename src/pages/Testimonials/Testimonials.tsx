// src/pages/Testimonials/Testimonials.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Testimonials.css';

// Import testimonial images (assuming you have these files in the same folder)
import testimonial1 from './tes1.jpeg';
import testimonial2 from './tes2.jpeg';
import testimonial3 from './tes3.jpeg';
import testimonial4 from './tes4.jpeg';
import testimonial5 from './tes5.jpeg';
import testimonial6 from './tes6.jpeg';

// React Icons Imports
import {
  FaStar,
  FaHeart,
  FaRocket,
  FaChevronRight,
  FaPlay,
  FaShieldAlt,
  FaAward
} from 'react-icons/fa';
import {
  BsShieldCheck,
  BsCurrencyDollar,
  BsGraphUp,
  BsPeople
} from 'react-icons/bs';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  screenshot: string;
  rating: number;
  date: string;
  location: string;
  verified: boolean;
  achievements?: string[];
};

export const Testimonials: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial1,
      rating: 5,
      date: 'December 15, 2025',
      location: 'Abuja, Nigeria',
      verified: true,
      achievements: [
        
      ]
    },
    {
      id: 2,
      name: 'Favour',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial2,
      rating: 5,
      date: 'November 10, 2025',
      location: 'Lagos, Nigeria',
      verified: true,
      achievements: [
       
      ]
    },
    {
      id: 3,
      name: 'Augustus Osunwa',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial3,
      rating: 5,
      date: 'January 5, 2026',
      location: 'Port Harcourt, Nigeria',
      verified: true,
      achievements: [
       
      ]
    },
    {
      id: 4,
      name: 'Engr Benjamin',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial4,
      rating: 5,
      date: 'February 2, 2026',
      location: 'Calabar, Nigeria',
      verified: true,
      achievements: [
        
      ]
    },
    {
      id: 5,
      name: 'Engr Benjamin',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial5,
      rating: 5,
      date: 'January 20, 2026',
      location: 'Abuja, Nigeria',
      verified: true,
      achievements: [
        
      ]
    },
     {
      id: 6,
      name: 'Mary',
      role: 'Investment Student',
      company: '',
      screenshot: testimonial6,
      rating: 5,
      date: 'February 2, 2026',
      location: 'Calabar, Nigeria',
      verified: true,
      achievements: [
       
      ]
    }
  ];

  const stats = [
    {
      value: 100,
      label: 'Students Transformed',
      suffix: '+'
    },
    {
      value: 4.9,
      label: 'Average Rating',
      suffix: '/5'
    },
    {
      value: 100,
      label: 'Success Rate',
      suffix: '%'
    },
    {
      value: 20,
      label: 'Testimonials Shared',
      suffix: '+'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star-icon">
        {index < Math.floor(rating) ? (
          <FaStar className="star-filled" />
        ) : index < rating ? (
          <FaStar className="star-half" />
        ) : (
          <FaStar className="star-empty" />
        )}
      </span>
    ));
  };

  // Navigation handlers
  const handleStartLearningClick = () => {
    navigate('/courses');
  };

  const handleWatchPreviewClick = () => {
    window.open('https://youtube.com/@mosesmfonudofia?si=Nob6BWPBX82xVwwo', '_blank', 'noopener,noreferrer');
  };

  // Handle image click for modal
  const handleImageClick = (screenshot: string) => {
    setSelectedImage(screenshot);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Prevent modal close when clicking on content
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="container">
          <div className="testimonials-hero__content">
            <div className="testimonials-hero__badge">
              <FaHeart /> Transformative Stories
            </div>
            
            <h1 className="testimonials-hero__title">
              Voices of
              <span className="gradient-text"> Success</span>
            </h1>
            
            <p className="testimonials-hero__description">
              See what our students are saying through their real WhatsApp conversations.
              Authentic testimonials from real investors who transformed their financial futures.
            </p>
            
            <div className="testimonials-hero__stats">
              {stats.map((stat, index) => (
                <div key={index} className="testimonials-hero__stat">
                  <div className="testimonials-hero__stat-value">
                    <StatsCounter
                      endValue={stat.value}
                      duration={2000}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="testimonials-hero__stat-label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Futuristic Background Elements */}
        <div className="testimonials-hero__background">
          {/* Snow Falling Animation */}
          <div className="snow-fall">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i} 
                className="snowflake"
                style={{
                  '--size': `${Math.random() * 4 + 2}px`,
                  '--left': `${Math.random() * 100}%`,
                  '--opacity': Math.random() * 0.5 + 0.3,
                  '--duration': `${Math.random() * 15 + 10}s`,
                  '--delay': `${Math.random() * 5}s`,
                  '--sway': `${Math.random() * 100 - 50}px`
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
          
          {/* Floating Orbs */}
          <div className="hero-orb hero-orb--1"></div>
          <div className="hero-orb hero-orb--2"></div>
          <div className="hero-orb hero-orb--3"></div>
          <div className="hero-orb hero-orb--4"></div>
          
          {/* Animated Grid */}
          <div className="hero-grid"></div>
          
          {/* Floating Particles */}
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`hero-particle particle-${i + 1}`}></div>
            ))}
          </div>
          
          {/* Glowing Rings */}
          <div className="hero-ring hero-ring--1"></div>
          <div className="hero-ring hero-ring--2"></div>
          <div className="hero-ring hero-ring--3"></div>
          
          {/* Gradient Overlay */}
          <div className="hero-gradient-overlay"></div>
          
          {/* Light Beams */}
          <div className="hero-beam hero-beam--1"></div>
          <div className="hero-beam hero-beam--2"></div>
          <div className="hero-beam hero-beam--3"></div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid">
        <div className="container">
          <div className="testimonials-grid__header">
            <h2 className="testimonials-grid__title">
              Real WhatsApp Testimonials
            </h2>
            <p className="testimonials-grid__subtitle">
              Authentic conversations from our satisfied students
            </p>
            <p className="testimonials-grid__instruction">
              Click on any testimonial to view it larger
            </p>
          </div>

          <div className="testimonials-grid__content">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  hoveredCard === testimonial.id ? 'hovered' : ''
                }`}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleImageClick(testimonial.screenshot)}
              >
                <div className="testimonial-card__glow"></div>
                
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar">
                    <div className="testimonial-card__avatar-placeholder">
                      {testimonial.name.charAt(0)}
                    </div>
                    {testimonial.verified && (
                      <div className="testimonial-card__verified">
                        <BsShieldCheck />
                      </div>
                    )}
                  </div>
                  
                  <div className="testimonial-card__info">
                    <h3 className="testimonial-card__name">
                      {testimonial.name}
                    </h3>
                    <div className="testimonial-card__role">
                      {testimonial.role}
                    </div>
                    <div className="testimonial-card__company">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="testimonial-card__screenshot-container">
                  <div className="testimonial-card__screenshot-frame">
                    <img
                      src={testimonial.screenshot}
                      alt={`Testimonial from ${testimonial.name}`}
                      className="testimonial-card__screenshot"
                      loading="lazy"
                    />
                    <div className="testimonial-card__screenshot-overlay">
                      <span className="testimonial-card__view-text">
                        Click to view
                      </span>
                    </div>
                  </div>
                  
                  <div className="testimonial-card__screenshot-info">
                    <div className="testimonial-card__rating">
                      <div className="testimonial-card__stars">
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="testimonial-card__date">
                        {testimonial.date}
                      </div>
                    </div>
                    
                    <div className="testimonial-card__location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                {testimonial.achievements && testimonial.achievements.length > 0 && (
                  <div className="testimonial-card__achievements">
                    <div className="testimonial-card__achievements-title">
                      <FaAward /> Key Takeaways
                    </div>
                    <ul className="testimonial-card__achievements-list">
                      {testimonial.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="testimonial-card__achievement">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-section__header">
            <h2 className="stats-section__title">
              Impact by Numbers
            </h2>
            <p className="stats-section__subtitle">
              Quantifying transformation across our community
            </p>
          </div>

          <div className="stats-section__grid">
            <div className="stat-card">
              <div className="stat-card__icon">
                <BsCurrencyDollar />
              </div>
              <div className="stat-card__value">
                <StatsCounter endValue={95} duration={2000} suffix="%" />
              </div>
              <div className="stat-card__label">
                Student Satisfaction
              </div>
              <div className="stat-card__description">
                Rate our courses excellent
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <BsGraphUp />
              </div>
              <div className="stat-card__value">
                <StatsCounter endValue={100} duration={2000} suffix="+" />
              </div>
              <div className="stat-card__label">
                Active Students
              </div>
              <div className="stat-card__description">
                Currently enrolled in courses
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <FaShieldAlt />
              </div>
              <div className="stat-card__value">
                <StatsCounter endValue={30} duration={2000} />
              </div>
              <div className="stat-card__label">
                Day Guarantee
              </div>
              <div className="stat-card__description">
                Money-back guarantee period
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <BsPeople />
              </div>
              <div className="stat-card__value">
                <StatsCounter endValue={98} duration={2000} suffix="%" />
              </div>
              <div className="stat-card__label">
                Would Recommend
              </div>
              <div className="stat-card__description">
                Refer friends and colleagues
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated Buttons */}
      <section className="testimonials-cta">
        <div className="container">
          <div className="testimonials-cta__content">
            <div className="testimonials-cta__badge">
              <BsShieldCheck /> Trusted by 100+ Investors
            </div>
            
            <h2 className="testimonials-cta__title">
              Ready to Transform Your Financial Future?
            </h2>
            
            <p className="testimonials-cta__description">
              Join our community of successful investors. Start your journey today with our 
              proven courses and expert guidance. Your transformation begins here.
            </p>
            
            <div className="testimonials-cta__actions">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleStartLearningClick}
                className="testimonials-cta__btn"
              >
                <FaRocket /> Start Learning Now
                <FaChevronRight className="btn-icon-right" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchPreviewClick}
                className="testimonials-cta__btn"
              >
                <FaPlay /> Watch Free Preview
              </Button>
            </div>
          </div>
        </div>
        
        <div className="testimonials-cta__background">
          <div className="cta-particle cta-particle--1"></div>
          <div className="cta-particle cta-particle--2"></div>
          <div className="cta-particle cta-particle--3"></div>
          <div className="cta-particle cta-particle--4"></div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="image-modal__content" onClick={handleModalContentClick}>
            <button className="image-modal__close" onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <img 
              src={selectedImage} 
              alt="Testimonial screenshot" 
              className="image-modal__image"
            />
            <div className="image-modal__controls">
              <button className="image-modal__control-btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;