import React from 'react';
import { FaStarOfLife } from 'react-icons/fa6';

const Marquee = () => {
  const marqueeItems = [
    'Instant Withdrawals',
    'Seamless Integration',
    'Secure Platform',
    '24/7 Support',
    'User-Friendly Interface',
    'No Hidden Fees',
    'Low Transaction Fees',
    'Easy to Use',
    'Global Access',
    'Advanced Security',
    'Fast Transactions',
  ];
  return (
    <div className="overflow-hidden bg-transparent hover:bg-bg-elevated/20 border-t border-b border-bg-elevated">
      <div className="flex whitespace-nowrap gap-10 py-4 animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <FaStarOfLife className="size-5 text-brand-primary" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
