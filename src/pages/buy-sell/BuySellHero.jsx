import Reveal from '@components/motion/Reveal';

const BuySellHero = () => {
  return (
    <section className="container relative pt-40 text-center max-w-3xl">
      <Reveal>
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-brand-primary/10 blur-[140px]" />
        </div>

        <div className="container relative text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Buy & sell crypto with confidence
          </h1>

          <p className="mt-6 text-text-secondary/70 md:text-lg">
            Deposit funds to buy crypto or withdraw your balance anytime through
            a secure and transparent process.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default BuySellHero;
