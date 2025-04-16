"use client";
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-primary)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] text-center"
          >
            Spill The Code
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-[var(--text-secondary)] text-center"
          >
            Academy of Intelligent Minds
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-64 h-64 my-12 relative"
          >
            {/* Placeholder for animated robot or GIF */}
            <div className="w-full h-full bg-[var(--background-secondary)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H9.229L7.5 13.729 5.771 12z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <button className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300"
            onClick={() => window.location.href = '/#contact-us'}>
              Contact Us
            </button>
            <button className="px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-md"
            onClick={() => window.location.href = '/courses'}>
              Explore Courses
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;