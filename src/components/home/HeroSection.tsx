import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { FaFutbol } from "react-icons/fa";

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

  const badgeVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.9,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="relative py-10 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
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
              Academy of Intelligent Minds
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

          {/* Badge icon code on Hero Section, useful if we're trying to advertise something directly on the main page */}
          {/* <motion.div
            className="relative overflow-hidden mt-10 lg:mt-0 lg:absolute lg:top-40 xl:top-44 lg:right-10 xl:right-16 w-full max-w-sm lg:w-auto bg-white rounded-2xl shadow-xl border-2 border-yellow-400 p-5"
            variants={badgeVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <FaFutbol className="pointer-events-none absolute -bottom-6 -right-6 w-24 h-24 text-blue-100 rotate-12" aria-hidden="true" />
            <Bot className="pointer-events-none absolute -top-4 -left-4 w-16 h-16 text-yellow-100 -rotate-12" strokeWidth={1.5} aria-hidden="true" />
            <Sparkles className="pointer-events-none absolute top-1/2 right-2 w-10 h-10 text-blue-100" strokeWidth={1.5} aria-hidden="true" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Free Event
              </span>

              <p className="mt-3 text-sm font-semibold text-blue-600">
                July 16 &amp; July 23 &bull; 1&ndash;4 PM
              </p>

              <h3 className="mt-3 text-lg font-bold text-blue-600">
                Soccer Robotics Day
              </h3>

              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li className="lg:whitespace-nowrap">Build your own soccer team robotics kit</li>
                <li className="lg:whitespace-nowrap">Make your own player card</li>
                <li className="lg:whitespace-nowrap">Design your own soccer field with AI</li>
              </ul>

              <p className="mt-1 text-xs text-gray-500">
                Enter a raffle to win a free robotics kit!
              </p>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;