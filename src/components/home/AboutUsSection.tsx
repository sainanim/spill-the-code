import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-[var(--background-secondary)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">About Us</h2>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed mb-4">
              Founded in 2023, the Academy of Intelligent Minds is a pioneering educational institution dedicated to 
              empowering the next generation with skills in artificial intelligence, coding, and robotics. Our mission 
              is to bridge the gap between traditional education and the rapidly evolving technological landscape.
            </p>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed">
              We believe that every child has the potential to become a creator, innovator, and problem-solver in the 
              digital age. Our team of passionate educators and industry professionals is committed to nurturing this 
              potential through innovative teaching methods and a curriculum that evolves with technology.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            {/* Placeholder for logo */}
            <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="text-4xl font-bold text-[var(--color-primary)]">AIM</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 