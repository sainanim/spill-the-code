"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const WhatMakesUsUniqueSection = () => {
  // Add responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Effect to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      title: "Unconventional but Effective",
      description: "Our teaching methods break away from traditional approaches, making learning more engaging and effective.",
      icon: "🚀"
    },
    {
      title: "Customized Learning Plans",
      description: "We adapt our curriculum to match each student's pace, interests, and learning style.",
      icon: "📊"
    },
    {
      title: "Future-Ready Skills",
      description: "We focus on skills that will remain relevant and valuable in the rapidly changing technological landscape.",
      icon: "🔮"
    },
    {
      title: "Hands-On & Interactive",
      description: "Learning by doing is at the core of our philosophy, with practical projects and real-world applications.",
      icon: "🛠️"
    }
  ];

  // Adjust stagger time based on device
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.15 : 0.2
      }
    }
  };

  // Adjust animation parameters based on device
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: isMobile ? 0.5 : 0.6 
      } 
    }
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-[#E0F2F7]">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.6 : 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1976D2] text-center mb-8 sm:mb-10 md:mb-12"
        >
          <span className="relative inline-block">
            What Makes Us Unique
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FFC000] translate-y-1"></span>
          </span>
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-[#FAF9F6] p-4 sm:p-5 md:p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full border-t-4 border-[#FFC000]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#1976D2] rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 border-2 border-[#FFC000] shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1976D2] mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-[#4B5563]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesUsUniqueSection;