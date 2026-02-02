// src/pages/Features/Features.tsx
import React, { useState, useEffect } from 'react';
import './Features.css';

// React Icons Imports
import {
  FaRocket,
  FaVideo,
  FaEdit,
  FaPlay,
  FaCheck,
  FaChevronRight,
  FaChartLine,
  FaCloud,
  FaMobileAlt,
  FaBrain,
  FaGlobe,
  FaCrown,
  FaBolt,
  FaGem,
 
} from 'react-icons/fa';

import { MdSpeed } from 'react-icons/md';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoAnalytics, IoVideocam } from 'react-icons/io5';

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      id: 1,
      icon: <IoVideocam />,
      title: 'AI Video Production',
      description: 'Create professional videos with AI-powered editing and effects',
      benefits: ['Auto-editing', 'Smart cuts', 'Color grading', 'Audio enhancement'],
      color: '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff, #0095ff)'
    },
    {
      id: 2,
      icon: <FaBrain />,
      title: 'Content Intelligence',
      description: 'AI analyzes your content to optimize engagement and reach',
      benefits: ['Trend analysis', 'SEO optimization', 'Audience insights', 'Performance predictions'],
      color: '#00ff88',
      gradient: 'linear-gradient(135deg, #00ff88, #00cc66)'
    },
    {
      id: 3,
      icon: <FaCloud />,
      title: 'Cloud Studio',
      description: 'Edit and publish from anywhere with cloud-based tools',
      benefits: ['Browser-based editing', 'Auto-sync', 'Team collaboration', 'Version history'],
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
    },
    {
      id: 4,
      icon: <FaMobileAlt />,
      title: 'Mobile Creator',
      description: 'Full editing suite optimized for mobile creators',
      benefits: ['Mobile-first design', 'Offline editing', 'Quick export', 'Social integration'],
      color: '#ff0080',
      gradient: 'linear-gradient(135deg, #ff0080, #cc0066)'
    }
  ];

  const creatorFeatures = [
    {
      id: 1,
      icon: <FaVideo />,
      title: 'Smart Recording',
      description: 'AI-powered camera that adjusts lighting, framing, and focus automatically',
      stat: '95% Perfect Takes'
    },
    {
      id: 2,
      icon: <FaEdit />,
      title: 'One-Click Editing',
      description: 'Automatically edit videos with professional transitions and effects',
      stat: 'Save 80% Time'
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: 'Performance Analytics',
      description: 'Track engagement and optimize content with real-time insights',
      stat: '2x More Views'
    },
    {
      id: 4,
      icon: <FaGlobe />,
      title: 'Global Distribution',
      description: 'Publish simultaneously across all major platforms',
      stat: '10+ Platforms'
    }
  ];

  const techFeatures = [
    {
      title: 'AI Video Processing',
      icon: <GiArtificialIntelligence />,
      description: 'Real-time AI enhancement of video and audio quality',
      color: '#00d4ff'
    },
    {
      title: 'Cloud Rendering',
      icon: <FaCloud />,
      description: 'High-speed rendering in the cloud for instant exports',
      color: '#8b5cf6'
    },
    {
      title: 'Smart Compression',
      icon: <MdSpeed />,
      description: 'Optimize video size without quality loss',
      color: '#00ff88'
    },
    {
      title: 'Analytics Engine',
      icon: <IoAnalytics />,
      description: 'Real-time insights on viewer engagement',
      color: '#ff0080'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <div className="features-page">
      {/* Animated Background */}
      <div className="features-bg-grid"></div>
      <div className="features-orb orb-1"></div>
      <div className="features-orb orb-2"></div>
      <div className="features-orb orb-3"></div>

      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaRocket />
              <span>The Future of Content Creation</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-line">Create</span>
              <span className="title-line">Amazing Videos</span>
              <span className="title-highlight">with AI</span>
            </h1>
            
            <p className="hero-description">
              Everything you need to produce, edit, and publish professional videos.
              Built for solo creators who want to make an impact.
            </p>

            <div className="hero-cta">
              <button className="cta-button primary">
                <FaRocket />
                <span>Start Creating Free</span>
                <FaChevronRight />
              </button>
              <button className="cta-button secondary">
                <FaPlay />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">99%</div>
                <div className="stat-label">Less Editing Time</div>
              </div>
              <div className="stat">
                <div className="stat-value">2.5x</div>
                <div className="stat-label">More Engagement</div>
              </div>
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Videos Created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="core-features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">AI-Powered Creator Tools</h2>
            <p className="section-subtitle">Everything you need to create amazing content, all in one place</p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                onClick={() => setActiveFeature(feature.id)}
                style={{
                  '--card-color': feature.color,
                  '--mouse-x': mousePosition.x,
                  '--mouse-y': mousePosition.y
                } as React.CSSProperties}
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="card-icon" style={{ background: feature.gradient }}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                  <div className="card-benefits">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="benefit">
                        <FaBolt />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Detail */}
      <section className="feature-detail-section">
        <div className="container">
          <div className="detail-card">
            <div className="detail-header">
              <div className="detail-icon" style={{ background: activeFeatureData.gradient }}>
                {activeFeatureData.icon}
              </div>
              <div className="detail-title-content">
                <h3>{activeFeatureData.title}</h3>
                <p>{activeFeatureData.description}</p>
              </div>
            </div>

            <div className="detail-demo">
              <div className="demo-video">
                <div className="video-placeholder">
                  <FaPlay className="play-icon" />
                  <div className="video-overlay">
                    <div className="overlay-text">
                      <h4>See It In Action</h4>
                      <p>Watch how {activeFeatureData.title.toLowerCase()} transforms your workflow</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="demo-features">
                <h4>Key Benefits</h4>
                {activeFeatureData.benefits.map((benefit, index) => (
                  <div key={index} className="demo-feature">
                    <div className="feature-check">
                      <FaCheck />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Workflow */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Designed for Creators</h2>
            <p className="section-subtitle">Streamlined workflow from concept to publish</p>
          </div>

          <div className="workflow-cards">
            {creatorFeatures.map((feature, index) => (
              <div key={feature.id} className="workflow-card">
                <div className="workflow-step">Step {index + 1}</div>
                <div className="workflow-icon">
                  {feature.icon}
                  <div className="icon-ring"></div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="workflow-stat">
                  <FaGem />
                  <span>{feature.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Built with Cutting-Edge Tech</h2>
            <p className="section-subtitle">Powering the future of video creation</p>
          </div>

          <div className="tech-grid">
            {techFeatures.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon" style={{ color: tech.color }}>
                  {tech.icon}
                  <div className="tech-glow" style={{ backgroundColor: tech.color }}></div>
                </div>
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <div className="tech-tags">
                  <span className="tech-tag">AI</span>
                  <span className="tech-tag">Cloud</span>
                  <span className="tech-tag">Real-time</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <FaCrown />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="cta-title">Start Creating Today</h2>
            <p className="cta-description">
              Join thousands of creators who are already making amazing videos.
              No experience needed. Just your creativity and our AI.
            </p>

            <div className="cta-features">
              <div className="cta-feature">
                <FaCheck />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <FaCheck />
                <span>7-day free trial</span>
              </div>
              <div className="cta-feature">
                <FaCheck />
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="cta-button primary large">
                <FaRocket />
                <span>Get Started Free</span>
                <FaChevronRight />
              </button>
              <button className="cta-button outline">
                <FaPlay />
                <span>Watch Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="cta-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Mouse Follower */}
      <div 
        className="mouse-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      ></div>
    </div>
  );
};

export default Features;