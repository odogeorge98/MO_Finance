// src/pages/Courses/Courses.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';

// React Icons
import {
  FaClock,

  FaStar,
  FaRegStar,

  FaChevronRight,
  FaFire,

  FaUsers,
  FaSearch,
  FaRocket,
  FaBolt,
  FaDollarSign,
  FaBitcoin,
  FaEthereum,
  FaVideo,
  FaUserFriends,
  FaUserTie,
  FaCalendarAlt,

  FaTimes,
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaChevronLeft,
  FaCreditCard,
  FaUniversity,
  FaPhoneAlt
} from 'react-icons/fa';
import {
  BsPlayCircle,
  BsCheckCircleFill,
  BsArrowRight
} from 'react-icons/bs';
import {  GiCircuitry, GiCash, GiGoldBar, GiTeacher } from 'react-icons/gi';
import { IoDiamond, } from 'react-icons/io5';

interface PaymentDetails {
  accountNumber: string;
  bankName: string;
  accountName: string;
  whatsappContact: string;
}

interface Course {
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
}

export const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [carouselStep, setCarouselStep] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const courseCardsRef = useRef<Array<HTMLDivElement | null>>([]);

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

  const courses: Course[] = [
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
      features: ['Personalized Curriculum', 'Direct Q&A', 'Live Trading Sessions', 'Custom Feedback'],
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
      features: ['Group Discussions', 'Shared Learning', 'Peer Reviews', 'Interactive Sessions'],
      priceDetails: formatPrice(15000)
    },
    {
      id: '3',
      title: 'Prerecorded Training Sessions',
      description: 'Comprehensive video library for self-paced learning. Access anytime, anywhere.',
      duration: 120,
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.7,
      category: 'Self-Paced',
      students: 415,
      priceInNaira: 10000,
      modules: 6,
      isFeatured: true,
      icon: <FaVideo />,
      videoId: 'prerecorded-training',
      tags: ['Self-Paced', 'Lifetime Access', 'Flexible Learning', 'Video Library'],
      format: 'Prerecorded Videos',
      totalVideos: 6,
      totalHours: 2,
      features: ['Lifetime Access', 'Downloadable Materials', 'Progress Tracking', 'Certificate'],
      priceDetails: formatPrice(10000)
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (showPaymentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentModal]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

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

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setCarouselStep(0);
    setShowPaymentModal(true);
  };

  const handlePlayPreview = (courseId: string) => {
    // In a real app, this would play a video preview
    alert(`Playing preview for course: ${courseId}`);
  };

  const copyToClipboard = (text: string, field: string) => {
    if (!navigator.clipboard) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }).catch(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello! I've just made payment for the "${selectedCourse?.title}" course. Here are my details:\n\n- Name: [Your Name]\n- Email: [Your Email]\n- Transaction ID: [Your Transaction ID]\n\nPlease find the payment screenshot attached.`;
    const plain = paymentDetails.whatsappContact.replace('+', '').replace(/\s+/g, '');
    const whatsappUrl = `https://wa.me/${plain}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
      // Step 1: Account Details (updated layout)
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
                      <div className="value-text unbreakable-text">{paymentDetails.accountNumber}</div>
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
                      <div className="value-text unbreakable-text">{paymentDetails.bankName}</div>
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
                      <div className="value-text unbreakable-text">{paymentDetails.accountName}</div>
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
                      Use your <strong>full name</strong> as the transfer reference
                    </div>
                  </div>
                  <div className="instruction-item">
                    <div className="instruction-number">3</div>
                    <div className="instruction-content">
                      Save your <strong>payment confirmation screenshot</strong>
                    </div>
                  </div>
                  <div className="instruction-item">
                    <div className="instruction-number">4</div>
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
                      <div className="whatsapp-number-text unbreakable-text">{paymentDetails.whatsappContact}</div>
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
                <div key={index} className={`progress-step ${index <= carouselStep ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <span className="step-label">Step {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-content">{carouselSteps[carouselStep].content}</div>

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
    <div className="courses-page">
      {/* Animated Background Elements */}
      <div className="grid-background"></div>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Enhanced Hero Section */}
      <section className="courses-hero">
        {/* Advanced Hero Background */}
        <div className="hero-background">
          {/* Neural Network Grid */}
          <div className="neural-grid"></div>

          {/* Animated Crypto Charts */}
          <div className="crypto-charts">
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
          </div>

          {/* Money Falling Animation */}
          <div className="money-fall">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="money-item">
                <FaDollarSign />
              </div>
            ))}
          </div>

          {/* 3D Money Icons */}
          <div className="money-3d">
            <div className="money-3d-item"> <FaBitcoin /> </div>
            <div className="money-3d-item"> <FaEthereum /> </div>
            <div className="money-3d-item"> <GiCash /> </div>
            <div className="money-3d-item"> <GiGoldBar /> </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-glow">
              <div className="badge-icon"> <IoDiamond /> </div>
              <span>Premium Trading Academy</span>
              <div className="badge-sparkle"></div>
            </div>

            <h1 className="hero-title">
              <span className="title-gradient">Master Financial</span>
              <span className="title-gradient">Markets Today</span>
            </h1>

            <p className="hero-description">Choose from our premium training programs designed to transform you from beginner to professional trader through personalized, group, or self-paced learning.</p>

            {/* Futuristic Search */}
            <div className="hero-search-container">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search training programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="search-border"></div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  <span className="filter-text">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <div className="filter-glow"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-grid">
        <div className="container">
          <div className="grid-header">
            <div className="header-left">
              <h2 className="grid-title">
                <span className="title-text">Premium Training Programs</span>
                <div className="title-line"></div>
              </h2>
              <p className="grid-subtitle">Choose the learning style that matches your goals and schedule</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                <div className="stat-content">
                  <span className="stat-value">{courses.length}</span>
                  <span className="stat-label">Programs</span>
                </div>
                <div className="stat-icon"><FaBolt /></div>
              </div>
              <div className="stat">
                <div className="stat-content">
                  <span className="stat-value">{courses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}+</span>
                  <span className="stat-label">Students Trained</span>
                </div>
                <div className="stat-icon"><FaUsers /></div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div
            className="course-grid"
            ref={gridRef}
          >
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => { courseCardsRef.current[index] = el; }}
                className={`course-card ${hoveredCard === course.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={ { ['--mouse-x' as any]: `${mousePosition.x}px`, ['--mouse-y' as any]: `${mousePosition.y}px` } as React.CSSProperties }
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

          {/* Comparison Table */}
          <div className="cta-section">
            <div className="cta-card">
              <div className="cta-content">
                <h3 className="cta-title">Which Program Is Right For You?</h3>
                <p className="cta-description">Compare our training programs and choose the one that best fits your learning style, schedule, and budget.</p>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Feature</th>
                        <th>Personalized</th>
                        <th>Group</th>
                        <th>Self-Paced</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Live Sessions</td>
                        <td>✅ Yes</td>
                        <td>✅ Yes</td>
                        <td>❌ No</td>
                      </tr>
                      <tr>
                        <td>One-on-One Feedback</td>
                        <td>✅ Yes</td>
                        <td>❌ No</td>
                        <td>❌ No</td>
                      </tr>
                      <tr>
                        <td>Group Interaction</td>
                        <td>❌ No</td>
                        <td>✅ Yes</td>
                        <td>❌ No</td>
                      </tr>
                      <tr>
                        <td>Lifetime Access</td>
                        <td>✅ Yes</td>
                        <td>✅ Yes</td>
                        <td>✅ Yes</td>
                      </tr>
                      <tr>
                        <td>Certificate</td>
                        <td>✅ Yes</td>
                        <td>✅ Yes</td>
                        <td>✅ Yes</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>₦20,000</td>
                        <td>₦15,000</td>
                        <td>₦10,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="cta-button">
                  <span>Book a Free Consultation</span>
                  <FaChevronRight />
                  <div className="cta-glow"></div>
                </button>
              </div>
              <div className="cta-visual">
                <div className="visual-element">
                  <GiCircuitry />
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Courses;
