"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const DescriptionSection = () => {
  // Add state to track viewport width
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  
  // Effect to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 360); // Extra small screens
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card animation variants - adjust based on viewport
  const leftCardVariant = {
    hidden: { opacity: 0, x: isMobile ? -30 : -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: isMobile ? 0.5 : 0.8, 
        ease: "easeOut"
      }
    }
  };

  const rightCardVariant = {
    hidden: { opacity: 0, x: isMobile ? 30 : 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: isMobile ? 0.5 : 0.8, 
        ease: "easeOut"
      }
    }
  };

  // For mobile, use y translation instead of x for better visual flow
  const mobileCardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };

  // Bullet points animation variants
  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -15 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4 
      }
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-[#FAF9F6] w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Side-by-side cards container - stacks on mobile */}
        <div className="flex flex-col md:flex-row gap-5 lg:gap-8 max-w-6xl mx-auto">
          {/* Who we are section - Left card */}
          <motion.div
            variants={isMobile ? mobileCardVariant : leftCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="w-full md:w-1/2 mb-5 md:mb-0"
          >
            <div className="h-full w-full bg-gradient-to-br from-[#FAF9F6] to-[#E0F2F7] border-l-4 border-[#FFC000] shadow-lg rounded-lg overflow-hidden p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1976D2] mb-3">
                <span className="border-b-2 border-[#FFC000] pb-1">Who We Are</span>
              </h2>
              
              <p className="text-[#1E293B] text-sm lg:text-base mb-3">
                We are dreamers, doers, and builders of the future. Our academy was born out of a simple belief: that every child deserves the opportunity to explore the world of technology.
              </p>
              
              <motion.ul 
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#FFC000] text-[#1E293B] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">A community fostering curiosity and creativity</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Team of passionate educators and engineers</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Personalized attention for every student</span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>

          {/* What we do section - Right card */}
          <motion.div
            variants={isMobile ? mobileCardVariant : rightCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="w-full md:w-1/2"
          >
            <div className="h-full w-full bg-gradient-to-bl from-[#FAF9F6] to-[#E0F2F7] border-r-4 border-[#FFC000] shadow-lg rounded-lg overflow-hidden p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1976D2] mb-3">
                <span className="border-b-2 border-[#FFC000] pb-1">What We Do</span>
              </h2>
              
              <p className="text-[#1E293B] text-sm lg:text-base mb-3">
                We provide a vibrant, interactive learning experience that brings technology to life for students aged 8 to 22.
              </p>
              
              <motion.ul 
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Hands-on courses in AI, Coding, and Robotics</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Project-based learning with real applications</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Digital tools and logic-based challenges</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[#1976D2] text-[#FAF9F6] rounded-full w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="text-[#1E293B] text-xs sm:text-sm">Programs for all skill levels</span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4 sm:p-5 md:p-6 bg-[#E0F2F7] rounded-lg shadow-md my-5 sm:my-8 mx-3 sm:mx-auto border-t-4 border-[#FFC000]"
      >
        <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] mb-2 sm:mb-3 text-center">
            Meet the Minds Behind Our Magic
        </h2>

        <p className="text-[#4B5563] mb-4 text-center text-xs sm:text-sm max-w-md">
            We're a collective of passionate creators, innovators, and problem-solvers.
            Discover the people driving our vision forward.
        </p>

        <motion.button
            whileHover={{
                scale: 1.03,
                backgroundColor: "#FFC000",
                color: "#FAF9F6",
                boxShadow: "0px 4px 12px rgba(255, 192, 0, 0.25)",
            }}
            whileTap={{
                scale: 0.95,
                boxShadow: "0px 2px 6px rgba(255, 192, 0, 0.20)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="px-4 py-2 bg-[#1976D2] text-[#FAF9F6] font-semibold rounded-full shadow-md text-xs sm:text-sm border-2 border-[#FFC000]"
            onClick={() => window.location.href = '/team'}
        >
            Learn more about our team
        </motion.button>
      </motion.div>
    </section>
  );
};

export default DescriptionSection;