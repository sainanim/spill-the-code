"use client";
import { motion } from 'framer-motion';

interface DescriptionSectionProps {
  id?: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-8">
            About Our Academy
          </h2>
          <p className="text-[var(--text-primary)] text-lg leading-relaxed">
            At the Academy of Intelligent Minds, we believe in nurturing the natural curiosity and creativity of young minds. 
            Our innovative approach to teaching AI, coding, and robotics is designed to make complex concepts accessible, 
            engaging, and fun for students aged 8-22. We focus on practical, hands-on learning experiences that encourage 
            critical thinking, problem-solving, and collaboration - skills that are essential for success in the rapidly 
            evolving digital landscape of the future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DescriptionSection;