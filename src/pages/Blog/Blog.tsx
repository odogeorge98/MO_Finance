// src/pages/Blog/Blog.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Blog.css';

// React Icons Imports
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaArrowRight,
  FaFire,
  FaSearch,
  FaRegComment,
  FaEye,
  FaThumbsUp,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaHashtag,
  FaNewspaper,
  FaChartLine,
  FaLightbulb,
  FaGlobe,
  FaUniversity,
  FaCrown,
  FaGift,
  FaAward
} from 'react-icons/fa';
import { BsClock, BsBookmarkFill, BsBookmark, BsShare } from 'react-icons/bs';
import { AiOutlineRocket, AiOutlineThunderbolt } from 'react-icons/ai';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  trending: boolean;
  color: string;
  gradient: string;
};

type BlogCategory = {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
};

type TrendingTag = {
  id: string;
  name: string;
  posts: number;
  trending: boolean;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const Blog: React.FC = () => {
  // Persisted UI state keys
  const BOOKMARKS_KEY = 'blog_bookmarks_v1';
  const VIEWMODE_KEY = 'blog_viewmode_v1';
  const CATEGORY_KEY = 'blog_activeCategory_v1';

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    try {
      return localStorage.getItem(CATEGORY_KEY) || 'all';
    } catch {
      return 'all';
    }
  });
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  // store bookmarks as a string[] in localStorage but use Set locally for O(1) checks
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        return new Set(arr);
      }
    } catch (e) {
      // ignore
    }
    return new Set();
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    try {
      const v = localStorage.getItem(VIEWMODE_KEY) as 'grid' | 'list' | null;
      return v || 'grid';
    } catch {
      return 'grid';
    }
  });

  // newsletter email state
  const [email, setEmail] = useState('');

  // Memoize large static arrays so they're not recreated on every render
  const blogCategories: BlogCategory[] = useMemo(() => [
    {
      id: 'all',
      name: 'All Posts',
      count: 48,
      icon: <FaNewspaper />,
      color: '#8b5cf6'
    },
    {
      id: 'investing',
      name: 'Investing',
      count: 18,
      icon: <FaChartLine />,
      color: '#10b981'
    },
    {
      id: 'market',
      name: 'Market Analysis',
      count: 12,
      icon: <FaChartLine />,
      color: '#f59e0b'
    },
    {
      id: 'education',
      name: 'Education',
      count: 8,
      icon: <FaUniversity />,
      color: '#ef4444'
    },
    {
      id: 'technology',
      name: 'Technology',
      count: 6,
      icon: <AiOutlineThunderbolt />,
      color: '#06b6d4'
    },
    {
      id: 'global',
      name: 'Global Markets',
      count: 4,
      icon: <FaGlobe />,
      color: '#6366f1'
    }
  ], []);

  const trendingTags: TrendingTag[] = useMemo(() => [
    { id: 'ai', name: 'AI Investing', posts: 42, trending: true },
    { id: 'crypto', name: 'Cryptocurrency', posts: 36, trending: true },
    { id: 'stocks', name: 'Stock Market', posts: 28, trending: false },
    { id: 'etf', name: 'ETFs', posts: 24, trending: true },
    { id: 'reits', name: 'REITs', posts: 18, trending: false },
    { id: 'bonds', name: 'Bonds', posts: 15, trending: false },
    { id: 'sustainability', name: 'ESG Investing', posts: 12, trending: true }
  ], []);

  const blogPosts: BlogPost[] = useMemo(() => [
    {
      id: '1',
      title: 'The Future of AI in Investment Strategies: 2024 Outlook',
      excerpt: 'Discover how artificial intelligence is revolutionizing portfolio management and predictive analytics in modern investing.',
      content: '',
      author: { name: 'Dr. Sarah Chen', role: 'Chief Investment Strategist', avatar: 'SC' },
      date: 'Mar 15, 2024',
      readTime: '8 min read',
      category: 'technology',
      tags: ['AI', 'Machine Learning', 'Future Tech'],
      image: 'ai-investing',
      views: 15240,
      likes: 1245,
      comments: 89,
      featured: true,
      trending: true,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    },
    {
      id: '2',
      title: 'Market Volatility: Strategies for Uncertain Economic Times',
      excerpt: 'Learn proven techniques to protect and grow your portfolio during periods of high market volatility.',
      content: '',
      author: { name: 'Michael Rodriguez', role: 'Senior Market Analyst', avatar: 'MR' },
      date: 'Mar 12, 2024',
      readTime: '6 min read',
      category: 'market',
      tags: ['Volatility', 'Risk Management', 'Strategy'],
      image: 'market-volatility',
      views: 12480,
      likes: 987,
      comments: 65,
      featured: true,
      trending: false,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      id: '3',
      title: 'Sustainable Investing: Beyond ESG to Impact Portfolios',
      excerpt: 'How to build investment portfolios that generate both financial returns and positive social impact.',
      content: '',
      author: { name: 'Emma Watson', role: 'Sustainability Director', avatar: 'EW' },
      date: 'Mar 10, 2024',
      readTime: '10 min read',
      category: 'investing',
      tags: ['ESG', 'Sustainability', 'Impact'],
      image: 'sustainable-investing',
      views: 9870,
      likes: 845,
      comments: 72,
      featured: false,
      trending: true,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      id: '4',
      title: 'Cryptocurrency Regulations: What Investors Need to Know',
      excerpt: 'A comprehensive guide to navigating the evolving regulatory landscape of digital assets.',
      content: '',
      author: { name: 'James Wilson', role: 'Blockchain Expert', avatar: 'JW' },
      date: 'Mar 8, 2024',
      readTime: '7 min read',
      category: 'investing',
      tags: ['Crypto', 'Regulations', 'Blockchain'],
      image: 'crypto-regulations',
      views: 15680,
      likes: 1120,
      comments: 124,
      featured: true,
      trending: true,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      id: '5',
      title: 'The Rise of Emerging Markets: Opportunities in 2024',
      excerpt: 'Analysis of promising investment opportunities in developing economies across Asia and Africa.',
      content: '',
      author: { name: 'Lisa Tanaka', role: 'Global Markets Specialist', avatar: 'LT' },
      date: 'Mar 5, 2024',
      readTime: '9 min read',
      category: 'global',
      tags: ['Emerging Markets', 'Global', 'Opportunities'],
      image: 'emerging-markets',
      views: 8760,
      likes: 654,
      comments: 45,
      featured: false,
      trending: false,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
    },
    {
      id: '6',
      title: 'Retirement Planning: Building a Tax-Efficient Portfolio',
      excerpt: 'Strategies for creating retirement portfolios that minimize taxes and maximize growth.',
      content: '',
      author: { name: 'Robert Kim', role: 'Retirement Planning Expert', avatar: 'RK' },
      date: 'Mar 3, 2024',
      readTime: '11 min read',
      category: 'education',
      tags: ['Retirement', 'Tax Planning', 'Portfolio'],
      image: 'retirement-planning',
      views: 10450,
      likes: 890,
      comments: 56,
      featured: false,
      trending: true,
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      id: '7',
      title: 'Real Estate Investment Trusts (REITs) in a High-Interest Environment',
      excerpt: 'How REITs perform during rising interest rates and which sectors show the most resilience.',
      content: '',
      author: { name: 'David Park', role: 'Real Estate Analyst', avatar: 'DP' },
      date: 'Feb 28, 2024',
      readTime: '8 min read',
      category: 'investing',
      tags: ['REITs', 'Real Estate', 'Interest Rates'],
      image: 'reits-analysis',
      views: 9250,
      likes: 723,
      comments: 38,
      featured: true,
      trending: false,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      id: '8',
      title: 'The Psychology of Investing: Overcoming Cognitive Biases',
      excerpt: 'Understanding common psychological traps and how to make more rational investment decisions.',
      content: '',
      author: { name: 'Dr. Amanda Reed', role: 'Behavioral Economist', avatar: 'AR' },
      date: 'Feb 25, 2024',
      readTime: '12 min read',
      category: 'education',
      tags: ['Psychology', 'Behavioral Finance', 'Decision Making'],
      image: 'psychology-investing',
      views: 11890,
      likes: 956,
      comments: 67,
      featured: false,
      trending: true,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    }
  ], []);

  const featuredAuthors = useMemo(() => [
    { id: '1', name: 'Dr. Sarah Chen', role: 'Chief Investment Strategist', posts: 42, followers: '12.5K', avatar: 'SC', color: '#06b6d4' },
    { id: '2', name: 'Michael Rodriguez', role: 'Senior Market Analyst', posts: 38, followers: '9.8K', avatar: 'MR', color: '#10b981' },
    { id: '3', name: 'Emma Watson', role: 'Sustainability Director', posts: 31, followers: '8.3K', avatar: 'EW', color: '#8b5cf6' },
    { id: '4', name: 'James Wilson', role: 'Blockchain Expert', posts: 27, followers: '15.2K', avatar: 'JW', color: '#f59e0b' }
  ], []);

  const faqs: FAQ[] = useMemo(() => [
    { id: 1, question: 'How often is new content published?', answer: 'We publish new articles daily, with major analysis pieces every Monday and Thursday. Our newsletter subscribers get early access to all content 24 hours before public release.' },
    { id: 2, question: 'Can I contribute as a guest writer?', answer: 'Yes! We welcome guest contributions from industry experts. Please submit your pitch and writing samples to editorial@investmentblog.com. All submissions undergo our editorial review process.' },
    { id: 3, question: 'Is the content free to access?', answer: 'Most of our content is completely free. Premium subscribers get access to exclusive in-depth reports, advanced analytics tools, and ad-free reading experience. We also offer student discounts.' },
    { id: 4, question: 'How can I stay updated with new posts?', answer: 'Subscribe to our weekly newsletter, follow us on social media (@InvestmentBlog), or enable browser notifications on our website. You can also bookmark your favorite authors to get notified when they publish.' },
    { id: 5, question: 'Do you offer investment advice?', answer: 'Our content is for educational and informational purposes only. We do not provide personalized investment advice. Always consult with a qualified financial advisor before making investment decisions.' },
    { id: 6, question: 'Can I share articles with my investment group?', answer: 'Yes! We encourage sharing our articles. Each article includes share buttons for social media and email. For investment groups, we offer group subscriptions with special pricing.' }
  ], []);

  const valuePropositions = useMemo(() => [
    { icon: <FaLightbulb />, title: 'Expert Insights', description: 'Written by industry professionals with real-world experience' },
    { icon: <FaChartLine />, title: 'Data-Driven Analysis', description: 'Backed by comprehensive research and market data' },
    { icon: <FaGlobe />, title: 'Global Perspective', description: 'Covering markets and opportunities worldwide' },
    { icon: <FaUniversity />, title: 'Educational Focus', description: 'Designed to help investors at all levels grow' }
  ], []);

  // Filtering logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      if (activeCategory !== 'all' && post.category !== activeCategory) return false;
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    });
  }, [blogPosts, activeCategory, searchQuery]);

  const featuredPosts = useMemo(() => blogPosts.filter(p => p.featured), [blogPosts]);
  

  // Intersection animation (guard for SSR)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
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

  // Persist bookmarks & UI preferences
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarkedPosts)));
    } catch {}
  }, [bookmarkedPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEWMODE_KEY, viewMode);
    } catch {}
  }, [viewMode]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORY_KEY, activeCategory);
    } catch {}
  }, [activeCategory]);

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  // Newsletter submit handler
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      alert('Please enter a valid email address');
      return;
    }

    // placeholder for real subscription flow
    alert(`Thanks — ${trimmed} has been subscribed! Check your inbox.`);
    setEmail('');
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero__content">
            <div className="blog-hero__badge animate-on-scroll" aria-hidden>
              <FaGift /> Exclusive Content
            </div>

            <h1 className="blog-hero__title animate-on-scroll">
              Investment Insights &
              <span className="blog-hero__title-highlight"> Market Intelligence</span>
            </h1>

            <p className="blog-hero__description animate-on-scroll">
              Stay ahead with expert analysis, market trends, and investment strategies from
              leading financial experts. Updated daily with actionable insights.
            </p>

            <div className="blog-hero__search animate-on-scroll">
              <div className="blog-hero__search-wrapper">
                <FaSearch className="blog-hero__search-icon" aria-hidden />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  className="blog-hero__search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search articles, topics, or authors"
                />
                <Button variant="primary" className="blog-hero__search-button" onClick={() => { /* search is reactive */ }}>
                  Search
                </Button>
              </div>
            </div>

            <div className="blog-hero__stats animate-on-scroll">
              <div className="blog-hero__stat">
                <StatsCounter endValue={1250} duration={2000} suffix="+" />
                <span>Articles Published</span>
              </div>
              <div className="blog-hero__stat">
                <StatsCounter endValue={42} duration={2000} suffix="K" />
                <span>Monthly Readers</span>
              </div>
              <div className="blog-hero__stat">
                <StatsCounter endValue={98} duration={2000} suffix="%" />
                <span>Reader Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-hero__background">
          <div className="blog-hero__orb blog-hero__orb--1" />
          <div className="blog-hero__orb blog-hero__orb--2" />
          <div className="blog-hero__grid-overlay" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="blog-categories">
        <div className="container">
          <div className="blog-categories__header animate-on-scroll">
            <h2 className="blog-categories__title">Explore Topics</h2>
            <p className="blog-categories__subtitle">Dive into our curated collection of investment knowledge</p>
          </div>

          <div className="blog-categories__grid">
            {blogCategories.map((category, index) => (
              <button
                key={category.id}
                className={`blog-category animate-on-scroll ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-pressed={activeCategory === category.id}
              >
                <div className="blog-category__icon" style={{ background: category.color }} aria-hidden>
                  {category.icon}
                </div>
                <h3 className="blog-category__name">{category.name}</h3>
                <span className="blog-category__count">{category.count} posts</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="featured-posts">
        <div className="container">
          <div className="featured-posts__header animate-on-scroll">
            <div className="featured-posts__title-wrapper">
              <h2 className="featured-posts__title"><FaCrown /> Featured Stories</h2>

              <div className="featured-posts__controls" role="tablist" aria-label="View mode toggle">
                <button
                  className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                >
                  Grid
                </button>
                <button
                  className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                >
                  List
                </button>
              </div>
            </div>
            <p className="featured-posts__subtitle">In-depth analysis and exclusive insights from our top contributors</p>
          </div>

          <div className={`featured-posts__grid ${viewMode}`}>
            {featuredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`featured-post animate-on-scroll ${post.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {post.trending && (
                  <div className="featured-post__badge trending" aria-hidden>
                    <FaFire /> Trending
                  </div>
                )}

                <div className="featured-post__image" style={{ background: post.gradient }} role="img" aria-label={`${post.title} cover`}>
                  <div className="featured-post__category">
                    <span style={{ background: post.color }}>{post.category}</span>
                  </div>
                </div>

                <div className="featured-post__content">
                  <div className="featured-post__meta">
                    <span className="featured-post__date"><FaCalendarAlt /> {post.date}</span>
                    <span className="featured-post__read-time"><BsClock /> {post.readTime}</span>
                  </div>

                  <h3 className="featured-post__title">
                    <a href={`/blog/${post.id}`} aria-label={`Read: ${post.title}`}>{post.title}</a>
                  </h3>

                  <p className="featured-post__excerpt">{post.excerpt}</p>

                  <div className="featured-post__author">
                    <div className="featured-post__author-avatar" style={{ background: post.color }} aria-hidden>
                      {post.author.avatar}
                    </div>
                    <div className="featured-post__author-info">
                      <div className="featured-post__author-name">{post.author.name}</div>
                      <div className="featured-post__author-role">{post.author.role}</div>
                    </div>
                  </div>

                  <div className="featured-post__footer">
                    <div className="featured-post__tags">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="featured-post__tag"><FaTag /> {tag}</span>
                      ))}
                    </div>

                    <div className="featured-post__actions">
                      <button
                        className="featured-post__action"
                        onClick={() => toggleBookmark(post.id)}
                        aria-label={bookmarkedPosts.has(post.id) ? 'Remove bookmark' : 'Add bookmark'}
                      >
                        {bookmarkedPosts.has(post.id) ? (
                          <BsBookmarkFill style={{ color: '#f59e0b' }} />
                        ) : (
                          <BsBookmark />
                        )}
                      </button>
                      <button className="featured-post__action" aria-label="Share post">
                        <BsShare />
                      </button>
                    </div>
                  </div>

                  <div className="featured-post__stats">
                    <span className="featured-post__stat"><FaEye /> {formatNumber(post.views)}</span>
                    <span className="featured-post__stat"><FaThumbsUp /> {formatNumber(post.likes)}</span>
                    <span className="featured-post__stat"><FaRegComment /> {formatNumber(post.comments)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="value-props">
        <div className="container">
          <div className="value-props__grid">
            {valuePropositions.map((prop, index) => (
              <div key={index} className="value-prop animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="value-prop__icon" aria-hidden>{prop.icon}</div>
                <h3 className="value-prop__title">{prop.title}</h3>
                <p className="value-prop__description">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="all-posts">
        <div className="container">
          <div className="all-posts__header animate-on-scroll">
            <h2 className="all-posts__title">Latest Articles</h2>
            <p className="all-posts__subtitle">Browse through our complete collection of investment articles</p>
          </div>

          <div className="all-posts__grid">
            {filteredPosts.map((post, index) => (
              <article key={post.id} className="blog-post animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="blog-post__header">
                  <div className="blog-post__category" style={{ background: post.color }}>{post.category}</div>
                  {post.trending && (
                    <div className="blog-post__trending" aria-hidden>
                      <FaFire /> Trending
                    </div>
                  )}
                </div>

                <div className="blog-post__content">
                  <h3 className="blog-post__title"><a href={`/blog/${post.id}`}>{post.title}</a></h3>

                  <p className="blog-post__excerpt">{post.excerpt}</p>

                  <div className="blog-post__meta">
                    <div className="blog-post__author">
                      <div className="blog-post__author-avatar" style={{ background: post.color }} aria-hidden>{post.author.avatar}</div>
                      <div className="blog-post__author-info">
                        <div className="blog-post__author-name">{post.author.name}</div>
                        <div className="blog-post__author-role">{post.author.role}</div>
                      </div>
                    </div>

                    <div className="blog-post__meta-details">
                      <span className="blog-post__date"><FaCalendarAlt /> {post.date}</span>
                      <span className="blog-post__read-time"><BsClock /> {post.readTime}</span>
                    </div>
                  </div>

                  <div className="blog-post__footer">
                    <div className="blog-post__tags">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="blog-post__tag"><FaHashtag /> {tag}</span>
                      ))}
                    </div>

                    <div className="blog-post__actions">
                      <button className="blog-post__action" onClick={() => toggleBookmark(post.id)} aria-label={bookmarkedPosts.has(post.id) ? 'Remove bookmark' : 'Add bookmark'}>
                        {bookmarkedPosts.has(post.id) ? <BsBookmarkFill style={{ color: '#f59e0b' }} /> : <BsBookmark />}
                      </button>
                      <button className="blog-post__action" aria-label="Share post"><BsShare /></button>
                    </div>
                  </div>

                  <div className="blog-post__stats">
                    <span className="blog-post__stat"><FaEye /> {formatNumber(post.views)}</span>
                    <span className="blog-post__stat"><FaThumbsUp /> {formatNumber(post.likes)}</span>
                    <span className="blog-post__stat"><FaRegComment /> {formatNumber(post.comments)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tags */}
      <section className="trending-tags">
        <div className="container">
          <div className="trending-tags__header animate-on-scroll">
            <h2 className="trending-tags__title"><FaChartLine /> Trending Topics</h2>
            <p className="trending-tags__subtitle">Explore what the investment community is talking about</p>
          </div>

          <div className="trending-tags__grid animate-on-scroll">
            {trendingTags.map((tag, index) => (
              <div key={tag.id} className={`trending-tag ${tag.trending ? 'trending' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
                <div className="trending-tag__content">
                  <span className="trending-tag__name"><FaHashtag /> {tag.name}</span>
                  <span className="trending-tag__count">{tag.posts} posts</span>
                </div>
                {tag.trending && (
                  <div className="trending-tag__badge" aria-hidden><FaFire /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="featured-authors">
        <div className="container">
          <div className="featured-authors__header animate-on-scroll">
            <h2 className="featured-authors__title"><FaUser /> Featured Contributors</h2>
            <p className="featured-authors__subtitle">Learn from industry experts with decades of combined experience</p>
          </div>

          <div className="featured-authors__grid animate-on-scroll">
            {featuredAuthors.map((author, index) => (
              <div key={author.id} className="featured-author" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="featured-author__header">
                  <div className="featured-author__avatar" style={{ background: author.color }} aria-hidden>{author.avatar}</div>
                  <div className="featured-author__info">
                    <h3 className="featured-author__name">{author.name}</h3>
                    <p className="featured-author__role">{author.role}</p>
                  </div>
                </div>

                <div className="featured-author__stats">
                  <div className="featured-author__stat">
                    <span className="featured-author__stat-value">{author.posts}</span>
                    <span className="featured-author__stat-label">Articles</span>
                  </div>
                  <div className="featured-author__stat">
                    <span className="featured-author__stat-value">{author.followers}</span>
                    <span className="featured-author__stat-label">Followers</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" fullWidth>
                  Follow Author
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="blog-faq">
        <div className="container">
          <div className="blog-faq__header animate-on-scroll">
            <h2 className="blog-faq__title">Frequently Asked Questions</h2>
            <p className="blog-faq__subtitle">Everything you need to know about our blog and content</p>
          </div>

          <div className="blog-faq__content">
            <div className="blog-faq__questions">
              {faqs.map((faq) => (
                <div key={faq.id} className={`blog-faq__question animate-on-scroll ${activeFAQ === faq.id ? 'active' : ''}`}>
                  <button className="blog-faq__question-header" onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)} aria-expanded={activeFAQ === faq.id}>
                    <span className="blog-faq__question-text">{faq.question}</span>
                    <span className="blog-faq__question-icon">{activeFAQ === faq.id ? '−' : '+'}</span>
                  </button>
                  <div className="blog-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-cta">
        <div className="container">
          <div className="newsletter-cta__content animate-on-scroll">
            <div className="newsletter-cta__badge"><AiOutlineRocket /> Exclusive</div>
            <h2 className="newsletter-cta__title">Never Miss an Update</h2>
            <p className="newsletter-cta__description">Join 50,000+ investors who receive our weekly newsletter with exclusive market insights, analysis, and investment opportunities.</p>

            <form className="newsletter-cta__form" onSubmit={handleSubscribe}>
              <div className="newsletter-cta__input-group">
                <input type="email" placeholder="Enter your email address" className="newsletter-cta__input" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
                <Button variant="primary" type="submit">Subscribe <FaArrowRight /></Button>
              </div>
              <div className="newsletter-cta__note">By subscribing, you agree to our Privacy Policy. No spam, ever.</div>
            </form>

            <div className="newsletter-cta__stats">
              <div className="newsletter-cta__stat">
                <div className="newsletter-cta__stat-value"><StatsCounter endValue={50} duration={2000} suffix="K+" /></div>
                <div className="newsletter-cta__stat-label">Subscribers</div>
              </div>
              <div className="newsletter-cta__stat">
                <div className="newsletter-cta__stat-value"><StatsCounter endValue={99} duration={2000} suffix="%" /></div>
                <div className="newsletter-cta__stat-label">Open Rate</div>
              </div>
              <div className="newsletter-cta__stat">
                <div className="newsletter-cta__stat-value"><StatsCounter endValue={24} duration={2000} /></div>
                <div className="newsletter-cta__stat-label">Hours Early Access</div>
              </div>
            </div>

            <div className="newsletter-cta__social">
              <h4 className="newsletter-cta__social-title">Follow Us</h4>
              <div className="newsletter-cta__social-links">
                <a href="#" className="newsletter-cta__social-link" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="newsletter-cta__social-link" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#" className="newsletter-cta__social-link" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className="newsletter-cta__social-link" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="newsletter-cta__social-link" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            <div className="newsletter-cta__guarantee"><span className="newsletter-cta__guarantee-icon"><FaAward /></span> Unsubscribe Anytime • No Spam • Exclusive Content • Early Access</div>
          </div>
        </div>

        <div className="newsletter-cta__background">
          <div className="newsletter-cta__particles">{[...Array(20)].map((_, i) => <div key={i} className={`newsletter-cta__particle particle-${i + 1}`} />)}</div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
