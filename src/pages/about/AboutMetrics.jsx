import Reveal from '@components/motion/Reveal';

const AboutMetrics = () => {
  return (
    <section className="container mt-32 text-center">
      <Reveal>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-3xl font-semibold text-brand-primary">58,000+</p>
            <p className="text-text-secondary/70">Active users</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-brand-primary">Global</p>
            <p className="text-text-secondary/70">Accessibility</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-brand-primary">Fast</p>
            <p className="text-text-secondary/70">Withdrawals</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-brand-primary">24/7</p>
            <p className="text-text-secondary/70">Availability</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutMetrics;
