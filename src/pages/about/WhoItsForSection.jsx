const audience = [
  'People new to crypto who want clarity',
  'Traders who value speed and reliability',
  'Investors who care about transparency',
  'Anyone tired of overcomplicated dashboards',
];

const WhoItsForSection = () => {
  return (
    <section className="container mt-32 max-w-4xl">
      {/* heading */}
      <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-16">
        <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          Who This Platform Is For
        </h1>
      </div>

      <div className="bg-bg-surface border border-bg-elevated rounded-2xl divide-y divide-bg-elevated">
        {audience.map((item, index) => (
          <div key={index} className="px-8 py-6">
            <p className="text-text-secondary/80 text-lg">{item}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-text-muted">
        If you value control, visibility, and trust, you’ll feel at home here.
      </p>
    </section>
  );
};

export default WhoItsForSection;
