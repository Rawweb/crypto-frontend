import { useState } from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const [userCount, setUserCount] = useState(58000);

  return (
    <section className="bg-bg-surface/80 border-b border-bg-elevated mt-24">
      <div className="container py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Ready to take control of your crypto?
        </h2>

        <p className="text-text-secondary/70 mt-4 max-w-2xl mx-auto">
          Join{' '}
          <span className="text-text-primary font-medium">
            {userCount.toLocaleString()}+
          </span>{' '}
          users who trust our platform for secure, transparent, and seamless
          crypto transactions.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center justify-center mt-8 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-hover font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,101,0,0.35)]"
        >
          Create your free account
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
