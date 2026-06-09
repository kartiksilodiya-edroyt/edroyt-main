import { PortfolioProject } from '@/types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'fintech-platform',
    title: 'Enterprise Fintech Platform',
    client: 'Global Finance Corp',
    industry: 'Financial Services',
    description: 'A comprehensive fintech platform handling $2B+ in annual transactions with real-time processing, fraud detection, and regulatory compliance.',
    image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes', 'TensorFlow'],
    results: [
      'Processing $2B+ annual transactions',
      '99.99% uptime achieved',
      '60% reduction in fraud',
      'Real-time regulatory compliance',
    ],
    featured: true,
  },
  {
    id: 'healthcare-portal',
    title: 'Healthcare Management Portal',
    client: 'MedTech Solutions',
    industry: 'Healthcare',
    description: 'HIPAA-compliant patient management system serving 500+ healthcare facilities with integrated telemedicine and real-time health monitoring.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Azure', 'Docker', 'WebRTC'],
    results: [
      'Serving 500+ healthcare facilities',
      '10M+ patient records managed',
      'HIPAA and HITECH compliant',
      '40% improvement in patient outcomes',
    ],
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'Omnichannel E-commerce Platform',
    client: 'RetailMax Inc',
    industry: 'Retail',
    description: 'High-performance e-commerce platform handling millions of daily users with personalized recommendations and seamless checkout experiences.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    results: [
      '10M+ monthly active users',
      '300% increase in conversion rate',
      'Sub-second page load times',
      '35% increase in average order value',
    ],
    featured: true,
  },
  {
    id: 'ai-analytics',
    title: 'AI-Powered Analytics Dashboard',
    client: 'DataDriven Analytics',
    industry: 'Technology',
    description: 'Machine learning-powered business intelligence platform providing real-time insights and predictive analytics for enterprise decision-making.',
    image: 'https://images.pexels.com/photos/5900145/pexels-photo-5900145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS SageMaker', 'D3.js'],
    results: [
      'Processing 1B+ data points daily',
      '85% prediction accuracy',
      '50% reduction in analysis time',
      'Used by Fortune 500 companies',
    ],
    featured: false,
  },
  {
    id: 'logistics-platform',
    title: 'Smart Logistics Platform',
    client: 'LogiTech Transport',
    industry: 'Logistics',
    description: 'AI-optimized logistics platform managing fleet operations, route optimization, and real-time tracking for a major transportation company.',
    image: 'https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'MongoDB', 'Google Cloud', 'Kubernetes', 'TensorFlow'],
    results: [
      'Managing 500+ vehicle fleet',
      '25% fuel cost reduction',
      '99.5% on-time deliveries',
      'Real-time tracking and alerts',
    ],
    featured: false,
  },
  {
    id: 'education-platform',
    title: 'EdTech Learning Platform',
    client: 'LearnForward Education',
    industry: 'Education',
    description: 'Comprehensive online learning platform with AI-powered personalization, live classes, and progress tracking for K-12 and higher education.',
    image: 'https://images.pexels.com/photos/6325188/pexels-photo-6325188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'WebRTC', 'OpenAI'],
    results: [
      '500K+ active students',
      '95% course completion rate',
      '40% improvement in learning outcomes',
      'Accessible in 20+ languages',
    ],
    featured: false,
  },
];

export const getFeaturedProjects = (): PortfolioProject[] => {
  return portfolioProjects.filter(project => project.featured);
};

export const getProjectById = (id: string): PortfolioProject | undefined => {
  return portfolioProjects.find(project => project.id === id);
};
