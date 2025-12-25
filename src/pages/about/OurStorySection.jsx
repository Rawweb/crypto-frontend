import Reveal from '@components/motion/Reveal';

const OurStorySection = () => {
  return (
    <section className="container mt-32">
      <Reveal>
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div>
            <div className="flex gap-3 items-center mb-4">
              <div className="bg-brand-primary w-3 h-8" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Why we built this platform
              </h1>
            </div>

            <div className="space-y-5 text-text-secondary/70 md:text-lg">
              <p>
                Crypto has huge potential, but too many platforms make it harder
                than it needs to be. Confusing interfaces, unclear fees, and
                slow withdrawals create unnecessary friction.
              </p>

              <p>
                We built this platform to remove that friction. Every decision,
                from interface design to transaction flow, is focused on clarity
                and predictability.
              </p>

              <p>
                The goal is simple: give users full visibility and control
                without the noise.
              </p>
            </div>
          </div>

          {/* visual block */}
          <div className="relative h-80 rounded-2xl bg-bg-surface border border-bg-elevated flex items-center justify-center overflow-hidden">
            {/* glow */}
            <div className="absolute h-72 w-72 rounded-full bg-brand-primary/20 blur-[140px]" />

            {/* content */}
            <div className="relative z-10 text-center px-10">
              <p className="text-sm uppercase tracking-wider text-text-muted mb-3">
                Our focus
              </p>
              <h1 className="text-2xl font-semibold leading-snug">
                Clarity over complexity.
                <br />
                Control without noise.
              </h1>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default OurStorySection;
