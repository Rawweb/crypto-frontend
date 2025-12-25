import Reveal from '@components/motion/Reveal';

const supportOptions = [
  {
    title: 'Support',
    description: 'Account issues, transactions, and withdrawals.',
    contact: 'support@yourdomain.com',
  },
  {
    title: 'General inquiries',
    description: 'Questions, partnerships, or feedback.',
    contact: 'info@yourdomain.com',
  },
  {
    title: 'Platform help',
    description: 'Get help directly from inside your dashboard.',
    contact: 'Available in-app',
  },
];

const SupportOptions = () => {
  return (
    <section className="container mt-32">
      <Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {supportOptions.map((item, index) => (
            <div
              key={index}
              className="bg-bg-surface border border-bg-elevated rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-text-secondary/70 mb-4">{item.description}</p>
              <p className="text-sm text-brand-primary">{item.contact}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default SupportOptions;
