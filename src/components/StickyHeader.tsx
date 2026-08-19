"use client";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";
// import AnnouncementBanner from "@/components/AnnouncementBanner";

const StickyHeader = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // The header animates its padding, so this fires on every frame of the
    // transition. Only publish whole-pixel changes to keep those frames from
    // restyling the document for offsets nothing can act on.
    let published = -1;

    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(entry.contentRect.height);
      if (height === published) return;
      published = height;

      document.documentElement.style.setProperty(
        "--sticky-offset",
        `${height}px`
      );
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="sticky top-0 z-50">
      <Header />
      {/* <AnnouncementBanner /> */}
    </div>
  );
};

export default StickyHeader;
