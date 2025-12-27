const steps = [
  {
    title: 'Fund your wallet',
    text: 'Deposit funds securely into your account.',
  },
  {
    title: 'Use your balance',
    text: 'Buy, hold, or invest using available funds.',
  },
  {
    title: 'Request withdrawal',
    text: 'Submit a withdrawal request anytime.',
  },
  {
    title: 'Receive funds',
    text: 'Withdrawals are processed after verification.',
  },
];

const BuySellSteps = () => {
  return (
    <section className="container mt-32">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-semibold">
          How it works
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 text-center"
          >
            <p className="text-brand-primary font-semibold mb-2">
              Step {index + 1}
            </p>
            <h3 className="font-semibold mb-2">
              {step.title}
            </h3>
            <p className="text-text-secondary/70 text-sm">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuySellSteps;
