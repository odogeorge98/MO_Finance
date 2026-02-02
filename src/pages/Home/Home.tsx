// src/pages/Home/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import { FeatureCard } from '../../components/Card/FeatureCard';
import { TestimonialCard } from '../../components/Card/TestimonialCard';
import './Home.css';
import img from './img1.png';

// React Icons Imports
import {
  FaGem,
  FaPlay,
  FaBookOpen,
  FaRocket,
  FaBullseye,
  FaChalkboardTeacher,
  FaMobileAlt,
  FaSyncAlt,
  FaHandshake,
  FaClock,
  FaUser,
  FaStar,
  FaRegStar,
  FaChartLine,
  FaCheck,
  FaChevronRight,
  FaGift,
  FaTimes,
  FaWhatsapp,
  FaCopy,
  FaChevronLeft,
  FaCreditCard,
  FaUniversity,
  FaPhoneAlt
} from 'react-icons/fa';
import {
  GiTakeMyMoney,
  GiChart,
  GiMoneyStack,
  GiCrystalBars,
} from 'react-icons/gi';
import {
  BsGraphUp,
  BsCurrencyExchange,
  BsShieldCheck,
  BsCheckCircleFill,
  BsArrowRight,

} from 'react-icons/bs';

import { MdOutlineWorkspacePremium } from 'react-icons/md';


type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  instructor: string;
  rating: number;
  category: string;
  students: number;
  icon?: React.ReactNode;
  priceInNaira: number;
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
  content: string;
  avatar: string;
  rating: number;
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
  const ngnToUsd = 0.0007; // 1 NGN = 0.0007 USD

  const formatPrice = (priceInNaira: number) => {
    const priceInUsd = priceInNaira * ngnToUsd;
    return {
      naira: `₦${priceInNaira.toLocaleString()}`,
      usd: `$${priceInUsd.toFixed(2)} USD`
    };
  };

  const statsData: Stat[] = [
    { value: 3, label: 'Premium Courses', suffix: '+' },
    { value: 100, label: 'Students Enrolled', suffix: '+' },
    { value: 12, label: 'Hours of Content', suffix: 'h+' },
  ];

  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Wealth Fundamentals',
      description: 'Master personal budgeting, debt management, and financial goal setting',
      duration: 120,
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Alex Johnson, CFA',
      rating: 4.9,
      category: 'Personal Finance',
      students: 342,
      priceInNaira: 15000,
      icon: <GiTakeMyMoney />
    },
    {
      id: '2',
      title: 'Stock Market Pro',
      description: 'Advanced technical analysis, options trading, and portfolio management',
      duration: 180,
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Maria Chen, MBA',
      rating: 4.8,
      category: 'Stock Trading',
      students: 287,
      priceInNaira: 25000,
      icon: <FaChartLine />
    },
    {
      id: '3',
      title: 'Crypto Futures Masterclass',
      description: 'Blockchain fundamentals, cryptocurrency trading, and DeFi strategies',
      duration: 150,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'David Park, Crypto Analyst',
      rating: 4.7,
      category: 'Cryptocurrency',
      students: 415,
      priceInNaira: 20000,
      icon: <BsCurrencyExchange />
    },
  ];

  // Format prices for all courses
  allCourses.forEach(course => {
    course.priceDetails = formatPrice(course.priceInNaira);
  });

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
      name: 'Engr Benjamin',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'Wow! I must say these sessions were nothing short of explicit. It opened my eyes to see patterns you won\'t see randomly. Although I was nervous when it came time to make the payment. Why? I didn\'t want to fall victim to a scam. But I\'m ecstatic that I wasn\'t. And the lectures went beyond and above my expectations. Thanks immensely for your potent teachings. It\'s something I\'ll always carry the rest of my life.',
      avatar: img ,
      rating: 5,
    },
    {
      id: 2,
      name: 'Augustus Osunwa',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'I just finished the videos, I\'d be sending my portfolio breakdown before today\'s end. The videos are detailed enough, the duration encourages commitment too. The highlight for me was when we got to that revenue part and broke it down. I didn\'t see that part coming and its actually a key aspect in determining if a company is a good buy.',
      avatar: img,
      rating: 5,
    },
    {
      id: 3,
      name: 'Favour',
      role: 'Investment Student',
      company: 'Financial Freedom Academy',
      content: 'Thank you so much Mr Moses. This session was worth every dime I spent and way much more when compared to the value I got from this session with you. You\'ve really shifted my perspective on financial intelligence/management which a lot people out there pay heavily for. I am glad I enrolled for this class.',
      avatar: img,
      rating: 5,
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
    if (showPaymentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentModal]);

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
                  <span>Self-Paced Online Course</span>
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
      {/* Hero Section */}
      <section ref={heroRef} className={`hero ${isHeroLoaded ? 'hero--loaded' : ''}`}>
        <div className="container">
          <div className="hero__content">
            <div className="hero__badge animate-on-scroll">
              <span className="hero__badge-icon">
                <FaGem />
              </span>
              <span className="hero__badge-text">TRUSTED BY 1,250+ INVESTORS</span>
            </div>

            <h1 className="hero__title animate-on-scroll">
              Personal  <span className="hero__title-highlight">Finance</span> &
              <span className="hero__title-break"> Stock Market</span>
            </h1>

            <p className="hero__description animate-on-scroll">
              Tired of consistently making money? Are you ready to make your money work for you? If that is the case you came to the right source
            </p>

            <div className="hero__actions animate-on-scroll">
              <Button
                variant="primary"
                size="lg"
                className="hero__cta-primary"
                onClick={handleWatchPreview}
              >
                <span className="hero__action-icon">
                  <FaPlay />
                </span>
                Watch Free Preview
              </Button>
              <Button variant="outline" size="lg" className="hero__cta-secondary" onClick={() => navigate('/courses')}>
                <span className="hero__action-icon">
                  <FaBookOpen />
                </span>
                Training Sessions
              </Button>
            </div>

            <div className="hero__stats-mobile animate-on-scroll">
              {statsData.map((stat) => (
                <div key={stat.label} className="hero__stat-mobile">
                  <StatsCounter
                    endValue={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__background">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__grid-overlay"></div>
        </div>

        <div className="hero__floating-elements">
          <div className="hero__floating-element element-1">
            <BsGraphUp />
          </div>
          <div className="hero__floating-element element-2">
            <GiChart />
          </div>
          <div className="hero__floating-element element-3">
            <GiMoneyStack />
          </div>
          <div className="hero__floating-element element-4">
            <GiCrystalBars />
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
                <div className="stats__icon-container">
                  <div className="stats__icon-bg"></div>
                  <div className="stats__icon">
                    {index === 0 && <MdOutlineWorkspacePremium />}
                    {index === 1 && <FaUser />}
                    {index === 2 && <FaClock />}
                  </div>
                </div>
                <StatsCounter
                  endValue={stat.value}
                  duration={2000}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <div className="courses__header animate-on-scroll">
            <div className="courses__badge">Featured Curriculum</div>
            <h2 className="courses__title">Master Your Financial Future</h2>
            <p className="courses__subtitle">
              Comprehensive courses designed by industry experts with AI-powered learning paths
            </p>
          </div>

          <div className="courses__grid">
            {allCourses.map((course, index) => (
              <div
                key={course.id}
                className="course-card animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="course-card__header">
                  <div className="course-card__category">
                    <span className="course-card__category-icon">
                      {course.icon}
                    </span>
                    {course.category}
                  </div>
                  <div className="course-card__difficulty">
                    <span className={`difficulty-dot difficulty-${course.difficulty.toLowerCase()}`}></span>
                    {course.difficulty}
                  </div>
                </div>

                <div className="course-card__image-wrapper">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-card__image"
                    loading="lazy"
                  />
                  <div className="course-card__overlay">
                    <button className="course-card__play-btn" aria-label="Play preview">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="course-card__duration">
                    <FaClock /> {course.duration} min
                  </div>
                </div>

                <div className="course-card__content">
                  <div className="course-card__meta">
                    <div className="course-card__instructor">
                      <span className="course-card__instructor-avatar">
                        <FaUser />
                      </span>
                      {course.instructor}
                    </div>
                    <div className="course-card__rating">
                      <span className="course-card__stars">
                        {renderStars(course.rating)}
                      </span>
                      <span className="course-card__rating-value">{course.rating}</span>
                      <span className="course-card__students">({course.students})</span>
                    </div>
                  </div>

                  <h3 className="course-card__title">{course.title}</h3>
                  <p className="course-card__description">{course.description}</p>

                  <div className="course-card__footer">
                    <div className="course-card__pricing">
                      <div className="course-price">
                        {course.priceDetails?.naira}
                        <span className="price-note">One-time payment</span>
                      </div>
                    </div>
                    <Button variant="primary" size="sm" fullWidth onClick={() => handleEnrollClick(course)}>
                      Enroll Now
                      <FaChevronRight className="btn-icon-right" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="courses__cta animate-on-scroll">
            <Button variant="outline" size="lg" onClick={() => navigate('/courses')}>
              View All Courses
              <FaChevronRight className="btn-icon-right" />
            </Button>
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
              <div className="feature-card-container" key={feature.id}>
                <FeatureCard
                  feature={feature}
                  index={index}
                />
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
              Join thousands of successful investors who transformed their financial journey
            </p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta__content animate-on-scroll">
            <div className="final-cta__badge">
              <BsShieldCheck /> Limited Time Offer
            </div>
            <h2 className="final-cta__title">
              Start Your Investment Journey Today
            </h2>
            <p className="final-cta__description">
              Join our community of successful investors and get access to all 3 courses
              with a special launch discount. Your financial transformation begins now.
            </p>

            <div className="final-cta__pricing">
              <span className="final-cta__old-price"></span>
              <span className="final-cta__new-price">$14</span>
             
            </div>

            <div className="final-cta__actions">
              <Button variant="primary" size="lg" onClick={() => handleEnrollClick(allCourses[0])}>
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

      {/* Payment Modal */}
      {renderPaymentModal()}
    </div>
  );
};

export default Home;