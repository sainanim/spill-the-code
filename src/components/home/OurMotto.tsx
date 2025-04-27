"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const OurMotto: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a slight delay before starting animations
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Full motto text
  const mottoLine1 = "Think Creatively.";
  const mottoLine2 = "Build Boldly.";
  const mottoLine3 = "Learn Endlessly.";
  
  // Faster container variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.12
      }
    }
  };

  // Faster word animation variant
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Code symbols that appear and disappear
  const codeSymbols = [
    { symbol: "</>", top: "10%", left: "5%", size: "text-2xl", delay: 0 },
    { symbol: "{}", top: "70%", left: "8%", size: "text-3xl", delay: 0.5 },
    { symbol: "( )", top: "20%", right: "6%", size: "text-4xl", delay: 1.2 },
    { symbol: "[]", top: "60%", right: "10%", size: "text-2xl", delay: 0.8 },
    { symbol: ";", bottom: "15%", left: "15%", size: "text-5xl", delay: 1.5 },
    { symbol: "==", bottom: "25%", right: "15%", size: "text-3xl", delay: 0.3 },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
      {/* Animated code symbols in background */}
      {codeSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { 
            opacity: [0, 0.7, 0], 
            scale: [0, 1, 0.8],
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15]
          } : {}}
          transition={{ 
            duration: 5,
            delay: symbol.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`absolute ${symbol.size} text-blue-300 font-mono`}
          style={{ 
            top: symbol.top,
            left: symbol.left,
            right: symbol.right,
            bottom: symbol.bottom
          }}
        >
          {symbol.symbol}
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title with code bracket styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="inline-flex items-center text-3xl sm:text-4xl font-bold">
              <span className="text-blue-400 font-mono mr-2">&lt;</span>
              <span className="text-blue-600">Our Motto</span>
              <span className="text-blue-400 font-mono ml-2">/&gt;</span>
            </h2>
          </motion.div>
          
          {/* Motto lines with code-like animation */}
          <div className="bg-blue-600 rounded-xl shadow-lg p-8 mb-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-center space-y-4"
            >
              <motion.div variants={wordVariants} className="text-2xl sm:text-4xl font-bold font-mono text-white">
                {mottoLine1}
              </motion.div>
              <motion.div variants={wordVariants} className="text-2xl sm:text-4xl font-bold font-mono text-blue-200">
                {mottoLine2}
              </motion.div>
              <motion.div variants={wordVariants} className="text-2xl sm:text-4xl font-bold font-mono text-white">
                {mottoLine3}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-blue-100 rounded-lg p-6 border-l-4 border-blue-500"
          >
            <p className="text-blue-800 text-lg">
              We believe education should not be about memorizing facts, it should be about lighting a fire. 
              At our academy, we want every student to see problems as puzzles, failures as experiments, 
              and learning as a lifelong adventure.
            </p>
          </motion.div>
          
          {/* Code-like decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-block font-mono text-blue-400 text-sm sm:text-base">
              <span className="block text-left">
                <span className="text-blue-300">function</span> <span className="text-blue-500">createFuture</span>() &#123;
              </span>
              <span className="block text-left pl-6">
                <span className="text-blue-300">return</span> <span className="text-blue-500">Academy</span>.<span className="text-blue-400">students</span>.map(<span className="text-blue-300">student</span> =&gt; <span className="text-blue-300">student</span>.<span className="text-blue-400">unleashPotential</span>());
              </span>
              <span className="block text-left">
                &#125;
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurMotto;