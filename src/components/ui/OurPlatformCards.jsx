import decentralizedIcon from '@assets/decentralized.png';
import fastTransactionIcon from '@assets/fastTransaction.png';
import securityIcon from '@assets/security.png';
import lowFeesIcon from '@assets/lowFees.png';
import supportIcon from '@assets/support.png';
import transparencyIcon from '@assets/transparency.png';

import clarityIcon from '@assets/transparency.png';
import noHiddenIcon from '@assets/noHidden.png';
import userFocusIcon from '@assets/userFocus.png';


const landingCards = [
  {
    icon: decentralizedIcon,
    title: 'Decentralized',
    description:
      'Your assets stay in your hands. Trades run on decentralized infrastructure without relying on centralized authorities.',
  },
  {
    icon: fastTransactionIcon,
    title: 'Fast transactions',
    description:
      'Execute trades and transfers instantly with optimized infrastructure built for speed.',
  },
  {
    icon: lowFeesIcon,
    title: 'Low fees',
    description:
      'Enjoy competitive fees designed to maximize your returns without hidden charges.',
  },
  {
    icon: securityIcon,
    title: 'Top-tier security',
    description:
      'Advanced security measures protect your funds and personal data at all times.',
  },
  {
    icon: supportIcon,
    title: '24/7 support',
    description:
      'Our dedicated support team is always available to assist you whenever you need help.',
  },
  {
    icon: transparencyIcon,
    title: 'Full transparency',
    description:
      'Clear processes and open records ensure trust and confidence in every transaction.',
  },
];

const aboutCards = [
  {
    icon: clarityIcon,
    title: 'Clarity by design',
    description:
      'Every screen shows what matters. Balances, fees, and activity are always visible.',
  },
  {
    icon: noHiddenIcon,
    title: 'No hidden mechanics',
    description:
      'What you see is exactly what you get. No surprises or unclear conditions.',
  },
  {
    icon: userFocusIcon,
    title: 'Built for real users',
    description:
      'Beginner-friendly without limiting experienced users or advanced workflows.',
  },
];

const OurPlatformCards = ({ variant = 'landing' }) => {
  const cards = variant === 'about' ? aboutCards : landingCards;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative bg-bg-surface p-8 rounded-2xl flex flex-col items-center text-center space-y-6 border border-bg-elevated hover:border-brand-primary transition-all duration-300 overflow-hidden"
        >
          {/* icon */}
          <div className="relative z-10 flex items-center justify-center">
            {/* glow */}
            <div className="absolute h-14 w-14 rounded-full bg-brand-primary/70 blur-[30px]" />

            <img
              src={card.icon}
              alt={card.title}
              className="relative size-28 animate-float"
            />
          </div>

          {/* text */}
          <div className="relative z-10">
            <h1 className="text-2xl font-semibold">{card.title}</h1>
            <p className="text-text-secondary/70 text-sm lg:text-base mt-2">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurPlatformCards;
