import { motion } from 'framer-motion';

interface ContactUsSectionProps {
  id?: string;
}

const ContactUsSection: React.FC<ContactUsSectionProps> = ({ id }) => {
  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent";
  
  return (
    <section id={id} className="py-16 bg-[var(--background-primary)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-4">
            Contact Us
          </h2>
          <p className="text-[var(--text-secondary)] text-lg text-center mb-8">
            Have questions or want to learn more? We'd love to hear from you!
          </p>
          
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-[var(--text-primary)] mb-2">
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className={inputClasses}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-[var(--text-primary)] mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className={inputClasses}
                placeholder="Your email address"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-[var(--text-primary)] mb-2">
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                className={inputClasses}
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-md"
              >
                Submit
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUsSection;