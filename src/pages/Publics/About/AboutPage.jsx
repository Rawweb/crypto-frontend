import React from 'react';
import AboutHero from '@pages/Publics/About/AboutHero';
import OurStorySection from '@pages/Publics/About/OurStorySection';
import WhatMakesUsDifferent from '@pages/Publics/About/WhatMakesUsDifferent';
import SecurityPhilosophy from '@pages/Publics/About/SecurityPhilosophy';
import OurValuesSection from '@pages/Publics/About/OurValuesSection';
import WhoItsForSection from '@pages/Publics/About/WhoItsForSection';
import AboutMetrics from '@pages/Publics/About/AboutMetrics';
import CTASection from '@pages/Publics/Home/CTASection';


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
