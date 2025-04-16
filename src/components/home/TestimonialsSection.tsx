import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  // Placeholder testimonials
  const testimonials = [
    {
      quote: "My child has absolutely flourished at this academy. The hands-on approach to learning has sparked a genuine interest in programming.",
      name: "Parent Name",
      role: "Parent of Student"
    },
    {
      quote: "The personalized learning plan they created for me helped me understand concepts that I always struggled with in traditional classrooms.",
      name: "Student Name",
      role: "Age 14"
    },
    {
      quote: "The projects we work on are not just educational but also incredibly fun. I look forward to every class!",
      name: "Student Name",
      role: "Age 16"
    }
  ];

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
          Testimonials
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[var(--background-primary)] p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="w-8 h-8 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-[var(--text-primary)] mb-4 italic">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-[var(--color-primary)]">{testimonial.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;