import heroImg from '@assets/hero.png';
import { PiGlobe } from 'react-icons/pi';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Reveal from '@components/motion/Reveal';

const Hero = () => {
  const phrases = ['Secure', 'Fast', 'Reliable', 'Innovative'];

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    const el = heroRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const currentWord = phrases[wordIndex];

    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      // typing
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 120);
    } else if (!isDeleting && charIndex === currentWord.length) {
      // pause before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && charIndex > 0) {
      // deleting
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 80);
    } else if (isDeleting && charIndex === 0) {
      // move to next word
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, isVisible]);

  return (
    <section ref={heroRef} className="relative pt-40 overflow-hidden">
      <Reveal>
        {/* background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-1/5 h-100 w-100 rounded-full bg-brand-primary/20 blur-[140px]" />
        </div>

        <div className="container relative grid gap-12 md:grid-cols-2 items-center">
          {/* content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Make Crypto Transactions{' '}
              <span
                className="text-brand-primary inline-block whitespace-nowrap
                     min-w-0 md:min-w-[12ch]"
              >
                {displayText}
                <span
                  className={`inline-block w-0.5 h-[1em] bg-brand-primary ml-1 ${
                    isVisible ? 'animate-blink' : ''
                  }`}
                />
              </span>
            </h1>

            <p className="text-text-secondary/70 text-base md:text-lg max-w-xl mx-auto md:mx-0">
              Explore the future of finance with innovative solutions,
              seamlessly bridging traditional and digital economies.
            </p>

            <div className="flex items-center gap-3 justify-center md:justify-start text-text-muted">
              <PiGlobe className="size-6 text-brand-primary" />
              <p className="text-sm">
                <span className="font-medium text-text-primary">58,000+</span>{' '}
                users worldwide
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-1 md:gap-3 border border-bg-elevated rounded-full pl-5 pr-2 py-2 hover:bg-bg-elevated transition-colors group text-xs md:text-base"
            >
              <span className="font-medium">Unlock Financial Freedom</span>
              <span className="bg-brand-primary group-hover:bg-brand-hover rounded-full p-2 md:p-3">
                <MdOutlineArrowOutward className="size-5 group-hover:scale-125" />
              </span>
            </Link>
          </div>

          {/* image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={heroImg}
              alt="Crypto platform illustration"
              loading="lazy"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-float"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
