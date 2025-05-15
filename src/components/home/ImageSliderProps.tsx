"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define the props interface
interface ImageSliderProps {
  images?: string[];
  autoSlideInterval?: number; // in milliseconds
}

export default function ImageSlider({ 
  images = [
    "/imgs/trending languages 2025.png", 
    "/imgs/ai course topics.png", 
    "/imgs/games night with parents.jpg", 
    "/imgs/interactive learning in classroom.jpg"
  ],
  autoSlideInterval = 5000 
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <div 
      className="w-full bg-gray-50 py-12 px-4 md:py-16 md:px-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Image Gallery
        </h2>
        
        <div className="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
          {/* Slider container */}
          <div 
            className="h-full w-full transition-transform duration-500 ease-out flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="min-w-full h-full flex-shrink-0"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <div 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 border-2 border-blue-600 hover:border-yellow-400"
            onClick={goToPrevious}
          >
            <ChevronLeft size={24} className="text-blue-600" />
          </div>

          {/* Right Arrow */}
          <div 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 border-2 border-blue-600 hover:border-yellow-400"
            onClick={goToNext}
          >
            <ChevronRight size={24} className="text-blue-600" />
          </div>

          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
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

        {/* Caption section */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-600">
          <h3 className="text-lg font-semibold text-blue-600">
            Image {currentIndex + 1} of {images.length}
          </h3>
          <p className="text-gray-600 mt-1">
            Beautiful image from our collection. Click the arrows to navigate through the gallery.
          </p>
        </div>
      </div>
    </div>
  );
}