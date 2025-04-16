import { motion } from 'framer-motion';

const WhatMakesUsUniqueSection = () => {
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 bg-[var(--background-secondary)]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          What Makes Us Unique
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[var(--background-primary)] rounded-full flex items-center justify-center text-3xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">{feature.title}</h3>
              <p className="text-[var(--text-secondary)]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesUsUniqueSection;