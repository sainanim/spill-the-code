"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseModal from '@/components/CourseModal';

interface Course {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'coding' | 'robotics' | 'mathematics';
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Dummy course data
  const courses: Course[] = [
    // AI Courses
    { id: 'ai1', name: 'Intro to AI', description: 'A beginner-friendly introduction to artificial intelligence concepts.', category: 'ai' },
    { id: 'ai2', name: 'Machine Learning Basics', description: 'Learn foundational machine learning algorithms and techniques.', category: 'ai' },
    { id: 'ai3', name: 'Neural Networks', description: 'Understand how neural networks work and their applications.', category: 'ai' },
    { id: 'ai4', name: 'Computer Vision', description: 'Explore image recognition and processing with AI.', category: 'ai' },
    { id: 'ai5', name: 'Natural Language Processing', description: 'Learn how computers understand and generate human language.', category: 'ai' },
    { id: 'ai6', name: 'AI Ethics', description: 'Examine ethical considerations in artificial intelligence development.', category: 'ai' },
    
    // Coding Courses
    { id: 'coding1', name: 'Python for Beginners', description: 'Start your coding journey with Python programming.', category: 'coding' },
    { id: 'coding2', name: 'Web Development', description: 'Learn HTML, CSS, and JavaScript to build websites.', category: 'coding' },
    { id: 'coding3', name: 'Mobile App Development', description: 'Create apps for iOS and Android devices.', category: 'coding' },
    { id: 'coding4', name: 'Game Development', description: 'Design and program your own video games.', category: 'coding' },
    { id: 'coding5', name: 'Data Structures', description: 'Master essential programming concepts and algorithms.', category: 'coding' },
    { id: 'coding6', name: 'Advanced Python', description: 'Take your Python skills to the next level.', category: 'coding' },
    
    // Robotics Courses
    { id: 'robotics1', name: 'Intro to Robotics', description: 'Get started with basic robotics principles and components.', category: 'robotics' },
    { id: 'robotics2', name: 'Robot Programming', description: 'Learn to program autonomous robots with various sensors.', category: 'robotics' },
    { id: 'robotics3', name: 'Arduino Projects', description: 'Build interactive electronics projects with Arduino.', category: 'robotics' },
    { id: 'robotics4', name: 'Drone Technology', description: 'Understand and work with drone technology and flight principles.', category: 'robotics' },
    { id: 'robotics5', name: 'Competitive Robotics', description: 'Prepare for robotics competitions and challenges.', category: 'robotics' },
    { id: 'robotics6', name: 'Advanced Robotics', description: 'Explore complex robotics systems and AI integration.', category: 'robotics' },
    
    // Mathematics Courses
    { id: 'math1', name: 'Math for Coding', description: 'Essential math concepts for programming and computer science.', category: 'mathematics' },
    { id: 'math2', name: 'Statistics for Data Science', description: 'Learn statistical methods for analyzing data.', category: 'mathematics' },
    { id: 'math3', name: 'Linear Algebra', description: 'Master matrix operations and vector spaces for ML applications.', category: 'mathematics' },
    { id: 'math4', name: 'Discrete Mathematics', description: 'Explore mathematical structures for computer science.', category: 'mathematics' },
    { id: 'math5', name: 'Calculus for AI', description: 'Understanding calculus concepts essential for advanced AI.', category: 'mathematics' },
    { id: 'math6', name: 'Mathematical Modeling', description: 'Learn to create mathematical models of real-world problems.', category: 'mathematics' },
  ];

  const aiCourses = courses.filter(course => course.category === 'ai');
  const codingCourses = courses.filter(course => course.category === 'coding');
  const roboticsCourses = courses.filter(course => course.category === 'robotics');
  const mathCourses = courses.filter(course => course.category === 'mathematics');

  // Placeholder image URL
  const placeholderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNieFtLd96r9cZ5K0SjuBwUhZ9g75IgW3tZTGxHSqVh3rML1t1JaUj29BpSEOBvQQiWM&usqp=CAU";

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const courseCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  // Component refs for scroll animations
  const aiRef = useRef(null);
  const codingRef = useRef(null);
  const roboticsRef = useRef(null);
  const mathRef = useRef(null);
  
  const aiInView = useInView(aiRef, { once: false, amount: 0.2 });
  const codingInView = useInView(codingRef, { once: false, amount: 0.2 });
  const roboticsInView = useInView(roboticsRef, { once: false, amount: 0.2 });
  const mathInView = useInView(mathRef, { once: false, amount: 0.2 });

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 bg-[var(--background-primary)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4"
            >
              Courses we offer
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-1 bg-[var(--color-accent)] w-24 mx-auto"
            />
          </motion.div>

          {/* AI Courses Section */}
          <motion.section 
            ref={aiRef}
            initial="hidden"
            animate={aiInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mb-20"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-primary)] pb-4 mb-8">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-[var(--text-primary)]"
              >
                Artificial Intelligence
              </motion.h2>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0"
              >
                <img 
                  src={placeholderImage} 
                  alt="AI Icon" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openCourseModal(course)}
                >
                  <motion.div 
                    className="h-2 bg-[var(--color-primary)]"
                    whileHover={{ scaleX: 1.05 }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{course.name}</h3>
                    <p className="text-[var(--text-secondary)] line-clamp-2">{course.description}</p>
                    <motion.div 
                      className="mt-4 text-sm font-medium text-[var(--color-accent)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Coding Courses Section */}
          <motion.section 
            ref={codingRef}
            initial="hidden"
            animate={codingInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mb-20"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-primary)] pb-4 mb-8">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-[var(--text-primary)]"
              >
                Coding Education
              </motion.h2>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0"
              >
                <img 
                  src={placeholderImage} 
                  alt="Coding Icon" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openCourseModal(course)}
                >
                  <motion.div 
                    className="h-2 bg-[var(--color-accent)]"
                    whileHover={{ scaleX: 1.05 }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{course.name}</h3>
                    <p className="text-[var(--text-secondary)] line-clamp-2">{course.description}</p>
                    <motion.div 
                      className="mt-4 text-sm font-medium text-[var(--color-accent)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Robotics Courses Section */}
          <motion.section 
            ref={roboticsRef}
            initial="hidden"
            animate={roboticsInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mb-20"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-primary)] pb-4 mb-8">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-[var(--text-primary)]"
              >
                Robotics
              </motion.h2>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0"
              >
                <img 
                  src={placeholderImage} 
                  alt="Robotics Icon" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roboticsCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openCourseModal(course)}
                >
                  <motion.div 
                    className="h-2 bg-[var(--color-primary)]"
                    whileHover={{ scaleX: 1.05 }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{course.name}</h3>
                    <p className="text-[var(--text-secondary)] line-clamp-2">{course.description}</p>
                    <motion.div 
                      className="mt-4 text-sm font-medium text-[var(--color-accent)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mathematics Courses Section */}
          <motion.section 
            ref={mathRef}
            initial="hidden"
            animate={mathInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mb-16"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-primary)] pb-4 mb-8">
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-[var(--text-primary)]"
              >
                Mathematics
              </motion.h2>
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0"
              >
                <img 
                  src={placeholderImage} 
                  alt="Mathematics Icon" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mathCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openCourseModal(course)}
                >
                  <motion.div 
                    className="h-2 bg-[var(--color-accent)]"
                    whileHover={{ scaleX: 1.05 }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{course.name}</h3>
                    <p className="text-[var(--text-secondary)] line-clamp-2">{course.description}</p>
                    <motion.div 
                      className="mt-4 text-sm font-medium text-[var(--color-accent)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Course Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <CourseModal course={selectedCourse} onClose={closeModal} />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}