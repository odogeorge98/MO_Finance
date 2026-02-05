// src/pages/Home/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Home.css';

// Import testimonial images
import testimonial1 from './tes1.jpeg';
import testimonial2 from './tes2.jpeg';
import testimonial3 from './tes3.jpeg';
import img2 from './img2.png';
import heroImage from './hero.png';

// React Icons Imports
import {
  FaPlay,
  FaBookOpen,
  FaRocket,
  FaBullseye,
  FaChalkboardTeacher,
  FaMobileAlt,
  FaSyncAlt,
  FaHandshake,
  FaClock,
  FaStar,
  FaRegStar,
  FaCheck,
  FaChevronRight,
  FaGift,
  FaTimes,
  FaWhatsapp,
  FaCopy,
  FaChevronLeft,
  FaCreditCard,
  FaUniversity,
  FaPhoneAlt,
  FaUsers,
  FaSearch,
  FaBolt,
  FaCalendarAlt,
  FaFire,
  FaDollarSign,
  FaBitcoin,
  FaEthereum,
  FaUserTie,
  FaUserFriends,
  FaVideo as FaVideoIcon,
  FaChartLine
} from 'react-icons/fa';
import {
  BsShieldCheck,
  BsCheckCircleFill,
  BsArrowRight,
  BsPlayCircle
} from 'react-icons/bs';
import {
  GiTeacher,
  GiCash,
  GiGoldBar
} from 'react-icons/gi';
import {
  MdOutlineWorkspacePremium
} from 'react-icons/md';
import {
  IoDiamond
} from 'react-icons/io5';

type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
};

type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  thumbnail: string;
  instructor: string;
  rating: number;
  category: string;
  students: number;
  priceInNaira: number;
  modules?: number;
  isFeatured?: boolean;
  icon?: React.ReactNode;
  videoId?: string;
  tags?: string[];
  format?: string;
  sessionDays?: number;
  sessionHours?: number;
  totalHours?: number;
  totalVideos?: number;
  features?: string[];
  priceDetails?: {
    naira: string;
    usd: string;
  };
};

type Feature = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  screenshot: string;
  rating: number;
  location: string;
  date: string;
  verified: boolean;
  achievements?: string[];
};

interface PaymentDetails {
  accountNumber: string;
  bankName: string;
  accountName: string;
  whatsappContact: string;
}

export const Home: React.FC = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [carouselStep, setCarouselStep] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Payment details
  const paymentDetails: PaymentDetails = {
    accountNumber: '0120554442',
    bankName: 'Sterling Bank',
    accountName: 'Moses Udofia',
    whatsappContact: '+2348103935041'
  };

  // Conversion rate (approximate)
  const ngnToUsd = 0.0007;

  const formatPrice = (priceInNaira: number) => {
    const priceInUsd = priceInNaira * ngnToUsd;
    return {
      naira: `₦${priceInNaira.toLocaleString()}`,
      usd: `$${priceInUsd.toFixed(2)} USD`
    };
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const statsData: Stat[] = [
    { 
      value: 3, 
      label: 'Courses', 
      suffix: '+',
      icon: <MdOutlineWorkspacePremium />
    },
    { 
      value: 12, 
      label: 'Hours of Content', 
      suffix: 'h+',
      icon: <FaClock />
    },
     { 
      value: 12, 
      label: 'Hours of Content', 
      suffix: 'h+',
      icon: <FaClock />
    },
  ];

  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Personalized Training Session',
      description: 'Live one-on-one session with expert guidance. Perfect for focused learning and personalized feedback.',
      duration: 180,
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.9,
      category: 'One-on-One',
      students: 156,
      priceInNaira: 20000,
      modules: 4,
      isFeatured: true,
      icon: <FaUserTie />,
      videoId: 'personalized-training',
      tags: ['Live Session', 'Personalized', 'Expert Feedback', 'Real-time'],
      format: 'Live One-on-One',
      sessionDays: 2,
      sessionHours: 1.5,
      totalHours: 3,
      priceDetails: formatPrice(20000)
    },
    {
      id: '2',
      title: 'Structured Group Training',
      description: 'Collaborative learning environment for groups of 5. Share insights and learn together.',
      duration: 180,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.8,
      category: 'Group Training',
      students: 287,
      priceInNaira: 15000,
      modules: 4,
      isFeatured: true,
      icon: <FaUserFriends />,
      videoId: 'group-training',
      tags: ['Group Learning', 'Collaborative', 'Cost-Effective', 'Team Building'],
      format: 'Group (5 People)',
      sessionDays: 2,
      sessionHours: 1.5,
      totalHours: 3,
      priceDetails: formatPrice(15000)
    },
    {
      id: '3',
      title: 'Prerecorded Training Sessions',
      description: 'Comprehensive video library for self-paced learning. Access anytime, anywhere.',
      duration: 120,
      difficulty: 'Beginner',
      thumbnail: img2,
      instructor: 'Moses Mfon Udofia',
      rating: 4.7,
      category: 'Self-Paced',
      students: 415,
      priceInNaira: 10000,
      modules: 6,
      isFeatured: true,
      icon: <FaVideoIcon />,
      videoId: 'prerecorded-training',
      tags: ['Self-Paced', 'Lifetime Access', 'Flexible Learning', 'Video Library'],
      format: 'Prerecorded Videos',
      totalVideos: 6,
      totalHours: 2,
      priceDetails: formatPrice(10000)
    }
  ];

  const features: Feature[] = [
    {
      id: 1,
      icon: <FaRocket />,
      title: 'Basics of Personal Finance',
      description: 'Learn budgeting, saving, and money management fundamentals to build a solid financial foundation.',
      color: '#6366f1',
    },
    {
      id: 2,
      icon: <FaBullseye />,
      title: 'Understanding Stock Market',
      description: 'Discover how the stock market works, its key players, and its impact on the global economy.',
      color: '#06b6d4',
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher />,
      title: 'Wealth Creation Strategies',
      description: 'Master proven investment strategies that successful investors use to build long-term wealth.',
      color: '#8b5cf6',
    },
    {
      id: 4,
      icon: <FaMobileAlt />,
      title: 'Best Trading Platforms',
      description: 'Compare top trading apps and platforms to find the perfect one for your investment style.',
      color: '#10b981',
    },
    {
      id: 5,
      icon: <FaSyncAlt />,
      title: 'Market Products Guide',
      description: 'Understand stocks, bonds, ETFs, mutual funds, and other investment vehicles available.',
      color: '#f59e0b',
    },
    {
      id: 6,
      icon: <FaHandshake />,
      title: 'Trading Execution',
      description: 'Step-by-step guide to buying, selling, and managing your investments on trading platforms.',
      color: '#ef4444',
    },
  ];

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
      achievements: []
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
      achievements: []
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
      achievements: []
    },
  ];

  // Render star rating component
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star-icon">
        {index < Math.floor(rating) ? (
          <FaStar className="star-filled" />
        ) : (
          <FaRegStar className="star-empty" />
        )}
      </span>
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '#00ff88';
      case 'intermediate':
        return '#00d4ff';
      case 'advanced':
        return '#ff0080';
      default:
        return '#6b7280';
    }
  };

  const handleWatchPreview = () => {
    window.open('https://youtube.com/@mosesmfonudofia?si=Nob6BWPBX82xVwwo', '_blank', 'noopener,noreferrer');
  };

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setCarouselStep(0);
    setShowPaymentModal(true);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleWhatsAppRedirect = () => {
    if (!selectedCourse) return;

    const message = `Hello! I've just made payment for the "${selectedCourse?.title}" course. Here are my details:\n\n- Name: [Your Name]\n- Email: [Your Email]\n- Transaction ID: [Your Transaction ID]\n\nPlease find the payment screenshot attached.`;
    const whatsappUrl = `https://wa.me/${paymentDetails.whatsappContact.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePlayPreview = (courseId: string) => {
    alert(`Playing preview for course: ${courseId}`);
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

  useEffect(() => {
    // Trigger hero animations
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 100);

    // Add scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    // Handle modal scroll
    if (showPaymentModal || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentModal, selectedImage]);

  const renderPaymentModal = () => {
    if (!showPaymentModal || !selectedCourse) return null;

    const carouselSteps = [
      // Step 0: Payment Instructions
      {
        title: 'Complete Your Enrollment',
        subtitle: 'Follow these steps to secure your spot',
        content: (
          <div className="payment-instructions">
            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Make Payment</h4>
                <p>Transfer the exact amount to the account details provided in the next step</p>
              </div>
            </div>
            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Save Screenshot</h4>
                <p>Take a screenshot of your successful payment confirmation</p>
              </div>
            </div>
            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Verify Payment</h4>
                <p>Send the screenshot to our WhatsApp for verification and course access</p>
              </div>
            </div>
            <div className="course-summary">
              <h4>Course Summary</h4>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Course:</span>
                  <strong>{selectedCourse.title}</strong>
                </div>
                <div className="summary-item">
                  <span>Amount:</span>
                  <strong className="price-highlight">{selectedCourse.priceDetails?.naira}</strong>
                </div>
                <div className="summary-item">
                  <span>Format:</span>
                  <span>{selectedCourse.format}</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      // Step 1: Account Details
      {
        title: 'Bank Account Details',
        subtitle: 'Transfer the exact amount to this account',
        content: (
          <div className="account-details">
            <div className="account-header">
              <div className="account-icon">
                <FaUniversity />
              </div>
              <div className="account-title">
                <h4>Bank Information</h4>
                <p>Use these details to complete your payment</p>
              </div>
            </div>

            <div className="account-info-container">
              <div className="account-info-card">
                <div className="account-info-row">
                  <div className="account-info-label">
                    <span className="label-text">Account Number</span>
                  </div>
                  <div className="account-info-value">
                    <div className="value-display">
                      <div className="value-text unbreakable-text">
                        {paymentDetails.accountNumber}
                      </div>
                      <div className="copy-action">
                        <button
                          className="copy-button-large"
                          onClick={() => copyToClipboard(paymentDetails.accountNumber, 'accountNumber')}
                          title="Copy Account Number"
                        >
                          {copiedField === 'accountNumber' ? (
                            <>
                              <FaCheck className="copy-icon" />
                              <span className="copy-text">Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy className="copy-icon" />
                              <span className="copy-text">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="account-info-row">
                  <div className="account-info-label">
                    <span className="label-text">Bank Name</span>
                  </div>
                  <div className="account-info-value">
                    <div className="value-display">
                      <div className="value-text unbreakable-text">
                        {paymentDetails.bankName}
                      </div>
                      <div className="copy-action">
                        <button
                          className="copy-button-large"
                          onClick={() => copyToClipboard(paymentDetails.bankName, 'bankName')}
                          title="Copy Bank Name"
                        >
                          {copiedField === 'bankName' ? (
                            <>
                              <FaCheck className="copy-icon" />
                              <span className="copy-text">Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy className="copy-icon" />
                              <span className="copy-text">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="account-info-row">
                  <div className="account-info-label">
                    <span className="label-text">Account Name</span>
                  </div>
                  <div className="account-info-value">
                    <div className="value-display">
                      <div className="value-text unbreakable-text">
                        {paymentDetails.accountName}
                      </div>
                      <div className="copy-action">
                        <button
                          className="copy-button-large"
                          onClick={() => copyToClipboard(paymentDetails.accountName, 'accountName')}
                          title="Copy Account Name"
                        >
                          {copiedField === 'accountName' ? (
                            <>
                              <FaCheck className="copy-icon" />
                              <span className="copy-text">Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy className="copy-icon" />
                              <span className="copy-text">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-amount-full">
                <div className="amount-header">
                  <FaCreditCard className="amount-icon-large" />
                  <div className="amount-title">
                    <h5>Amount to Pay</h5>
                    <p>Transfer the exact amount shown below</p>
                  </div>
                </div>
                <div className="amount-display">
                  <div className="naira-amount-large">{selectedCourse.priceDetails?.naira}</div>
                  <div className="usd-amount-large">{selectedCourse.priceDetails?.usd}</div>
                </div>
              </div>

              <div className="payment-instructions-card">
                <div className="instructions-header">
                  <BsCheckCircleFill className="instructions-icon" />
                  <h5>Payment Instructions</h5>
                </div>
                <div className="instructions-list">
                  <div className="instruction-item">
                    <div className="instruction-number">1</div>
                    <div className="instruction-content">
                      Transfer <strong>exactly {selectedCourse.priceDetails?.naira}</strong> to the account above
                    </div>
                  </div>
                  <div className="instruction-item">
                    <div className="instruction-number">2</div>
                    <div className="instruction-content">
                      Save your <strong>payment confirmation screenshot</strong>
                    </div>
                  </div>
                  <div className="instruction-item">
                    <div className="instruction-number">3</div>
                    <div className="instruction-content">
                      Proceed to the next step after payment is completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      // Step 2: WhatsApp Verification
      {
        title: 'Verify Payment',
        subtitle: 'Send payment screenshot to WhatsApp for course access',
        content: (
          <div className="verification-step">
            <div className="verification-card">
              <div className="verification-icon">
                <FaWhatsapp />
              </div>
              <div className="verification-content">
                <h4>WhatsApp Verification</h4>
                <p className="verification-description">
                  Once payment is made, send the screenshot to our WhatsApp number for verification.
                  We'll confirm your payment and grant you immediate access to the course.
                </p>

                <div className="whatsapp-details-full">
                  <div className="whatsapp-card">
                    <div className="whatsapp-header">
                      <FaPhoneAlt className="whatsapp-icon-large" />
                      <div className="whatsapp-title">
                        <h5>WhatsApp Contact</h5>
                        <p>Send payment screenshot to this number</p>
                      </div>
                    </div>
                    <div className="whatsapp-number-display">
                      <div className="whatsapp-number-text unbreakable-text">
                        {paymentDetails.whatsappContact}
                      </div>
                      <button
                        className="copy-button-large"
                        onClick={() => copyToClipboard(paymentDetails.whatsappContact, 'whatsapp')}
                        title="Copy WhatsApp Number"
                      >
                        {copiedField === 'whatsapp' ? (
                          <>
                            <FaCheck className="copy-icon" />
                            <span className="copy-text">Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy className="copy-icon" />
                            <span className="copy-text">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="verification-steps">
                  <h5>What to include in your message:</h5>
                  <div className="verification-items">
                    <div className="verification-item">
                      <div className="verification-bullet">📸</div>
                      <div className="verification-text">Screenshot of successful payment</div>
                    </div>
                    <div className="verification-item">
                      <div className="verification-bullet">👤</div>
                      <div className="verification-text">Your full name</div>
                    </div>
                    <div className="verification-item">
                      <div className="verification-bullet">📧</div>
                      <div className="verification-text">Email address</div>
                    </div>
                    <div className="verification-item">
                      <div className="verification-bullet">🎓</div>
                      <div className="verification-text">Course name: <strong>{selectedCourse.title}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ];

    const nextStep = () => {
      if (carouselStep < carouselSteps.length - 1) {
        setCarouselStep(carouselStep + 1);
      }
    };

    const prevStep = () => {
      if (carouselStep > 0) {
        setCarouselStep(carouselStep - 1);
      }
    };

    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          <div className="modal-header">
            <div className="modal-title-section">
              <h3 className="modal-title">{carouselSteps[carouselStep].title}</h3>
              <p className="modal-subtitle">{carouselSteps[carouselStep].subtitle}</p>
            </div>
            <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((carouselStep + 1) / carouselSteps.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              {carouselSteps.map((_, index) => (
                <div
                  key={index}
                  className={`progress-step ${index <= carouselStep ? 'active' : ''}`}
                >
                  <div className="step-dot"></div>
                  <span className="step-label">Step {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-content">
            {carouselSteps[carouselStep].content}
          </div>

          <div className="modal-footer">
            {carouselStep > 0 && (
              <button className="modal-button secondary" onClick={prevStep}>
                <FaChevronLeft />
                <span>Back</span>
              </button>
            )}

            {carouselStep < carouselSteps.length - 1 ? (
              <button className="modal-button primary" onClick={nextStep}>
                <span>Continue</span>
                <BsArrowRight />
              </button>
            ) : (
              <button className="modal-button whatsapp" onClick={handleWhatsAppRedirect}>
                <FaWhatsapp />
                <span>Send Screenshot via WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      {/* Home Hero Section */}
      <section ref={heroRef} className={`home-hero ${isHeroLoaded ? 'home-hero--loaded' : ''}`}>
        <div className="container">
          <div className="home-hero-grid">
            {/* Hero Image - First on mobile */}
            <div className="home-hero-image-container">
              <div className="home-hero-image-wrapper">
                <img 
                  src={heroImage} 
                  alt="Master Financial Markets" 
                  className="home-hero-image"
                  loading="eager"
                />
                <div className="home-hero-image-glow"></div>
                <div className="home-hero-image-shape shape-1"></div>
                <div className="home-hero-image-shape shape-2"></div>
                <div className="home-hero-image-shape shape-3"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="home-hero-content">
              <h1 className="home-hero-title">
                <span className="home-title-line">Personal Finance</span>
                <span className="home-title-line">Stock Market</span>
              </h1>

              <p className="home-hero-description">
               Tired of consistently making money? Are you ready to make your money work for you? If that is the case you came to the right source
              </p>

              {/* Hero CTA Buttons - Updated with proper navigation */}
              <div className="home-hero-actions">
                <button
                  className="home-hero-cta-primary"
                  onClick={handleWatchPreview}
                >
                  <span className="home-hero-action-icon">
                    <FaPlay />
                  </span>
                  View Course Preview
                  <FaChevronRight />
                </button>
                <button 
                  className="home-hero-cta-secondary"
                  onClick={() => navigate('/courses')}
                >
                  <span className="home-hero-action-icon">
                    <FaChartLine />
                  </span>
                  Explore Courses
                </button>
              </div>

              {/* Hero Stats */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className="stats__item animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stats__icon-wrapper">
                  <div className="stats__icon">
                    {stat.icon}
                  </div>
                </div>
                <div className="stats__value">
                  <StatsCounter
                    endValue={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <div className="grid-header">
            <div className="header-left">
              <h2 className="grid-title">
                <span className="title-text">Training Programs</span>
                <div className="title-line"></div>
              </h2>
              <p className="grid-subtitle">Choose the learning style that matches your goals and schedule</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <div className="stat-content">
                  <span className="stat-value">{allCourses.length}</span>
                  <span className="stat-label">Programs</span>
                </div>
                <div className="stat-icon"><FaBolt /></div>
              </div>
              <div className="stat">
                <div className="stat-content">
                  <span className="stat-value">{allCourses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}+</span>
                  <span className="stat-label">Students Trained</span>
                </div>
                <div className="stat-icon"><FaUsers /></div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="course-grid">
            {allCourses.map((course, index) => (
              <div
                key={course.id}
                className={`course-card ${hoveredCard === course.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  ['--mouse-x' as any]: `${mousePosition.x}px`, 
                  ['--mouse-y' as any]: `${mousePosition.y}px` 
                } as React.CSSProperties}
              >
                {/* Card Glow Effect */}
                <div className="card-glow"></div>

                {/* Card Header with Video Preview */}
                <div className="card-header">
                  <div className="card-badges">
                    {course.isFeatured && (
                      <div className="badge featured">
                        <FaFire />
                      </div>
                    )}
                    <div className="badge category">
                      {course.icon}
                      <span>{course.category}</span>
                    </div>
                  </div>

                  {/* Video Container */}
                  <div className="video-container">
                    <div className="video-wrapper">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="video-thumbnail"
                      />
                      <div className="video-overlay">
                        <div className="play-button" onClick={() => handlePlayPreview(course.id)}>
                          <BsPlayCircle />
                          <div className="play-ring"></div>
                          <div className="play-ring play-ring-delay"></div>
                        </div>
                        <div className="video-info">
                          <span>{course.format?.split(' ')[0]}</span>
                          <span>{course.difficulty}</span>
                        </div>
                      </div>
                      <div className="video-time">
                        <FaClock />
                        <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="course-meta">
                    <div className="difficulty">
                      <div
                        className="difficulty-dot"
                        style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
                      ></div>
                      <span>{course.difficulty}</span>
                    </div>
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>
                        {course.sessionDays ? `${course.sessionDays} Days` : `${course.totalVideos ?? 0} Videos`}
                      </span>
                    </div>
                  </div>

                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  {/* Course Specific Details */}
                  <div className="course-stats">
                    <div className="stat-item">
                      <div className="stat-icon-small">
                        {course.icon}
                      </div>
                      <div className="stat-text">
                        <div className="stat-number">{course.format}</div>
                        <div className="stat-label">Training Format</div>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon-small">
                        <FaClock />
                      </div>
                      <div className="stat-text">
                        <div className="stat-number">
                          {course.sessionDays ? 
                            `${course.totalHours} Total Hours` : 
                            `${course.totalHours} Hours`
                          }
                        </div>
                        <div className="stat-label">Total Duration</div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="course-tags">
                    {course.features?.map((feature, i) => (
                      <span key={i} className="tag">{feature}</span>
                    ))}
                  </div>

                  {/* Instructor */}
                  <div className="instructor-info">
                    <div className="instructor-avatar">
                      <GiTeacher />
                      <div className="avatar-glow"></div>
                    </div>
                    <div className="instructor-details">
                      <div className="instructor-name">{course.instructor}</div>
                      <div className="instructor-rating">
                        {renderStars(course.rating)}
                        <span>{course.rating}/5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="card-footer">
                    <div className="pricing">
                      <div className="original-price">{course.priceDetails?.usd}</div>
                      <div className="current-price">
                        {course.priceDetails?.naira}
                        <div className="discount-badge">
                          {course.category === 'One-on-One' ? 'Premium' : 
                           course.category === 'Group Training' ? 'Best Value' : 'Self-Paced'}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="enroll-button"
                      onClick={() => handleEnrollClick(course)}
                    >
                      <span>Enroll Now</span>
                      <div className="button-icon">
                        <FaRocket />
                      </div>
                      <div className="button-glow"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="features__header animate-on-scroll">
            <div className="features__badge">Why Choose Us</div>
            <h2 className="features__title">What You Gain From the Session</h2>
            <p className="features__subtitle">
              Our platform combines cutting-edge technology with proven financial education methodologies
            </p>
          </div>

          <div className="features__grid">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className="feature-card animate-on-scroll"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  borderColor: feature.color 
                }}
              >
                <div className="feature-card__content">
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__description">{feature.description}</p>
                  <div className="feature-card__divider" style={{ backgroundColor: feature.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials__header animate-on-scroll">
            <div className="testimonials__badge">Success Stories</div>
            <h2 className="testimonials__title">What Our Students Say</h2>
            <p className="testimonials__subtitle">
              See real WhatsApp conversations from our satisfied students
            </p>
            <p className="testimonials__instruction">
              Click on any testimonial to view it larger
            </p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-image-card animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleImageClick(testimonial.screenshot)}
              >
                <div className="testimonial-image-card__wrapper">
                  <div className="testimonial-image-card__header">
                    <div className="testimonial-image-card__avatar">
                      <div className="testimonial-image-card__avatar-placeholder">
                        {testimonial.name.charAt(0)}
                      </div>
                      {testimonial.verified && (
                        <div className="testimonial-image-card__verified">
                          <BsShieldCheck />
                        </div>
                      )}
                    </div>
                    
                    <div className="testimonial-image-card__info">
                      <h3 className="testimonial-image-card__name">
                        {testimonial.name}
                      </h3>
                      <div className="testimonial-image-card__role">
                        {testimonial.role}
                      </div>
                      <div className="testimonial-image-card__company">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-image-card__screenshot-container">
                    <div className="testimonial-image-card__screenshot-frame">
                      <img
                        src={testimonial.screenshot}
                        alt={`Testimonial from ${testimonial.name}`}
                        className="testimonial-image-card__screenshot"
                        loading="lazy"
                      />
                      <div className="testimonial-image-card__screenshot-overlay">
                        <span className="testimonial-image-card__view-text">
                          Click to view
                        </span>
                      </div>
                    </div>
                    
                    <div className="testimonial-image-card__screenshot-info">
                      <div className="testimonial-image-card__rating">
                        <div className="testimonial-image-card__stars">
                          {renderStars(testimonial.rating)}
                        </div>
                        <div className="testimonial-image-card__date">
                          {testimonial.date}
                        </div>
                      </div>
                      
                      <div className="testimonial-image-card__location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta__content animate-on-scroll">
           
            <h2 className="final-cta__title">
              Start Your Investment Journey Today
            </h2>
            <p className="final-cta__description">
              Join our community of successful investors and get access to all 3 courses
              with a special launch discount. Your financial transformation begins now.
            </p>

            <div className="final-cta__pricing">
              <span className="final-cta__new-price">₦10,000</span>
            </div>

            <div className="final-cta__actions">
              <Button variant="primary" size="lg" onClick={() => navigate('/courses')}>
                <span className="final-cta__icon">
                  <FaBullseye />
                </span>
                Get Started Now
                <FaChevronRight className="btn-icon-right" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchPreview}
              >
                <span className="final-cta__icon">
                  <FaGift />
                </span>
                View Free Preview
              </Button>
            </div>
          </div>
        </div>

        <div className="final-cta__background">
          <div className="final-cta__particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`final-cta__particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Mouse Follower Glow */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>

      {/* Payment Modal */}
      {renderPaymentModal()}

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

export default Home;