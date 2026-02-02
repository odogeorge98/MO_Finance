export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  instructor: string;
  rating: number;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';