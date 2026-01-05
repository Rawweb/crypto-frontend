import { Link, NavLink } from 'react-router-dom';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '@assets/logo.png';
import appStore from '@assets/appstore.png';
import playStore from '@assets/playstore.png';

const Footer = () => {
  const footerLinks = {
    pages: [
      { label: 'About', path: '/about' },
      { label: 'Buy & Sell', path: '/sell' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/pages/privacy-policy' },
      { label: 'Terms of Service', path: '/pages/terms-of-service' },
    ],
  };
  return (
    <footer className="bg-bg-surface border-t border-bg-elevated mt-20">
      <div className="container py-14">
        {/* top section */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="size-6" />
              <span className="font-bold text-lg">Crypto</span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              A secure and modern crypto platform built for buying, selling, and
              managing digital assets with confidence.
            </p>

            {/* social icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-bg-elevated hover:bg-brand-primary transition-colors"
              >
                <FaTwitter className="size-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-bg-elevated hover:bg-brand-primary  transition-colors"
              >
                <FaInstagram className="size-4" />
              </a>
            </div>
          </div>

          {/* navigation */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-bold">Company</h4>
            <div className="space-y-2 text-sm">
              {footerLinks.pages.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex hover:text-brand-hover transition-colors ${
                      isActive ? 'text-brand-hover' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* legal */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-bold">Legal</h4>
            <div className="space-y-2 text-sm">
              {footerLinks.legal.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex hover:text-brand-hover transition-colors ${
                      isActive ? 'text-brand-hover' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* app downloads */}
          <div className="space-y-4">
            <h4 className="text-text-primary font-bold">Get the app</h4>

            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="inline-block rounded-lg overflow-hidden hover:opacity-60 transition-opacity"
              >
                <img
                  src={appStore}
                  alt="Download on App Store"
                  className="h-9 w-auto"
                />
              </a>

              <a
                href="#"
                className="inline-block rounded-lg overflow-hidden hover:opacity-60 transition-opacity"
              >
                <img
                  src={playStore}
                  alt="Get it on Google Play"
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* gradient divider */}
        <div className="my-10 h-px bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-40" />

        {/* newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-sm">
            Stay updated with market insights and platform news.
          </p>

          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-bg-elevated px-4 py-3 rounded-full text-sm outline-none w-full md:w-64"
            />
            <button
              type="submit"
              className="bg-brand-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-hover transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* bottom bar */}
        <div className="mt-10 pt-6 border-t border-bg-elevated flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <span>© {new Date().getFullYear()} Crypto. All rights reserved.</span>
          <span>Built with security in mind.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
