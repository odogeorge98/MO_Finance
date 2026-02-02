import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
  };
  index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <div 
      className="testimonial-card animate-on-scroll"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="testimonial-card__header">
        <div className="testimonial-card__avatar">
          <img src={testimonial.avatar} alt={testimonial.name} />
        </div>
        <div className="testimonial-card__info">
          <h4 className="testimonial-card__name">{testimonial.name}</h4>
          <p className="testimonial-card__role">{testimonial.role}</p>
          <p className="testimonial-card__company">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="testimonial-card__rating">
        {'★'.repeat(5).split('').map((_, i) => (
          <span key={i} className={i < testimonial.rating ? 'star-filled' : 'star-empty'}>
            ★
          </span>
        ))}
      </div>
      
      <blockquote className="testimonial-card__content">
        "{testimonial.content}"
      </blockquote>
      
      <div className="testimonial-card__quote-icon">"</div>
    </div>
  );
};