import { Statistic, TimelineEvent, ProcessStep } from '@/types';

export const companyInfo = {
  name: 'Edroyt',
  tagline: 'Lorem Ipsum Dolor Sit Amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.',
  founded: 2018,
  headquarters: 'San Francisco, CA',
  employees: '150+',
  servicesCount: 6,
  clientsCount: '200+',
};

export const statistics: Statistic[] = [
  { label: 'Years of Experience', value: 8, suffix: '+' },
  { label: 'Projects Delivered', value: 500, suffix: '+' },
  { label: 'Industries Served', value: 15, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
];

export const timelineEvents: TimelineEvent[] = [
  { year: '2018', title: 'Lorem Ipsum Founded', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { year: '2019', title: 'Lorem Ipsum Client', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { year: '2020', title: 'Lorem Ipsum Launched', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { year: '2021', title: 'Lorem Ipsum Expansion', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { year: '2022', title: 'Lorem Ipsum Milestone', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { year: '2024', title: 'Lorem Ipsum Growth', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

export const developmentProcess: ProcessStep[] = [
  { step: 1, title: 'Discovery', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'Search' },
  { step: 2, title: 'Planning', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'ClipboardList' },
  { step: 3, title: 'Design', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'PenTool' },
  { step: 4, title: 'Development', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'Code2' },
  { step: 5, title: 'Testing', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'TestTube' },
  { step: 6, title: 'Launch', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'Rocket' },
];

export const whyChooseUs = [
  { title: 'Expert Engineering Team', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', icon: 'Users' },
  { title: 'Agile Development Process', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', icon: 'Zap' },
  { title: 'Scalable Architecture', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', icon: 'TrendingUp' },
  { title: 'Long-Term Partnership', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', icon: 'Heart' },
];

export const coreValues = [
  { title: 'Excellence', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Innovation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Integrity', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Collaboration', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

export const heroBadges = [
  { label: 'React', icon: 'atom' },
  { label: 'Next.js', icon: 'triangle' },
  { label: 'TypeScript', icon: 'file-code' },
  { label: 'AWS', icon: 'cloud' },
  { label: 'AI/ML', icon: 'brain' },
];
