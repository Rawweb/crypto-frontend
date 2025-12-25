import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Create an account',
    description:
      'Sign up securely and verify your email to activate your account.',
  },
  {
    step: '02',
    title: 'Fund your wallet',
    description: 'Deposit funds easily and get ready to trade or invest.',
  },
  {
    step: '03',
    title: 'Trade & grow',
    description: 'Buy, sell, or invest in crypto with real-time tracking.',
  },
  {
    step: '04',
    title: 'Withdraw anytime',
    description:
      'Access your earnings whenever you want with fast withdrawals.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="container mt-32">
      {/* top - heading */}
      <div className="text-center">
        <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-3">
          <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            How It Works
          </h1>
        </div>

        <p className="text-text-secondary/70 md:text-lg">
          Get started in minutes. No complexity, no confusion.
        </p>
      </div>
      {/* bottom - cards */}
      <div className="mt-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-bg-surface border border-bg-elevated rounded-2xl p-8 text-center space-y-4 overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1
"
            >
              {/* icon placeholder */}
              <div className="flex justify-center ">
                <div className="relative">
                  <div className="absolute h-10 w-10 rounded-full bg-brand-primary/60 blur-[25px]" />
                  <div className="relative h-14 w-14 rounded-full bg-bg-main flex items-center justify-center border border-bg-elevated group-hover:border-brand-primary transition-all duration-300">
                    <span className="text-lg font-semibold text-brand-primary group-hover:text-text-secondary transition-colors">
                      {item.step}
                    </span>
                  </div>
                </div>
              </div>

              {/* content */}
              <h3 className="text-lg font-semibold mt-4 group-hover:text-brand-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-text-secondary/70 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
