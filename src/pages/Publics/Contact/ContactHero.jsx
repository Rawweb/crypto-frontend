import Reveal from '@components/motion/Reveal';

const ContactHero = () => {
  return (
    <section className="container pt-40 text-center max-w-3xl">
      <Reveal>
        {/* top - heading */}
        <div className="text-center">
          <div className="flex gap-2 lg:gap-4 items-center  justify-center mb-3">
            <div className="bg-brand-primary w-3 h-7 lg:h-10"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Contact Us
            </h1>
          </div>

          <p className="text-text-secondary/70 md:text-lg">
            We’re here to help with questions, support, or general inquiries.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default ContactHero;
