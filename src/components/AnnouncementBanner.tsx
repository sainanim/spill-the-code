"use client";
import { useState, useEffect } from "react";

const AnnouncementBanner = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(current => (current !== isScrolled ? isScrolled : current));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed left-0 right-0 z-40 w-full bg-[#FFC000] py-1.5 px-4 transition-all duration-300 ${
      scrolled ? "top-14" : "top-[4.5rem]"
    }`}>
      {/* Mobile */}
      <div className="flex flex-col items-center sm:hidden">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-700 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-800" />
          </span>
          <span className="text-slate-800 text-xs font-semibold text-center leading-snug">
            New location opening soon — Just in time for summer camps!
          </span>
        </div>
        <a href="#summer-camps" className="text-slate-800 text-xs font-bold mt-0.5">
          Learn More →
        </a>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] items-center gap-4 container mx-auto">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-700 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-800" />
        </span>
        <p className="text-slate-800 text-sm font-semibold text-center">
          New location opening soon — Just in time for summer camps!
        </p>
        <a href="#summer-camps" className="text-slate-800 text-sm font-bold whitespace-nowrap hover:underline underline-offset-2">
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
