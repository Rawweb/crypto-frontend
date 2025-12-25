import OurPlatformCards from '@components/ui/OurPlatformCards';
import React from 'react';

const WhyOurPlatformSection = () => {
  return (
    <section className="container mt-32">
      {/* top - heading */}
      <div className="text-center">
        <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-3">
          <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Why Our Platform
          </h1>
        </div>

        <p className='text-text-secondary/70 md:text-lg'>
          Everything you need to trade, earn, and manage crypto with confidence.
        </p>
      </div>
      {/* bottom - cards */}
      <div className='mt-24'>
        <OurPlatformCards/>
      </div>
    </section>
  );
};

export default WhyOurPlatformSection;
