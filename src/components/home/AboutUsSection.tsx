"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AboutUsSectionProps {
  id?: string;
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ id }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Theme colors
  const theme = {
    primary: "#1976D2",      // Blue primary color
    accent: "#FFC000",       // Yellow accent color
    primaryLight: "#E3F2FD", // Light blue for backgrounds
    accentLight: "#FFF8E1",  // Light yellow for backgrounds
  };

  // Values that animate on hover with complementary colors based on theme
  const values = [
    {
      title: "Innovation",
      description: "We constantly evolve our teaching methods and curriculum to stay at the cutting edge of technology education.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: theme.accent,
      bgColor: theme.accentLight,
    },
    {
      title: "Inclusivity",
      description: "We believe technology education should be accessible to all children regardless of background or prior experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: theme.accent,
      bgColor: theme.accentLight,
    },
    {
      title: "Creativity",
      description: "We foster environments where imagination and technical skills combine to create meaningful projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: theme.accent,
      bgColor: theme.accentLight,
    }
  ];

  return (
    <section id={id} className="py-12 sm:py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1976D2] mb-4 sm:mb-6">About Us</h2>
        </motion.div>
        
        {/* Main content: Text on top for mobile, Text on left, Mind Map on right for desktop */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Left side: Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p 
                variants={textItem}
                className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
              >
                Spill the Code started with just a few of us, friends who loved learning about coding, AI, and building cool things together. We’d meet up, share what we were working on, and help each other figure things out. It was casual, fun, and full of curiosity. What began as a small group has now grown into something much bigger.

              </motion.p>
              
              <motion.p 
                variants={textItem}
                className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
              >
                Today, we’re proud to be teaching over 20 kids in Mississauga, introducing them to programming, robotics, and tech in a way that’s hands-on, creative, and exciting.

              </motion.p>
              
              <motion.p 
                variants={textItem}
                className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
              >
                Our goal is simple: make coding accessible and fun for everyone. We want young people to feel confident using technology, not just as users, but as creators. Whether it’s building their first website, learning how AI works, or just getting curious about how things are made, we’re here to guide and support them.
              </motion.p>
              <motion.p 
                variants={textItem}
                className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6"
              >
                Spill the Code is more than just classes, it's a growing community, and we’re just getting started.

              </motion.p>
            </motion.div>
            
            {/* Stats Counter on the left side - MODIFIED TO MAKE ALL NUMBERS YELLOW */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-8 md:mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-[#FFC000]/20"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-2 sm:p-3 relative"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFC000]/10 rounded-full -translate-y-1/4 translate-x-1/4 z-0"></div>
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.2
                    }}
                    className="text-2xl sm:text-3xl font-bold mb-1 relative z-10"
                  >
                    <span className="text-[#FFC000]">500+</span>
                  </motion.div>
                  <p className="text-slate-600 text-sm sm:text-base relative z-10">Students Taught</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-2 sm:p-3 relative"
                >
                  <div className="absolute top-0 left-0 w-14 h-14 bg-[#FFC000]/10 rounded-full -translate-y-1/4 -translate-x-1/4 z-0"></div>
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.4
                    }}
                    className="text-2xl sm:text-3xl font-bold mb-1 relative z-10"
                  >
                    <span className="text-[#FFC000]">20+</span>
                  </motion.div>
                  <p className="text-slate-600 text-sm sm:text-base relative z-10">Expert Educators</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="p-2 sm:p-3 relative"
                >
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#FFC000]/10 rounded-full translate-y-1/4 translate-x-1/4 z-0"></div>
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.6
                    }}
                    className="text-2xl sm:text-3xl font-bold mb-1 relative z-10"
                  >
                    <span className="text-[#FFC000]">1000+</span>
                  </motion.div>
                  <p className="text-slate-600 text-sm sm:text-base relative z-10">Projects Completed</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side: Mind Map Layout with responsive adjustments */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            {/* Stack view for mobile, circle layout for desktop */}
            {isMobile ? (
              // Mobile stacked layout
              <div className="flex flex-col gap-6 py-6">
                {/* Center AIM Logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-center"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-lg relative overflow-hidden"
                  >
                    <motion.div 
                      animate={{ 
                        background: [
                          `linear-gradient(120deg, ${theme.primaryLight}, #dbeafe)`,
                          `linear-gradient(240deg, #dbeafe, ${theme.accentLight})`,
                          `linear-gradient(360deg, ${theme.accentLight}, ${theme.primaryLight})`
                        ]
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0"
                    />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1976D2]">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-2xl sm:text-3xl font-bold"
                      >
                        AIM
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xs font-medium mt-1 tracking-wider text-center px-2"
                      >
                        Academy of Intelligent Minds
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Stacked value cards */}
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg border-2 p-5 shadow-md"
                      style={{ 
                        borderColor: value.color, 
                        backgroundColor: value.bgColor,
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${value.color}20`, color: value.color }}
                        >
                          {value.icon}
                        </div>
                        <h4 className="text-lg font-bold" style={{ color: value.color }}>
                          {value.title}
                        </h4>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop mindmap layout
              <div className="relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[620px] flex items-center justify-center">
                {/* Center AIM Logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-full shadow-lg relative overflow-hidden border-4 border-white"
                  >
                    <motion.div 
                      animate={{ 
                        background: [
                          `linear-gradient(120deg, ${theme.primaryLight}, #dbeafe)`,
                          `linear-gradient(240deg, #dbeafe, ${theme.accentLight})`,
                          `linear-gradient(360deg, ${theme.accentLight}, ${theme.primaryLight})`
                        ]
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0"
                    />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1976D2]">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-2xl sm:text-3xl font-bold"
                      >
                        AIM
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xs font-medium mt-2 tracking-wider text-center px-2"
                      >
                        Academy of Intelligent Minds
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Values cards with floating animation and adjustable positioning */}
                {values.map((value, index) => {
                  // Calculate positions at 120 degree intervals around the circle
                  const angle = (index * 120) * (Math.PI / 180);
                  
                  // Responsive radius based on screen size
                  const radius = window.innerWidth < 1024 ? 160 : 200; // Smaller radius for medium screens
                  
                  // Calculate x,y coordinates based on angle
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 * index }}
                      className="absolute left-1/2 top-1/2"
                      style={{ 
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      {/* Card with floating animation */}
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0], 
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5 // Stagger the animations
                        }}
                        className="relative"
                      >
                        {/* Connection line to center - glowing dot */}
                        <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
                            style={{ 
                              backgroundColor: value.color,
                              boxShadow: `0 0 12px ${value.color}`,
                              transform: `translate(-50%, -50%)` 
                            }}
                        ></div>
                        
                        <motion.div
                          className="w-2 h-2" 
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: value.color,
                          }}
                        />
                        
                        {/* Line connecting to center with gradient effect */}
                        <div 
                          className="absolute left-1/2 top-1/2 -z-10"
                          style={{
                            width: Math.sqrt(x*x + y*y),
                            height: '3px',
                            background: `linear-gradient(to right, ${theme.primary}60, ${value.color})`,
                            transformOrigin: '0 0',
                            transform: `rotate(${Math.atan2(y, x)}rad) translate(-50%, -50%)`,
                            boxShadow: '0 0 5px rgba(0,0,0,0.1)'
                          }}
                        />
                          
                        <motion.div
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05)"  
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg border-2 p-4 sm:p-5 shadow-xl w-44 sm:w-52 md:w-56"
                          style={{ 
                            borderColor: value.color, 
                            backgroundColor: value.bgColor,
                            marginTop: '-80px', // Offset to center the card
                            marginLeft: '-88px', // Offset to center the card (half of width for smallest size)
                          }}
                        >
                          <div 
                            className="h-12 w-12 rounded-full flex items-center justify-center mb-3 mx-auto"
                            style={{ backgroundColor: `${value.color}20`, color: value.color }}
                          >
                            {value.icon}
                          </div>
                          <h4 className="text-base sm:text-lg font-bold mb-2 text-center" style={{ color: value.color }}>
                            {value.title}
                          </h4>
                          <p className="text-slate-700 text-xs sm:text-sm text-center leading-relaxed">
                            {value.description}
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;