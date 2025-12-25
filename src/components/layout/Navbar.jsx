import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa6';
import { HiX, HiMenu } from 'react-icons/hi';
import logo from '@assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', icon: <FiHome className="size-5" /> },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Buy & Sell', path: '/sell' },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b border-bg-elevated font-medium md:text-sm lg:text-base">
      <div className="container flex gap-4 items-center justify-between h-24">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <img
            src={logo}
            alt="logo"
            className="size-6 group-hover:scale-110 transition-transform"
          />
          <h1 className="font-bold text-xl">Crypto</h1>
        </Link>

        {/* nav links */}
        <div className="hidden md:flex items-center gap-4 md:gap-0 lg:gap-10 bg-bg-surface py-2 px-4 rounded-full">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `
            flex items-center justify-center
            py-3 px-4 rounded-3xl
            transition-colors
            ${
              isActive
                ? 'bg-bg-elevated text-brand-primary'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            }
            `
              }
            >
              {link.icon ?? link.label}
            </NavLink>
          ))}
        </div>

        {/* auth buttons */}
        <div className="hidden md:flex items-center gap-4 md:gap-3 lg:gap-6 ">
          <Link
            to="/login"
            className="hover:text-brand-hover transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-brand-primary py-3 px-6 rounded-full hover:bg-brand-hover transition-colors"
          >
            Sign-Up
          </Link>

          {/* profile */}
          <Link className="bg-brand-primary hover:bg-brand-hover p-3 rounded-full transition-colors">
            <FaRegUser className="size-5" />
          </Link>
        </div>
        {/* mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden hover:text-brand-hover transition-colors"
        >
          {isMenuOpen ? (
            <HiX className="size-6" />
          ) : (
            <HiMenu className="size-6" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`
    md:hidden overflow-hidden
    transition-all duration-300 ease-out
    ${
      isMenuOpen
        ? 'max-h-150 opacity-100 translate-y-0'
        : 'max-h-0 opacity-0 -translate-y-2'
    }
  `}
      >
        <div className="backdrop-blur-md bg-bg-surface border-t border-bg-elevated space-y-4 px-4">
          <div className="flex flex-col gap-4 py-4">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `
            flex items-center py-3 px-4 rounded-3xl transition-colors
            ${
              isActive
                ? 'bg-bg-elevated text-brand-primary'
                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
            }
            `
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon ?? link.label}
              </NavLink>
            ))}

            <div className="flex flex-col gap-4 mt-4 border-t border-bg-elevated pt-4">
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-3xl hover:bg-bg-elevated transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="bg-brand-primary p-3 rounded-full">
                  <FaRegUser className="size-5" />
                </span>
                <span className="text-text-primary font-medium">Profile</span>
              </Link>

              {/* Login */}
              <Link
                to="/login"
                className="text-center border border-bg-elevated py-3 rounded-full hover:bg-bg-elevated transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                to="/register"
                className="text-center bg-brand-primary py-3 rounded-full font-medium hover:bg-brand-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign-Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
