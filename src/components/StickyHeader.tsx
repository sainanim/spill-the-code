"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const StickyHeader = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--sticky-offset",
        `${entry.contentRect.height}px`
      );
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="sticky top-0 z-50">
      <Header />
      <AnnouncementBanner />
    </div>
  );
};

export default StickyHeader;
