import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    company: 'Global Finance Corp',
    image: 'https://images.pexels.com/photos/7749095/pexels-photo-7749095.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Edroyt transformed our fintech platform from legacy systems to a modern, scalable architecture. Their team brought deep technical expertise and a genuine partnership mentality. The result was a 99.99% uptime platform processing over $2 billion annually.',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'CEO',
    company: 'MedTech Solutions',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Working with Edroyt was a game-changer for our healthcare platform. They delivered a HIPAA-compliant system that serves 500+ facilities. Their attention to security and user experience exceeded our expectations.',
  },
  {
    id: '3',
    name: 'Jennifer Park',
    role: 'VP of Digital',
    company: 'RetailMax Inc',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Edroyt rebuilt our e-commerce platform from the ground up. The new site handles millions of users daily with sub-second load times. Our conversion rate increased by 300%. They truly understand modern web architecture.',
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Director of Operations',
    company: 'LogiTech Transport',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Thanks to Edroyt\'s AI-powered logistics platform, we reduced fuel costs by 25% and improved on-time deliveries to 99.5%. Their team understood our complex logistics challenges and delivered innovative solutions.',
  },
  {
    id: '5',
    name: 'Amanda Liu',
    role: 'Chief Digital Officer',
    company: 'LearnForward Education',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Edroyt built an incredible learning platform used by 500,000+ students. Their AI-powered personalization features improved learning outcomes by 40%. They were responsive, professional, and truly invested in our success.',
  },
];

export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
  return testimonials.slice(0, count);
};
