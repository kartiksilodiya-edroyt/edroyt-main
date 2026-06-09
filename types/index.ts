export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  process: { step: string; description: string }[];
  technologies: string[];
}

export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'devops';
  description: string;
  icon: string;
  logo?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  technologies: string[];
  results: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}
