import { Link } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import Reveal from '@components/motion/Reveal';

const BuySellActions = () => {
  return (
    <section className="container mt-32">
      <Reveal>
        {/* top - heading */}
        <div className="text-center">
          <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-3">
            <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Choose how you want to proceed
            </h1>
          </div>

          <p className="text-text-secondary/70 md:text-lg">
            Deposit funds to buy crypto or withdraw your balance securely at any
            time.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 mt-24">
          {/* BUY */}
          <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-10 hover:border-brand-primary trasition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4">Buy crypto</h2>

            <p className="text-text-secondary/80 mb-6">
              Fund your wallet securely to start buying, holding, or investing
              in crypto on the platform.
            </p>

            <ul className="space-y-4 text-sm text-text-secondary/60 mb-8 flex flex-col uppercase">
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Deposit funds into your wallet
              </li>
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Balance updates after confirmation
              </li>
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Use funds for investments or holding
              </li>
            </ul>

            <Link
              to="/wallet"
              className="inline-flex items-center justify-center w-full py-4 rounded-full bg-brand-primary hover:bg-brand-hover font-medium transition-all"
            >
              Deposit funds
            </Link>
          </div>

          {/* SELL */}
          <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-10 hover:border-brand-primary trasition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4">Sell crypto</h2>

            <p className="text-text-secondary/70 mb-6">
              Withdraw your available balance anytime through a secure
              verification process on th platform.
            </p>

            <ul className="space-y-4 text-sm text-text-secondary/60 mb-8 flex flex-col uppercase">
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Request a withdrawal
              </li>
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Verification & approval
              </li>
              <li className="inline-flex items-center gap-1">
                <span>
                  <GoDotFill className="size-5 text-brand-primary" />
                </span>
                Funds released securely
              </li>
            </ul>

            <Link
              to="/wallet"
              className="inline-flex items-center justify-center w-full py-4 rounded-full border border-bg-elevated hover:bg-bg-elevated font-medium transition-all"
            >
              Withdraw funds
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default BuySellActions;
