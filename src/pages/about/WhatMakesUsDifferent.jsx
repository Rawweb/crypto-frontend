import OurPlatformCards from '@components/ui/OurPlatformCards';

const WhatMakesUsDifferent = () => {
  return (
    <section className="container mt-32">
      {/* heading */}
      <div className="text-center mb-20">
        <div className="flex gap-3 items-center justify-center mb-4">
          <div className="bg-brand-primary w-3 h-8" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            What Makes Us Different
          </h2>
        </div>

        <p className="text-text-secondary/70 md:text-lg max-w-2xl mx-auto">
          Built with intention. Designed to remove friction, not add complexity.
        </p>
      </div>

      {/* reuse existing cards */}
      <OurPlatformCards variant="about" />
    </section>
  );
};

export default WhatMakesUsDifferent;
