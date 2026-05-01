"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Define the scroll handler
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      // Only update state if it actually changes to prevent unnecessary re-renders
      // and an infinite loop if setScrolled was in dependencies for this.
      setScrolled(currentScrolled => {
        if (currentScrolled !== isScrolled) {
          return isScrolled;
        }
        return currentScrolled;
      });
    };

    // Call it once on mount to set the initial scroll state
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array: effect runs only on mount and unmount

  const navLinks = [
    { name: 'Our Team', href: '/team' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/#about-us' },
    { name: 'Summer Camps', href: '/#summer-camps' },
    { name: 'Contact Us', href: '/#contact-us' }
  ];
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link href="/">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center cursor-pointer"
            >
              {/* Logo */}
              <img 
                src="/spill_the_code_logo.png" 
                alt="Spill The Code Logo" 
                className="w-10 h-10 object-contain mr-3" 
              />
              
              {/* Brand Name */}
              <span className="text-xl font-bold text-[var(--color-primary)]">Spill the Code</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <Link 
                  href={link.href}
                  className="text-[var(--text-primary)] hover:text-[var(--color-primary)] font-medium relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} // Make sure AnimatePresence is used if you want exit animations
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--background-secondary)] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;