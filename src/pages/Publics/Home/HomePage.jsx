import CryptoMarquee from '@components/ui/CryptoMarquee';
import Hero from '@components/ui/Hero';
import React from 'react';
import WhyOurPlatformSection from '@pages/Publics/Home/WhyOurPlatformSection';
import HowItWorksSection from '@pages/Publics/Home/HowItWorksSection';
import EarningsSection from '@pages/Publics/Home/EarningSection';
import SecurityTrustSection from '@pages/Publics/Home/SecurityTrustSection';
import FAQSection from '@pages/Publics/Home/FAQSection';
import CTASection from '@pages/Publics/Home/CTASection';
import TestimonialsSection from '@pages/Publics/Home/TestimonialSection';



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
