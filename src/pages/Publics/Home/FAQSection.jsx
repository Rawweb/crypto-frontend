import { useState } from 'react';
import Reveal from '@components/motion/Reveal';

const leftFaqs = [
  {
    question: 'Is my money safe on this platform?',
    answer:
      'Yes. We use multi-layer security, encrypted transactions, and strict account verification to protect user funds at all times.',
  },
  {
    question: 'How fast are withdrawals processed?',
    answer:
      'Withdrawals are processed quickly, with most requests completed shortly after verification.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. All fees are transparent and clearly displayed before you confirm any transaction.',
  },
  {
    question: 'Do I need prior crypto experience to use the platform?',
    answer:
      'Not at all. The platform is designed to be beginner-friendly while still offering advanced tools.',
  },
  {
    question: 'How is my account protected from unauthorized access?',
    answer:
      'We use email verification, OTP-based security, and strong password enforcement to protect accounts.',
  },
];

const rightFaqs = [
  {
    question: 'Is my personal data stored securely?',
    answer:
      'Yes. All personal data is encrypted and handled according to strict security standards.',
  },
  {
    question: 'Can I access my funds anytime?',
    answer:
      'Yes. You remain in control of your assets and can request withdrawals whenever you choose.',
  },
  {
    question: 'What happens if I forget my password?',
    answer:
      'You can securely reset your password using our email and OTP-based recovery process.',
  },
  {
    question: 'Is this platform centralized or decentralized?',
    answer:
      'The platform operates with decentralized principles, minimizing reliance on intermediaries.',
  },
  {
    question: 'How do I contact support if I need help?',
    answer:
      'Our support team is available to assist you through the platform whenever you need help.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const renderFaqColumn = (faqs, offset = 0) =>
    faqs.map((faq, index) => {
      const currentIndex = index + offset;
      const isOpen = openIndex === currentIndex;

      return (
        <div key={currentIndex} className="py-6">
          <button
            onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
            aria-expanded={isOpen}
            className="group w-full flex items-start justify-between gap-4 text-left"
          >
            <span className="text-sm md:text-lg font-medium uppercase">
              {faq.question}
            </span>

            <span
              className={`text-brand-primary transition-transform duration-300 ${
                isOpen ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>

          <div
            className={`grid transition-all duration-300 ${
              isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-text-secondary/70 max-w-xl">{faq.answer}</p>
            </div>
          </div>
        </div>
      );
    });

  return (
    <section className="container mt-32">
      <Reveal>
        {/* top - heading */}
        <div className="text-center mb-16">
          <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-3">
            <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Frequently Asked Questions
            </h1>
          </div>

          <p className="text-text-secondary/70 md:text-lg">
            Clear answers to common questions, so you can get started with
            confidence.
          </p>
        </div>

        {/* faq columns */}
        <div className="grid gap-x-16 lg:grid-cols-2">
          <div className="divide-y divide-bg-elevated">
            {renderFaqColumn(leftFaqs, 0)}
          </div>

          <div className="divide-y divide-bg-elevated">
            {renderFaqColumn(rightFaqs, leftFaqs.length)}
          </div>
        </div>

        {/* bottom - call to action */}
        <div className="mt-20 text-center">
          <p className="text-text-secondary/70">Still have questions?</p>
          <a
            href="/contact"
            className="text-brand-primary hover:text-brand-hover transition-colors font-medium"
          >
            Contact our support team
          </a>
        </div>
      </Reveal>
    </section>
  );
};

export default FAQSection;
