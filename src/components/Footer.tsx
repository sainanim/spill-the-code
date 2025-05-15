'use client';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--text-primary)] text-white py-8">
      <div className="max-w mx-auto lg:px-16 md:px-8 px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
          
          {/* Logo, Brand, Email, Location */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center">
              <img
                src="/spill_the_code_logo.png"
                alt="Spill The Code Logo"
                className="w-8 h-8 object-contain mr-2"
              />
              <span className="text-lg font-semibold">Spill the Code</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaEnvelope />
              <a
                href="mailto:contact@spillthecode.com"
                className="hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                contact@spillthecode.com
              </a>
            </div>
            {/* Optional Location */}
            {/* <div className="text-sm text-gray-400">📍 Mumbai, India</div> */}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <Link
              href="/courses"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Courses
            </Link>
            <Link
              href="#about-us"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="#contact-us"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4 text-2xl">
            <a
              href="#"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-accent)] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {currentYear} Spill the Code. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
