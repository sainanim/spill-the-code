"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { ReactNode } from 'react';


type CategoryKey = 'educators' | 'engineers' | 'mentors';

const ExperienceSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('educators');


  
  // Categories of team members with their experience highlights
  const experienceCategories: Record<CategoryKey, {
  title: string;
  description: string;
  highlights: string[];
  icon: ReactNode;
}> = {
    educators: {
      title: "Our Educators",
      description: "Passionate teachers who make learning fun!",
      highlights: [
        "Former school teachers with 10+ years classroom experience",
        "Specialized in making complex concepts simple and engaging",
        "Trained in both traditional and progressive teaching methods",
        "Experience working with diverse learning styles and needs"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    engineers: {
      title: "Our Engineers",
      description: "Tech experts who build amazing things!",
      highlights: [
        "Professional experience at leading tech companies",
        "Designed and built software used by millions of people",
        "Created educational technology platforms and tools",
        "Expertise in the latest programming languages and frameworks"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    mentors: {
      title: "Our Student Mentors",
      description: "Awesome role models who guide and inspire!",
      highlights: [
        "Former students who now help teach the next generation",
        "Winners of coding competitions and hackathons",
        "Created their own apps, games, and websites",
        "Currently studying computer science at top universities"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Interactive project examples that kids have created
  const projectExamples = [
    {
      title: "Game Design",
      description: "Create your own games with colorful characters and exciting levels!",
      emoji: "🎮"
    },
    {
      title: "Robotics",
      description: "Build and program robots that can move, sense, and interact!",
      emoji: "🤖"
    },
    {
      title: "Web Apps",
      description: "Make websites and apps that solve real problems!",
      emoji: "💻"
    },
    {
      title: "Art & Animation",
      description: "Bring your stories to life with code-powered animation!",
      emoji: "🎨"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">Our Experience</h2>
          <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto">
            We bring together a rich blend of backgrounds, educators, engineers, developers, and student mentors 
            who come with years of combined experience in teaching and technology.
          </p>
        </motion.div>

        // Team Categories Tabs
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Corrected line below: Cast Object.keys result to CategoryKey[] */}
          {(Object.keys(experienceCategories) as Array<CategoryKey>).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // Now 'category' is correctly typed as CategoryKey, so this is fine
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[var(--color-primary)] text-white shadow-lg"
                  : "bg-white text-[var(--color-primary)] shadow-md hover:shadow-lg"
              }`}
            >
              {/* And this access is also fine now */}
              {experienceCategories[category].title}
            </motion.button>
          ))}
        </div>

        {/* Category Content */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/4 flex justify-center">
              <div className="w-20 h-20 bg-[var(--color-primary)] bg-opacity-10 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                {experienceCategories[activeCategory].icon}
              </div>
            </div>
            <div className="md:w-3/4">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold text-[var(--color-primary)] mb-3"
              >
                {experienceCategories[activeCategory].title}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-lg text-[var(--text-primary)] mb-6 italic"
              >
                {experienceCategories[activeCategory].description}
              </motion.p>
              <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                {experienceCategories[activeCategory].highlights.map((highlight, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full w-6 h-6 mr-3 mt-1 flex-shrink-0">•</span>
                    <p className="text-[var(--text-primary)]">{highlight}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Our Approach</h3>
          <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto">
            We know that the best learning doesn't happen from a textbook—it happens when students <em>do</em>. 
            That's why our approach is rooted in project-based learning, experimentation, and personalization.
          </p>
        </motion.div>

        {/* Interactive Project Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projectExamples.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="h-32 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
                <span className="text-6xl">{project.emoji}</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-[var(--color-primary)] mb-2">{project.title}</h4>
                <p className="text-[var(--text-primary)]">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Ready to Start Coding?</h3>
          <p className="text-lg text-[var(--text-primary)] max-w-3xl mx-auto mb-8">
            Our methods are backed by educational research, but more importantly, by real-world impact. 
            Join us and become a creator of technology, not just a user!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join Our Next Class!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;