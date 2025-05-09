import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Animate triangle rotation
    let startTime;
    const duration = 1500; // 1.5 seconds for one full rotation
    
    const animateRotation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate current rotation (0 to 360 degrees)
      const currentRotation = Math.min(elapsed / duration * 360, 360);
      setRotation(currentRotation);
      
      // Continue animation until we reach 360 degrees
      if (currentRotation < 360) {
        requestAnimationFrame(animateRotation);
      }
    };
    
    requestAnimationFrame(animateRotation);
  }, []);
  
  return (
    <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 my-8 sm:my-10 md:my-12 relative">
              {/* Spill The Code Logo */}
              <div className="w-full h-full flex items-center justify-center overflow-visible">
                {/* Yellow Triangle with rotation - in its own SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
                    <g transform={`rotate(${rotation} 400 400)`}>
                      <polygon 
                        points="100,50 700,400 100,750" 
                        fill="#FFC20E"
                        stroke="#F9A51A" 
                        strokeWidth="5"
                      />
                    </g>
                  </svg>
                </div>
                
                {/* Blue Hexagon with Brain - in separate SVG so it doesn't rotate */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
                    <g transform="translate(320, 400) scale(0.8)">
                      <polygon 
                        points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60"
                        fill="#0075BE"
                        stroke="#FFFFFF"
                        strokeWidth="8"
                      />
                      
                      {/* Brain Icon */}
                      <g transform="translate(0, -20) scale(0.6)" fill="none" stroke="#FFFFFF" strokeWidth="10">
                        <path d="M0,0 C-20,-30 -60,-20 -60,10 C-60,40 -20,40 0,20" />
                        <path d="M0,0 C20,-30 60,-20 60,10 C60,40 20,40 0,20" />
                        <path d="M0,20 L0,50" />
                        <circle cx="-50" cy="70" r="25" />
                        <circle cx="0" cy="100" r="25" />
                        <circle cx="50" cy="70" r="25" />
                        <path d="M-30,80 L-10,90" />
                        <path d="M30,80 L10,90" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
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
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-md text-sm sm:text-base w-full mt-3 xs:mt-0"
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