"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced interface with descriptions for each image
interface ImageSliderProps {
  images?: Array<{
    src: string;
    description: string;
    title?: string;
  }>;
  autoSlideInterval?: number; // in milliseconds
}

export default function ImageSlider({ 
  images = [
    {
      src: "/imgs/Booth.jpeg",
      title: "Indigo Booth",
      description: "Spill the Code booth at Indigo displaying our services for kids and parents."
    },
    {
      src: "/imgs/ai_course_topics.png",
      title: "AI Course Curriculum",
      description: "Overview of essential topics covered in our comprehensive AI development courses."
    },
    {
      src: "/imgs/Selfie.jpeg",
      title: "Team Selfie",
      description: "Staff and students working and volunteering at the Spill the Code Indigo booth!"
    },
    {
      src: "/imgs/games_night.jpg",
      title: "Community Games Night",
      description: "Photos from our last developer community games night featuring coding challenges and tech trivia."
    },
    {
      src: "/imgs/STC_shirt.jpeg",
      title: "Spill the Code at Guiding Light Academy",
      description: "Spill the Code at Guiding Light Academy's anual gala."
    },
    {
      src: "/imgs/trending_languages_2025.png",
      title: "Trending Programming Languages 2025",
      description: "A visual chart showing the most popular programming languages in 2025, ranked by developer usage and market adoption."
    },
    {
      src: "/imgs/Robotics.jpeg",
      title: "Robotic Kit Showcase",
      description: "A Spill the Code student demonstrating the robotics kits we use."
    },
  ],
  autoSlideInterval = 5000 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (isHovering) return; // Pause auto-slide when hovering
    
    const interval = setInterval(() => {
      goToNext();
    }, autoSlideInterval);
    
    return () => clearInterval(interval);
  }, [currentIndex, isHovering, autoSlideInterval]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  // Touch controls for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevious();
    }
  };

  return (
    <div 
      className="w-full py-12 px-4 md:py-16 md:px-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-4xl mx-auto overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1976D2] text-center mb-8 sm:mb-10 md:mb-12"
        >
          <span className="relative inline-block">
            Visual Showcase
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FFC000] translate-y-1"></span>
          </span>
        </motion.h2>

        
        <div className="relative h-80 md:h-120 overflow-hidden rounded-lg shadow-lg border-4 border-blue-600 transition-all duration-300" style={{ boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)' }}>
          {/* Slider container - improved to prevent partial images */}
          <div 
            className="h-full w-full transition-transform duration-500 ease-out flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="min-w-full w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-50"
                style={{ flex: '0 0 100%' }}
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title || `Slide ${index + 1}`}
                    className="max-w-full max-h-full object-contain p-2"
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <div 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 border-2 border-blue-600 hover:border-yellow-400 hover:shadow-lg z-10"
            onClick={goToPrevious}
            style={{ boxShadow: '0 0 10px rgba(25, 118, 210, 0.4)' }}
          >
            <ChevronLeft size={24} className="text-blue-600" />
          </div>

          {/* Right Arrow */}
          <div 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 border-2 border-blue-600 hover:border-yellow-400 hover:shadow-lg z-10"
            onClick={goToNext}
            style={{ boxShadow: '0 0 10px rgba(25, 118, 210, 0.4)' }}
          >
            <ChevronRight size={24} className="text-blue-600" />
          </div>

          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-white bg-opacity-70 px-3 py-2 rounded-full z-10" style={{ boxShadow: '0 0 10px rgba(25, 118, 210, 0.3)' }}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-yellow-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Caption section - Now displays dynamic content based on current image */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-600 text-center" style={{ boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)' }}>
          <h3 className="text-lg font-semibold text-blue-600">
            {images[currentIndex].title || `Image ${currentIndex + 1} of ${images.length}`}
          </h3>
          <p className="text-gray-600 mt-2">
            {images[currentIndex].description}
          </p>
          <div className="text-sm text-gray-400 mt-3">
            Image {currentIndex + 1} of {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}