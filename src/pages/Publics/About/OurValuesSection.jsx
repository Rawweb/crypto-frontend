import Reveal from '@components/motion/Reveal';

const values = [
  {
    title: 'Transparency over hype',
    text: 'We communicate clearly and avoid promises we can’t back up.',
  },
  {
    title: 'Security by default',
    text: 'Protection is built into the platform, not added later.',
  },
  {
    title: 'User-first decisions',
    text: 'Every feature exists to improve clarity, safety, or control.',
  },
  {
    title: 'Simplicity with purpose',
    text: 'Less noise. More focus. Better decisions.',
  },
];

const OurValuesSection = () => {
  return (
    <section className="container mt-32">
      <Reveal>
        {/* heading */}
        <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-16">
          <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Our Values
          </h1>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {values.map((item, index) => (
            <div
              key={index}
              className="relative bg-bg-surface border border-bg-elevated rounded-2xl p-8"
            >
              {/* accent */}
              <div className="absolute left-0 top-6 h-10 w-1 bg-brand-primary rounded-full" />

              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-text-secondary/70">{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default OurValuesSection;
