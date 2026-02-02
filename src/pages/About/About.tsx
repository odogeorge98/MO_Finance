// src/pages/About/About.tsx
import React, { useState } from 'react';
import './About.css';
import img from './moses.jpg';
// React Icons Imports
import {
    FaRocket,
    FaVideo,
    FaPlay,
    FaCheck,
    FaChevronRight,
    FaUsers,
    FaChartLine,
    FaGlobe,
    FaStar,
    FaQuoteLeft,
    FaQuoteRight,
    FaLightbulb,
    FaCrown,
    FaBolt,
    FaChartBar,
    FaUserTie,
    FaGraduationCap,
    FaShieldAlt,
    FaLock,
    FaChartPie,
    FaBuilding,
    FaDollarSign,
    FaShoppingCart,
    FaMobileAlt,
    FaSearch,
    FaWallet,
    FaBalanceScale,
    FaDatabase
} from 'react-icons/fa';
import {
    BsLightning,
} from 'react-icons/bs';
// import { MdAttachMoney } from 'react-icons/md';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoRocketSharp } from 'react-icons/io5';

export const About: React.FC = () => {
    const [activeYear, setActiveYear] = useState<number>(2023);

    const timeline = [
        // {
        //     year: 2020,
        //     title: 'The Beginning',
        //     description: 'Started creating investment education videos to share market insights',
        //     icon: <GiTakeMyMoney />
        // },
        // {
        //     year: 2021,
        //     title: 'First Premium Course',
        //     description: 'Launched first paid course on stock market fundamentals',
        //     icon: <MdAttachMoney />
        // },
        {
            year: 2022,
            title: 'Platform Launch',
            description: 'Built dedicated platform for investment education videos',
            icon: <GiArtificialIntelligence />
        },
        {
            year: 2023,
            title: 'Global Expansion',
            description: 'Expanded to serve investors in 50+ countries worldwide',
            icon: <FaGlobe />
        },
        {
            year: 2024,
            title: 'Advanced Features',
            description: 'Added live market analysis and portfolio tracking tools',
            icon: <BsLightning />
        }
    ];

    const stats = [
        {
            value: 50,
            label: 'Countries',
            suffix: '+',
            icon: <FaGlobe />
        },
        {
            value: 10,
            label: 'Thousand Students',
            suffix: 'K+',
            icon: <FaUsers />
        },
        {
            value: 200,
            label: 'Hours of Content',
            suffix: '+',
            icon: <FaVideo />
        },
        {
            value: 98,
            label: 'Satisfaction Rate',
            suffix: '%',
            icon: <FaStar />
        }
    ];

    const values = [
        {
            id: 1,
            icon: <FaLightbulb />,
            title: 'Education First',
            description: 'Providing actionable investment knowledge that works',
            color: '#00d4ff'
        },
        {
            id: 2,
            icon: <FaShieldAlt />,
            title: 'Trust & Security',
            description: 'Secure platform with verified investment strategies',
            color: '#00ff88'
        },
        {
            id: 3,
            icon: <FaChartLine />,
            title: 'Market Excellence',
            description: 'Teaching proven strategies backed by market data',
            color: '#ff0080'
        }
    ];

    const features = [
        {
            icon: <FaVideo className="feature-icon-svg" />,
            title: 'Premium Video Courses',
            description: 'In-depth video lessons on stock market investing',
            stat: '200+ Hours',
            color: '#00d4ff'
        },
        {
            icon: <FaChartBar className="feature-icon-svg" />,
            title: 'Live Market Analysis',
            description: 'Real-time market insights and analysis',
            stat: 'Daily Updates',
            color: '#00ff88'
        },
        {
            icon: <FaChartPie className="feature-icon-svg" />,
            title: 'Portfolio Strategies',
            description: 'Proven strategies for building wealth',
            stat: '10+ Strategies',
            color: '#ff0080'
        },
        {
            icon: <FaLock className="feature-icon-svg" />,
            title: 'Secure Access',
            description: 'Protected content for paid members only',
            stat: 'Bank-Level Security',
            color: '#8b5cf6'
        }
    ];

    const sessionGains = [
        {
            icon: <FaDollarSign />,
            title: 'Basics of Personal Finance',
            description: 'Master budgeting, saving, and financial planning fundamentals'
        },
        {
            icon: <FaBuilding />,
            title: 'What the Stock Market is all about',
            description: 'Understand market mechanics and how it functions'
        },
        {
            icon: <FaChartLine />,
            title: 'How wealth is made in the Stock Market',
            description: 'Learn the principles of wealth creation through investing'
        },
        {
            icon: <FaDatabase />,
            title: 'Types of "Product" in the Market',
            description: 'Explore stocks, bonds, ETFs, and other investment vehicles'
        },
        {
            icon: <FaMobileAlt />,
            title: 'Which App to buy and sell on',
            description: 'Discover the best trading platforms for beginners and pros'
        },
        {
            icon: <FaShoppingCart />,
            title: 'How to buy and sell on these apps',
            description: 'Step-by-step guide to executing trades successfully'
        },
        {
            icon: <FaSearch />,
            title: 'How to spot a good Company using the "ETF" method',
            description: 'Learn ETF analysis techniques for company evaluation'
        },
        {
            icon: <FaWallet />,
            title: 'How to build an Optimized Portfolio',
            description: 'Create diversified portfolios for maximum returns'
        },
        {
            icon: <FaBalanceScale />,
            title: 'Risk Management',
            description: 'Protect your investments with proven risk strategies'
        }
    ];

    const activeMilestone = timeline.find(m => m.year === activeYear) || timeline[timeline.length - 1];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <FaLightbulb />
                            <span>Investment Education Platform</span>
                        </div>

                        <h1 className="hero-title">
                            <span className="title-line">Master the</span>
                            <span className="title-line">Stock Market</span>
                            <span className="title-highlight">with Expert Videos</span>
                        </h1>

                        <p className="hero-description">
                            Premium video courses that teach you how to invest in stocks,
                            analyze companies, and build wealth through proven strategies.
                            Access exclusive content when you subscribe.
                        </p>

                        <div className="hero-cta">
                            <button className="cta-button primary">
                                <FaPlay />
                                <span>View Course Preview</span>
                                <FaChevronRight />
                            </button>
                            <button className="cta-button secondary">
                                <FaChartLine />
                                <span>Explore Courses</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Background Elements */}
                <div className="hero-background">
                    {/* Snow Falling Animation */}
                    <div className="snow-fall">
                        {[...Array(80)].map((_, i) => (
                            <div 
                                key={i} 
                                className="snowflake"
                                style={{
                                    '--size': `${Math.random() * 3 + 1}px`,
                                    '--left': `${Math.random() * 100}%`,
                                    '--opacity': Math.random() * 0.3 + 0.2,
                                    '--duration': `${Math.random() * 10 + 8}s`,
                                    '--delay': `${Math.random() * 5}s`,
                                    '--sway': `${Math.random() * 80 - 40}px`
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
                    
                    {/* Glowing Rings */}
                    <div className="hero-ring hero-ring--1"></div>
                    <div className="hero-ring hero-ring--2"></div>
                    <div className="hero-ring hero-ring--3"></div>
                    
                    {/* Gradient Overlay */}
                    <div className="hero-gradient-overlay"></div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-section">
                <div className="container">
                    <div className="mission-cards">
                        <div className="mission-card">
                            <div className="card-icon">
                                <IoRocketSharp />
                            </div>
                            <h2>Our Mission</h2>
                            <p>
                                To democratize investment education by making professional
                                stock market knowledge accessible through premium video courses.
                                We help you invest wisely and build lasting wealth.
                            </p>
                            <div className="mission-quote">
                                <FaQuoteLeft />
                                <span>Invest in Knowledge</span>
                                <FaQuoteRight />
                            </div>
                        </div>

                        <div className="vision-card">
                            <div className="card-icon">
                                <FaLightbulb />
                            </div>
                            <h2>Our Vision</h2>
                            <p>
                                A world where everyone can access quality investment education,
                                make informed financial decisions, and achieve financial freedom
                                through smart investing in the stock market.
                            </p>
                            <div className="vision-quote">
                                <FaQuoteLeft />
                                <span>Financial Freedom for All</span>
                                <FaQuoteRight />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-value">
                                    {stat.value}
                                    <span className="stat-suffix">{stat.suffix}</span>
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Journey</h2>
                        <p>From stock market insights to premium education platform</p>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-years">
                            {timeline.map((item) => (
                                <button
                                    key={item.year}
                                    className={`year-button ${activeYear === item.year ? 'active' : ''}`}
                                    onClick={() => setActiveYear(item.year)}
                                >
                                    {item.year}
                                </button>
                            ))}
                        </div>

                        <div className="timeline-detail">
                            <div className="detail-card">
                                <div className="detail-icon">{activeMilestone.icon}</div>
                                <div className="detail-content">
                                    <h3>
                                        {activeMilestone.year}: {activeMilestone.title}
                                    </h3>
                                    <p>{activeMilestone.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Values</h2>
                        <p>The principles guiding our investment education</p>
                    </div>

                    <div className="values-grid">
                        {values.map((value) => (
                            <div
                                key={value.id}
                                className="value-card"
                                style={{ '--value-color': value.color } as React.CSSProperties}
                            >
                                <div className="value-icon" style={{ color: value.color }}>
                                    {value.icon}
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>What You Get</h2>
                        <p>Premium investment education features</p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="feature-card"
                                style={{ '--feature-color': feature.color } as React.CSSProperties}
                            >
                                <div className="feature-icon" style={{ color: feature.color }}>
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <div className="feature-stat" style={{ color: feature.color }}>
                                    <FaBolt />
                                    <span>{feature.stat}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What You Gain Section */}
            <section className="session-gain-section">
                <div className="container">
                    <div className="section-header">
                        <h2>What You Gain from the Session</h2>
                        <p>Comprehensive investment education covering all essential topics</p>
                    </div>

                    <div className="gains-grid">
                        {sessionGains.map((gain, index) => (
                            <div key={index} className="gain-card">
                                <div className="gain-icon" style={{ 
                                    '--index': index,
                                    animationDelay: `${index * 0.1}s`
                                } as React.CSSProperties}>
                                    {gain.icon}
                                </div>
                                <h3>{gain.title}</h3>
                                <p>{gain.description}</p>
                                <div className="gain-number">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder's Story */}
            <section className="story-section">
                <div className="container">
                    <div className="story-card">
                        <div className="story-content">
                            <div className="story-badge">
                                <FaUserTie />
                                <span>From Investor to Educator</span>
                            </div>
                            <h2>5+ Years of Market Experience</h2>
                            <p>
                              With over 5+ experience in investing I have built a portfolio that has returned about 181% return on investement. That is to say if you had invested N1m , you would have 2.81m today. I started out seeking for knowledge and today I am more than glad to share that knowledge with you. I created this platform to share my journey with you and also to take you on your own wealth building journey too. Everything I teach is based on real time experience and it is designed to make you succeed.  
                            </p>
                            <div className="founder-info">
                                <div className="founder-avatar">
                                    <img
                                        src={img}
                                        alt="Moses Mfon Udofia - Founder & Investment Educator"
                                        className="founder-avatar-image"
                                    />
                                    <div className="avatar-badge">
                                        <FaGraduationCap />
                                    </div>
                                </div>
                                <div className="founder-details">
                                    <h4>Moses Mfon Udofia</h4>
                                    <p>Founder & Investment Educator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <div className="container">
                    <div className="cta-content">
                        <div className="cta-badge">
                            <FaCrown />
                            <span>Start Your Investment Journey</span>
                        </div>

                        <h2>Access Premium Investment Videos</h2>
                        <p>
                            Join thousands of successful investors learning how to master the stock market.
                            Subscribe to access all premium video courses and start building wealth today.
                        </p>

                        <div className="cta-features">
                            <div className="cta-feature">
                                <FaCheck />
                                <span>Secure payment access</span>
                            </div>
                            <div className="cta-feature">
                                <FaCheck />
                                <span>7-day premium trial</span>
                            </div>
                            <div className="cta-feature">
                                <FaCheck />
                                <span>Cancel anytime</span>
                            </div>
                        </div>

                        <div className="cta-buttons">
                            <button className="cta-button primary large">
                                <FaRocket />
                                <span>Start Premium Trial</span>
                                <FaChevronRight />
                            </button>
                            <button className="cta-button outline">
                                <FaPlay />
                                <span>Watch Free Preview</span>
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
        </div>
    );
};

export default About;