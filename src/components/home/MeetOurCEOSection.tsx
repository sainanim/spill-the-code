import { motion } from 'framer-motion';

const MeetOurCEOSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          Meet Our CEO
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 flex justify-center"
          >
            {/* Placeholder for CEO photo */}
            <div className="w-64 h-64 bg-[var(--background-secondary)] rounded-full overflow-hidden shadow-md">
              <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3"
          >
            <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">Monica Sainani</h3>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed mb-4">
              Monica Sainani is a passionate educator and technologist with over 15 years of experience in the field of 
              computer science and artificial intelligence. With a Ph.D. in Computer Science from Stanford University and 
              a background in both academia and industry, Monica brings a unique perspective to education.
            </p>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed">
              Her vision for the Academy of Intelligent Minds was born from her belief that technology education should 
              be accessible, engaging, and future-focused. Under her leadership, the academy has grown from a small 
              after-school program to a comprehensive educational institution serving students across multiple age groups.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurCEOSection;