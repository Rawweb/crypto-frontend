import { useEffect, useState } from 'react';
import api from '@api/axios';
import Reveal from '@components/motion/Reveal';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    api.get('/faqs').then(res => {
      setFaqs(res.data);
    });
  }, []);

  return (
    <section className="container mt-32">
      <Reveal>
        {/* heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary/70 mt-2">
            Clear answers to common questions.
          </p>
        </div>

        {/* list */}
        <div className="max-w-3xl mx-auto divide-y divide-bg-elevated">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq._id} className="py-6">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <span
                    className={`text-brand-primary transition ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-4 text-text-secondary/70">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};

export default FAQSection;
