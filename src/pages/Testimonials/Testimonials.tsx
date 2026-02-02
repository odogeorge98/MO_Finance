// src/pages/Testimonials/Testimonials.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Testimonials.css';
import img from './img1.png';

// React Icons Imports
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaHeart,
  FaRocket,
  FaChevronRight,
  FaPlay,

  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaAward
} from 'react-icons/fa';
import {
  BsShieldCheck,
  BsFillCheckCircleFill,
  BsCurrencyDollar,
  BsGraphUp,
  BsPeople
} from 'react-icons/bs';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
  location: string;
  verified: boolean;
  achievements?: string[];
};

export const Testimonials: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Engr Benjamin',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'Wow! I must say these sessions were nothing short of explicit. It opened my eyes to see patterns you won\'t see randomly. Although I was nervous when it came time to make the payment. Why? I didn\'t want to fall victim to a scam. But I\'m ecstatic that I wasn\'t. And the lectures went beyond and above my expectations. Thanks immensely for your potent teachings. It\'s something I\'ll always carry the rest of my life.',
      avatar: img,
      rating: 5,
      date: 'December 15, 2025',
      location: 'Abuja, Nigeria',
      verified: true,
      achievements: [
        'Mastered investment pattern recognition',
        'Confidently managing personal portfolio',
        'Applying lessons to daily financial decisions'
      ]
    },
    {
      id: 2,
      name: 'Augustus Osunwa',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'I just finished the videos, I\'d be sending my portfolio breakdown before today\'s end. The videos are detailed enough, the duration encourages commitment too. The highlight for me was when we got to that revenue part and broke it down. I didn\'t see that part coming and its actually a key aspect in determining if a company is a good buy.',
      avatar: img,
      rating: 5,
      date: 'November 10, 2025',
      location: 'Lagos, Nigeria',
      verified: true,
      achievements: [
        'Completed comprehensive video course',
        'Preparing portfolio analysis',
        'Learned company valuation techniques'
      ]
    },
    {
      id: 3,
      name: 'Favour',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'Thank you so much Mr Moses. This session was worth every dime I spent and way much more when compared to the value I got from this session with you. You\'ve really shifted my perspective on financial intelligence/management which a lot people out there pay heavily for. I am glad I enrolled for this class.',
      avatar: img,
      rating: 5,
      date: 'January 5, 2026',
      location: 'Port Harcourt, Nigeria',
      verified: true,
      achievements: [
        'Transformed financial perspective',
        'Mastered financial intelligence principles',
        'Recognized exceptional value received'
      ]
    },
    {
      id: 4,
      name: 'James',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'Started off with the intention of "I want to make investments in the stock market" I didn\'t know where or how to start really. There was so much information online, but none was able to break it down as you have. Paying for this class, really is an investment already. Thank you so much Moses.',
      avatar: img,
      rating: 5,
      date: 'February 2, 2026',
      location: 'Calabar, Nigeria',
      verified: true,
      achievements: [
        'Found clear direction for investing',
        'Overcame information overload',
        'Made first successful investments'
      ]
    },
    {
      id: 5,
      name: 'Engr Benjamin',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'First, thanks immensely for this potent class, Moses. It really portrayed the lessons from Rich Dad, Poor Dad. The rich buy assets while the poor buy liabilities. Overall, I enjoyed how you broke every section down using analogies.',
      avatar: img,
      rating: 5,
      date: 'January 20, 2026',
      location: 'Abuja, Nigeria',
      verified: true,
      achievements: [
        'Applied Rich Dad Poor Dad principles',
        'Mastered asset vs liability concepts',
        'Understood complex concepts through analogies'
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
              Hear from our community of investors who have transformed their financial 
              futures with our cutting-edge courses and expert guidance.
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
              Real Results, Real People
            </h2>
            <p className="testimonials-grid__subtitle">
              Meet the investors who are redefining success
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
              >
                <div className="testimonial-card__glow"></div>
                
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="testimonial-card__avatar-image"
                    />
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

                <div className="testimonial-card__content">
                  <div className="testimonial-card__quote">
                    <FaQuoteLeft className="testimonial-card__quote-icon quote-left" />
                    <p className="testimonial-card__text">
                      {testimonial.content}
                    </p>
                    <FaQuoteRight className="testimonial-card__quote-icon quote-right" />
                  </div>

                  <div className="testimonial-card__rating">
                    <div className="testimonial-card__stars">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="testimonial-card__meta">
                      <span className="testimonial-card__meta-item">
                        <FaMapMarkerAlt /> {testimonial.location}
                      </span>
                      <span className="testimonial-card__meta-item">
                        <FaCalendarAlt /> {testimonial.date}
                      </span>
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
                            <BsFillCheckCircleFill /> {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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
    </div>
  );
};

export default Testimonials;