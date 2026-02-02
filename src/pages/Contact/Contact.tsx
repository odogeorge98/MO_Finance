// src/pages/Contact/Contact.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import './Contact.css';

// React Icons Imports
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaGlobe,
  FaCommentDots,
  FaCheckCircle,
  FaHeadset,
  FaChevronRight,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';

import { 
  MdOutlineEmail,
  MdOutlinePhone
} from 'react-icons/md';
import { 
  AiOutlineMessage
} from 'react-icons/ai';

type ContactMethod = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  action?: string;
  actionText?: string;
  color: string;
};


export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);


  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      icon: <MdOutlineEmail />,
      title: 'Email Support',
      description: 'Get detailed assistance via email',
      details: ' mosesmfonundofia@gmail.com',
      action: 'mailto: mosesmfonundofia@gmail.com',
      actionText: 'Send Email',
      color: '#6366f1'
    },
    {
      id: 2,
      icon: <MdOutlinePhone />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      details: '08103935041',
      action: 'tel:08103935041',
      actionText: 'Call Now',
      color: '#10b981'
    },
    // {
    //   id: 3,
    //   icon: <BsChatDots />,
    //   title: 'Live Chat',
    //   description: 'Instant help via live chat',
    //   details: 'Available 24/7',
    //   actionText: 'Start Chat',
    //   color: '#8b5cf6'
    // },
    // {
    //   id: 4,
    //   icon: <MdOutlineSupportAgent />,
    //   title: 'Community Forum',
    //   description: 'Get help from our community',
    //   details: '10,000+ active members',
    //   actionText: 'Visit Forum',
    //   color: '#f59e0b'
    // }
  ];

  const supportHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 6:00 PM EST' },
    { day: 'Sunday', hours: '12:00 PM - 4:00 PM EST' },
    { day: '24/7 Support', hours: 'Email & Live Chat' }
  ];

  const socialLinks = [
    { platform: 'LinkedIn', icon: <FaLinkedin />, url: '#', followers: '5,000+' },
    { platform: 'Twitter', icon: <FaTwitter />, url: '#', followers: '12,000+' },
    { platform: 'Instagram', icon: <FaInstagram />, url: '#', followers: '8,500+' },
    { platform: 'Facebook', icon: <FaFacebook />, url: '#', followers: '15,000+' },
    { platform: 'YouTube', icon: <FaYoutube />, url: '#', subscribers: '25,000+' }
  ];


  // Add scroll animations
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__content">
            <div className="contact-hero__badge animate-on-scroll">
              <FaHeadset /> 24/7 Support
            </div>
            
            <h1 className="contact-hero__title animate-on-scroll">
              We're Here to
              <span className="contact-hero__title-highlight"> Help You</span>
            </h1>
            
            <p className="contact-hero__description animate-on-scroll">
              Have questions about our courses, platform, or investment strategies? 
              Our dedicated support team is ready to assist you 24/7.
            </p>
            
            <div className="contact-hero__stats animate-on-scroll">
              <div className="contact-hero__stat">
                <div className="contact-hero__stat-value">24/7</div>
                <div className="contact-hero__stat-label">Support Available</div>
              </div>
              <div className="contact-hero__stat">
                <div className="contact-hero__stat-value">2h</div>
                <div className="contact-hero__stat-label">Avg. Response Time</div>
              </div>
              <div className="contact-hero__stat">
                <div className="contact-hero__stat-value">98%</div>
                <div className="contact-hero__stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-hero__background">
          <div className="contact-hero__orb contact-hero__orb--1"></div>
          <div className="contact-hero__orb contact-hero__orb--2"></div>
          <div className="contact-hero__grid-overlay"></div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="contact-methods__header animate-on-scroll">
            <h2 className="contact-methods__title">
              Choose Your Preferred Contact Method
            </h2>
            <p className="contact-methods__subtitle">
              Multiple ways to get in touch with our support team
            </p>
          </div>

          <div className="contact-methods__grid">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className="contact-method animate-on-scroll"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  '--method-color': method.color
                } as React.CSSProperties}
              >
                <div className="contact-method__icon">
                  {method.icon}
                </div>
                <h3 className="contact-method__title">{method.title}</h3>
                <p className="contact-method__description">{method.description}</p>
                <div className="contact-method__details">{method.details}</div>
                {method.action ? (
                  <a href={method.action} className="contact-method__action">
                    {method.actionText}
                    <FaChevronRight className="btn-icon-right" />
                  </a>
                ) : (
                  <button className="contact-method__action">
                    {method.actionText}
                    <FaChevronRight className="btn-icon-right" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-section__grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper animate-on-scroll">
              <div className="contact-form__header">
                <h2 className="contact-form__title">
                  Send Us a Message
                </h2>
                <p className="contact-form__subtitle">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              {submitSuccess ? (
                <div className="contact-form__success">
                  <div className="contact-form__success-icon">
                    <FaCheckCircle />
                  </div>
                  <h3 className="contact-form__success-title">
                    Message Sent Successfully!
                  </h3>
                  <p className="contact-form__success-message">
                    Thank you for contacting us. We'll get back to you within 2-4 hours 
                    during business hours. For urgent matters, please use live chat.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__group">
                    <label htmlFor="name" className="contact-form__label">
                      <FaUser /> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="email" className="contact-form__label">
                      <FaEnvelope /> Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="category" className="contact-form__label">
                      <FaGlobe /> Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="contact-form__select"
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="courses">Course Questions</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership Opportunities</option>
                    </select>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="subject" className="contact-form__label">
                      <FaCommentDots /> Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="contact-form__input"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="message" className="contact-form__label">
                      <AiOutlineMessage /> Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact-form__textarea"
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="contact-form__spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="btn-icon-left" />
                        Send Message
                        <FaChevronRight className="btn-icon-right" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="contact-info animate-on-scroll">
              <div className="contact-info__header">
                <h2 className="contact-info__title">
                  Contact Information
                </h2>
                <p className="contact-info__subtitle">
                  Here's how you can reach us directly
                </p>
              </div>

              <div className="contact-info__details">
                <div className="contact-info__detail">
                  <div className="contact-info__detail-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-info__detail-content">
                    <h3 className="contact-info__detail-title">Email Address</h3>
                    <p className="contact-info__detail-text">
                       mosesmfonundofia@gmail.com 
                    </p>
                    <p className="contact-info__detail-text">
                       mosesmfonundofia@gmail.com 
                    </p>
                  </div>
                </div>

                <div className="contact-info__detail">
                  <div className="contact-info__detail-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-info__detail-content">
                    <h3 className="contact-info__detail-title">Phone Numbers</h3>
                    <p className="contact-info__detail-text">
                      Support: +234 810 393 5041
                    </p>
                    <p className="contact-info__detail-text">
                      Sales: +234 810 393 5041
                    </p>
                  </div>
                </div>

                <div className="contact-info__detail">
                  <div className="contact-info__detail-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-info__detail-content">
                    <h3 className="contact-info__detail-title">Office Location</h3>
                    <p className="contact-info__detail-text">
                      
                    </p>
                    <p className="contact-info__detail-text">
                      Cross River Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="support-hours">
                <h3 className="support-hours__title">
                  <FaClock /> Support Hours
                </h3>
                <div className="support-hours__list">
                  {supportHours.map((item, index) => (
                    <div key={index} className="support-hours__item">
                      <span className="support-hours__day">{item.day}</span>
                      <span className="support-hours__time">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="social-media">
                <h3 className="social-media__title">
                  Connect With Us
                </h3>
                <div className="social-media__links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-media__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="social-media__icon">
                        {social.icon}
                      </span>
                      <span className="social-media__platform">
                        {social.platform}
                      </span>
                      <span className="social-media__stats">
                        {social.platform === 'YouTube' ? 'Subscribers' : 'Followers'}: {social.followers}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;