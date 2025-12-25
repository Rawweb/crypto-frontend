const AboutHero = () => {
  return (
    <section className="relative pt-40 overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-brand-primary/10 blur-[140px]" />
      </div>

      <div className="container relative text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          Built to make crypto simple, secure, and accessible
        </h1>

        <p className="mt-6 text-text-secondary/70 md:text-lg">
          We’re building a modern crypto platform focused on clarity, trust, and
          control. No unnecessary complexity. No hidden mechanics.
        </p>

        <div className="mt-10 flex justify-center gap-10 text-sm text-text-muted">
          <span>
            <strong className="text-text-primary">58,000+</strong> users
          </span>
          <span>Global access</span>
          <span>24/7 availability</span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
