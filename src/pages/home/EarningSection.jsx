import { earningsData } from '@data/earningsData';
import EarningsCard from '@components/ui/EarningsCard';
import Reveal from '@components/motion/Reveal';

const EarningsSection = () => {
  return (
    <section className="container mt-32">
      <Reveal>
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-20 items-center">
          {/* left: visual */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute -top-14 left-7 z-10 ">
              {/* small floating card */}
              <div className="bg-bg-elevated rounded-xl px-4 py-3 flex items-center gap-4 shadow-lg">
                <div className="size-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  $
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">3,750 $</p>
                  <p className="text-xs text-text-muted">Earning of January</p>
                </div>
              </div>
            </div>

            <EarningsCard
              title="Earnings"
              amount="8,746"
              period="September"
              data={earningsData}
            />
          </div>

          {/* right: text */}
          <div className="w-full md:w-1/2 space-y-6 max-w-xl text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
              Track Your Earnings <br />
              Without the Guesswork
            </h2>

            <p className="text-text-secondary/70 md:text-lg ">
              Monitor your earnings with clean visuals and real-time insights.
              Stay informed, spot trends early, and make smarter financial
              decisions with ease.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default EarningsSection;
