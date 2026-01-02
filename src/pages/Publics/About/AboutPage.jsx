import React from 'react';
import AboutHero from './AboutHero';
import OurStorySection from './OurStorySection';
import WhatMakesUsDifferent from './WhatMakesUsDifferent';
import SecurityPhilosophy from './SecurityPhilosophy';
import OurValuesSection from './OurValuesSection';
import WhoItsForSection from './WhoItsForSection';
import AboutMetrics from './AboutMetrics';
import CTASection from '../Home/CTASection';


const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <OurStorySection />
      <WhatMakesUsDifferent />\
      <SecurityPhilosophy />
      <OurValuesSection />
      <WhoItsForSection />
      <AboutMetrics />
      <CTASection/>
    </>
  );
};

export default AboutPage;
