import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99], // Custom ease for a more natural pop
      },
    },
  };

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-72 h-auto sm:w-80 md:w-96 my-8 sm:my-10 md:my-12"
            variants={imageVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <img
              src="/spill_the_code_logo.png"
              alt="Spill The Code Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 text-center max-w-3xl">
              SPILL THE CODE
            </h1>

            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl text-blue-500 text-center max-w-xl font-medium">
              Academy Of Intelligent Minds
            </p>
          </div>

          <div className={`flex flex-col xs:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-xs sm:max-w-md mx-auto transition-all duration-1000 delay-600 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              className="px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm sm:text-base w-full"
              onClick={() => window.location.href = '/#contact-us'}
            >
              Contact Us
            </button>
            <button
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-yellow-500 text-white font-semibold rounded-full transition-all duration-300 shadow-md text-sm sm:text-base w-full mt-3 xs:mt-0
                        hover:brightness-110 hover:shadow-lg active:scale-[0.98]"
              onClick={() => window.location.href = '/courses'}
            >
              Explore Courses
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;