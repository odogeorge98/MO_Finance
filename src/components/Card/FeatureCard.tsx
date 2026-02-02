import React from 'react';
import './FeatureCard.css';

export type Feature = {
  id: number;
  icon: React.ReactNode; // Changed from string to React.ReactNode
  title: string;
  description: string;
  color: string;
};

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <div 
      className="feature-card animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="feature-card__content">
        <div 
          className="feature-card__icon-container"
          style={{ 
            backgroundColor: `${feature.color}15`,
            borderColor: `${feature.color}30`
          }}
        >
          <div className="feature-card__icon" style={{ color: feature.color }}>
            {feature.icon}
          </div>
        </div>
        
        <h3 className="feature-card__title">{feature.title}</h3>
        <p className="feature-card__description">{feature.description}</p>
        
        <div className="feature-card__hover-effect">
          <div 
            className="feature-card__hover-orb"
            style={{ backgroundColor: feature.color }}
          ></div>
        </div>
        
        <div 
          className="feature-card__decoration"
          style={{ backgroundColor: feature.color }}
        ></div>
      </div>
    </div>
  );
};

export default FeatureCard;