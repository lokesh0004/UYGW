export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorInitials: string;
  instructorColor: string;
  emoji: string;
  thumbGradient: string;
  badge?: string;
  badgeColor?: string;
  hours: number;
  lessons: number;
  price: number | "FREE";
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  hasCertificate: boolean;
  category: string;
}

export interface Category {
  emoji: string;
  name: string;
  count: number;
  color: string;
}

export interface Instructor {
  initials: string;
  name: string;
  role: string;
  company: string;
  students: string;
  courses: number;
  rating: number;
  gradient: string;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  initial: string;
  avatarGradient: string;
  rating: number;
}

export interface Stat {
  num: string;
  label: string;
  end: number;
  suffix: string;
  decimals?: number;
}
