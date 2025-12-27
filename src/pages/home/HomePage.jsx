import CryptoMarquee from '@components/ui/CryptoMarquee';
import Hero from '@components/ui/Hero';
import EarningsSection from '@pages/home/EarningSection';
import WhyOurPlatformSection from './WhyOurPlatformSection';
import HowItWorksSection from './HowItWorksSection';
import SecurityTrustSection from './SecurityTrustSection';
import CTASection from './CTASection';
import FAQSection from './FAQSection';
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
