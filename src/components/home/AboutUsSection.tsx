"use client";
import { motion } from 'framer-motion';

const AboutUsSection = () => {
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

  // Values that animate on hover with complementary colors
  const values = [
    {
      title: "Innovation",
      description: "We constantly evolve our teaching methods and curriculum to stay at the cutting edge of technology education.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "#4F46E5", // Indigo
      bgColor: "#EEF2FF", // Light indigo background
    },
    {
      title: "Inclusivity",
      description: "We believe technology education should be accessible to all children regardless of background or prior experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "#16A34A", // Green
      bgColor: "#ECFDF5", // Light green background
    },
    {
      title: "Creativity",
      description: "We foster environments where imagination and technical skills combine to create meaningful projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "#EA580C", // Orange
      bgColor: "#FFF7ED", // Light orange background
    }
  ];

  return (
    <section className="py-20 bg-[var(--background-secondary)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">About Us</h2>
        </motion.div>
        
        {/* Main content: Text on left, Mind Map on right */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
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
                className="text-[var(--text-primary)] text-lg leading-relaxed mb-6"
              >
                Founded in 2023, the Academy of Intelligent Minds is a pioneering educational institution dedicated to 
                empowering the next generation with skills in artificial intelligence, coding, and robotics. Our mission 
                is to bridge the gap between traditional education and the rapidly evolving technological landscape.
              </motion.p>
              
              <motion.p 
                variants={textItem}
                className="text-[var(--text-primary)] text-lg leading-relaxed mb-6"
              >
                We believe that every child has the potential to become a creator, innovator, and problem-solver in the 
                digital age. Our team of passionate educators and industry professionals is committed to nurturing this 
                potential through innovative teaching methods and a curriculum that evolves with technology.
              </motion.p>
            </motion.div>
            
            {/* Stats Counter on the left side */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-12 bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-3"
                >
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.2
                    }}
                    className="text-3xl font-bold text-[var(--color-primary)] mb-1"
                  >
                    500+
                  </motion.div>
                  <p className="text-[var(--text-primary)]">Students Taught</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-3"
                >
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.4
                    }}
                    className="text-3xl font-bold text-[var(--color-primary)] mb-1"
                  >
                    20+
                  </motion.div>
                  <p className="text-[var(--text-primary)]">Expert Educators</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="p-3"
                >
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      delay: 0.6
                    }}
                    className="text-3xl font-bold text-[var(--color-primary)] mb-1"
                  >
                    1000+
                  </motion.div>
                  <p className="text-[var(--text-primary)]">Projects Completed</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side: Mind Map Layout with improved positioning */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-full min-h-[600px] flex items-center justify-center">
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
                  className="w-40 h-40 rounded-full shadow-lg relative overflow-hidden"
                >
                  <motion.div 
                    animate={{ 
                      background: [
                        "linear-gradient(120deg, #e0f2fe, #dbeafe)",
                        "linear-gradient(240deg, #dbeafe, #e0f7fe)",
                        "linear-gradient(360deg, #e0f7fe, #e0f2fe)"
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0"
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-primary)]">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-3xl font-bold"
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
              
              {/* Values cards with floating animation and better positioning */}
              {values.map((value, index) => {
                // Calculate positions at 120 degree intervals around the circle
                const angle = (index * 120) * (Math.PI / 180);
                const radius = 200; // Distance from center

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
                        y: [0, -10, 0], 
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.5 // Stagger the animations
                      }}
                      className="relative"
                    >
                      {/* Connection line to center */}
                      <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: value.color,
                            boxShadow: `0 0 10px ${value.color}`,
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
                      
                      {/* Line connecting to center */}
                      <div 
                        className="absolute left-1/2 top-1/2 -z-10"
                        style={{
                          width: Math.sqrt(x*x + y*y),
                          height: '2px',
                          background: value.color,
                          transformOrigin: '0 0',
                          transform: `rotate(${Math.atan2(y, x)}rad) translate(-50%, -50%)`,
                        }}
                      />
                        
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg border-2 p-4 shadow-lg w-56"
                        style={{ 
                          borderColor: value.color, 
                          backgroundColor: value.bgColor,
                          marginTop: '-80px', // Offset to center the card
                          marginLeft: '-112px', // Offset to center the card (half of width)
                        }}
                      >
                        <div 
                          className="h-12 w-12 rounded-full flex items-center justify-center mb-2 mx-auto"
                          style={{ backgroundColor: `${value.color}20`, color: value.color }}
                        >
                          {value.icon}
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-center" style={{ color: value.color }}>
                          {value.title}
                        </h4>
                        <p className="text-[var(--text-primary)] text-sm text-center">
                          {value.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;