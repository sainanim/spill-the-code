"use client";
import { motion } from 'framer-motion';

const MeetOurCEOSection = () => {
  // Text animation variants
  const textContainer = {
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-16"
        >
          Meet Our CEO
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="lg:w-1/3 flex justify-center"
          >
            {/* CEO photo with enhanced styling */}
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary)] transition-transform duration-300 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-2/3 bg-gradient-to-r from-white to-blue-50 p-8 rounded-lg shadow-md"
          >
            <motion.h3 
              variants={textItem}
              className="text-2xl font-semibold text-[var(--color-primary)] mb-6"
            >
              Monica Sainani
            </motion.h3>
            
            <motion.div variants={textItem} className="space-y-4">
              <div className="flex items-start mb-4">
                <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  Monica is a graduate from the University of Toronto with degrees in Computer Science and Cognitive Science, with experience at tech companies like Cisco Systems.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  She's an advocate for learning that's personalized, meaningful, and accessible to all, having started coding young and found confidence through technology.
                </p>
              </div>
              
              <div className="flex items-start mb-4">
                <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  Her leadership style is rooted in empathy, clarity, and a deep love for teaching. She remains hands-on with students and deeply involved in shaping the curriculum.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  Under her leadership, the Academy of Intelligent Minds has grown from a small after-school program to a comprehensive educational institution serving students across multiple age groups.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={textItem}
              className="mt-6 pt-6 border-t border-blue-100"
            >
              <blockquote className="italic text-[var(--text-primary)] text-lg">
                "I believe that technology education should be accessible, engaging, and future-focused. Our goal is to empower every student to become not just users of technology, but creators and innovators."
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurCEOSection;