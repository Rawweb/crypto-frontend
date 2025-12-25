import React from 'react';

const trustMetrics = [
  { value: '100%', label: 'Encrypted Transactions' },
  { value: '24/7', label: 'System Monitoring' },
  { value: '0', label: 'Middlemen Involved' },
  { value: 'Multi-Layer', label: 'Account Protection' },
];

const SecurityTrustSection = () => {
  return (
    <section className="mt-32">
      <div className="bg-bg-surface/80 border-y border-bg-elevated">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          {/* heading */}
          <div className="flex gap-2 lg:gap-4 items-center justify-center mb-6">
            <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Security & Trust
            </h1>
          </div>

          {/* core statement */}
          <p className="text-text-secondary/70 md:text-lg leading-relaxed">
            We don’t treat security as a feature. It’s the foundation of how the
            platform is built. Every account, every transaction, and every
            withdrawal is protected by multiple layers of verification and
            encrypted infrastructure.
          </p>

          {/* divider */}
          <div className="my-16 h-px bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-40" />

          {/* trust metrics */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustMetrics.map((item, index) => (
              <div key={index}>
                <p className="text-3xl font-semibold text-brand-primary">
                  {item.value}
                </p>
                <p className="text-text-secondary/70 mt-2 text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;
