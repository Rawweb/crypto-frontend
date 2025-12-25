import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

import user1 from '@assets/user1.png';
import user2 from '@assets/user2.png';
import user3 from '@assets/user3.png';
import user4 from '@assets/user4.png';
import user5 from '@assets/user5.png';
import user6 from '@assets/user6.png';

import Reveal from '@components/motion/Reveal';

const testimonials = [
  {
    name: 'Daniel A.',
    role: 'Crypto Trader',
    image: user1,
    message:
      'The platform feels secure and straightforward. Withdrawals are fast, and I always know what’s happening with my funds.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'First-time Investor',
    image: user2,
    message:
      'Everything was easy to understand. I felt confident using the platform even without prior crypto experience.',
    rating: 4,
  },
  {
    name: 'Michael T.',
    role: 'Entrepreneur',
    image: user3,
    message:
      'Security was my biggest concern. The verification process gave me confidence from day one.',
    rating: 5,
  },
  {
    name: 'Amina R.',
    role: 'Freelancer',
    image: user4,
    message:
      'I like the transparency. No hidden fees, no confusion. Just a smooth experience.',
    rating: 4,
  },
  {
    name: 'Chris L.',
    role: 'Investor',
    image: user5,
    message:
      'Fast transactions and reliable support. The platform feels professionally built.',
    rating: 5,
  },
  {
    name: 'David O.',
    role: 'Startup Founder',
    image: user6,
    message: 'What stood out to me was how simple yet secure everything felt.',
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="mt-32 container">
      <Reveal>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          {/* top - heading */}
          <div>
            <div className="flex gap-2 lg:gap-4 items-center mb-3">
              <div className="bg-brand-primary w-3 h-7 lg:h-10" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                Testimonials
              </h1>
            </div>

            <p className="text-text-secondary/70 md:text-lg max-w-md">
              Real experiences from our users
            </p>
          </div>

          {/* Swiper navigation buttons */}
          <div className="flex items-center gap-3">
            <button
              className={`testimonial-prev size-10 rounded-full border border-bg-elevated flex items-center justify-center transition-all ${
                isBeginning
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-bg-elevated hover:text-brand-primary'
              } `}
            >
              <IoChevronBack className="size-5" />
            </button>

            <button
              className={`testimonial-next size-10 rounded-full border border-bg-elevated flex items-center justify-center transition-all ${
                isEnd
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-bg-elevated hover:text-brand-primary'
              } `}
            >
              <IoChevronForward className="size-5" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
          }}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          loop={false}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onAfterInit={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="overflow-hidden"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div
                className={`p-8 h-full min-h-87.5 flex flex-col justify-between transition-all duration-300 ${
                  index % 2 === 1
                    ? 'bg-bg-surface border border-bg-elevated'
                    : 'bg-bg-elevated border border-brand-primary/40'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{t.name}</h3>
                    <p className="text-sm text-text-secondary">{t.role}</p>
                  </div>
                  <FaQuoteRight className="ml-auto text-3xl text-brand-primary" />
                </div>

                {/* Text */}
                <p className="text-sm md:text-base mb-4 leading-relaxed text-text-secondary/80">
                  {t.message}
                </p>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < t.rating
                          ? 'text-brand-primary'
                          : index % 2 === 1
                          ? 'text-text-secondary/50'
                          : 'text-text-secondary/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
};

export default TestimonialSection;
