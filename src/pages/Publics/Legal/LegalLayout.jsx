import Reveal from '@components/motion/Reveal';

const LegalLayout = ({ title, subtitle, sidebar, children }) => {
  return (
    <section className="container pt-40">
      <Reveal>
        {/* header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold">
            {title}
          </h1>
          <p className="mt-4 text-text-secondary/70 md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* layout */}
        <div className="grid gap-16 lg:grid-cols-[260px_1fr]">
          {/* sidebar */}
          <aside className="hidden lg:block sticky top-32 h-fit">
            <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-6">
              {sidebar}
            </div>
          </aside>

          {/* content */}
          <div className="space-y-16 text-text-secondary/80 leading-relaxed">
            {children}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default LegalLayout;
