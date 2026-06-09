import Hero from '@/components/sections/Hero';
import CompanyOverview from '@/components/sections/CompanyOverview';
import ServicesPreview from '@/components/sections/ServicesPreview';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import DevelopmentProcess from '@/components/sections/DevelopmentProcess';
import TechnologiesPreview from '@/components/sections/TechnologiesPreview';
import FeaturedPortfolio from '@/components/sections/FeaturedPortfolio';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <ServicesPreview />
      <WhyChooseUs />
      <DevelopmentProcess />
      <TechnologiesPreview />
      <FeaturedPortfolio />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
