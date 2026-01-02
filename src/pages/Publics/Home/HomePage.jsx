import CryptoMarquee from '@components/ui/CryptoMarquee';
import Hero from '@components/ui/Hero';
import React from 'react';
import WhyOurPlatformSection from './WhyOurPlatformSection';
import HowItWorksSection from './HowItWorksSection';
import EarningsSection from './EarningSection';
import SecurityTrustSection from './SecurityTrustSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import TestimonialsSection from './TestimonialSection';



const HomePage = () => {
  return (
    <main>
      <Hero />
      <CryptoMarquee />
      <WhyOurPlatformSection />
      <HowItWorksSection variant="home" />
      <EarningsSection />
      <SecurityTrustSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
