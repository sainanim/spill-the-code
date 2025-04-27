"use client";
import { motion } from 'framer-motion';

interface DescriptionSectionProps {
  id?: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ id }) => {
  // Card animation variants
  const leftCardVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };

  const rightCardVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
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
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-8">
            About Our Academy
          </h2>
          <p className="text-[var(--text-primary)] text-lg leading-relaxed">
            At the Academy of Intelligent Minds, we believe in nurturing the natural curiosity and creativity of young minds. 
            Our innovative approach to teaching AI, coding, and robotics is designed to make complex concepts accessible, 
            engaging, and fun for students aged 8-22.
          </p>
        </motion.div>

        {/* Side-by-side cards container */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Who we are section - Left card */}
          <motion.div
            variants={leftCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="h-full bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg overflow-hidden p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-6">
                Who We Are
              </h2>
              
              <p className="text-[var(--text-primary)] text-base lg:text-lg mb-6">
                We are dreamers, doers, and builders of the future. Our academy was born out of a simple belief: that every child deserves the opportunity to explore the world of technology.
              </p>
              
              <motion.ul 
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">A community fostering curiosity and creativity</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Team of passionate educators and engineers</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Personalized attention for every student</span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>

          {/* What we do section - Right card */}
          <motion.div
            variants={rightCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="h-full bg-gradient-to-bl from-white to-purple-50 shadow-lg rounded-lg overflow-hidden p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-6">
                What We Do
              </h2>
              
              <p className="text-[var(--text-primary)] text-base lg:text-lg mb-6">
                We provide a vibrant, interactive learning experience that brings technology to life for students aged 8 to 22.
              </p>
              
              <motion.ul 
                variants={listContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Hands-on courses in AI, Coding, and Robotics</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Project-based learning with real applications</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Digital tools and logic-based challenges</span>
                </motion.li>
                <motion.li variants={listItem} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-[var(--text-primary)]">Programs for all skill levels</span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;