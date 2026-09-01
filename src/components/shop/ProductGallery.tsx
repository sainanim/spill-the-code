"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductImage from "./ProductImage";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const multiple = images.length > 1;

  // Wraps in both directions so browsing never dead-ends on the last image.
  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  // Only the current image is in the DOM, so warm the neighbours in the cache
  // to keep an arrow click from flashing empty while the next file downloads.
  useEffect(() => {
    if (!multiple) return;
    for (const delta of [1, -1]) {
      const img = new window.Image();
      img.src = images[(index + delta + images.length) % images.length];
    }
  }, [index, images, multiple]);

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* Fixed square frame: photos in a gallery vary in aspect ratio, and
          sizing the box to the image made it jump on every arrow click. */}
      <div
        className="relative aspect-square p-6 flex items-center justify-center"
        // Arrow keys work once the gallery has focus, matching the buttons.
        onKeyDown={(e) => {
          if (!multiple) return;
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        }}
        tabIndex={multiple ? 0 : -1}
        role={multiple ? "group" : undefined}
        aria-label={multiple ? `${alt} images` : undefined}
      >
        {/* key resets ProductImage's internal error state when the src changes */}
        <ProductImage
          key={images[index]}
          src={images[index]}
          alt={multiple ? `${alt} — image ${index + 1} of ${images.length}` : alt}
          className="max-h-full max-w-full object-contain"
        />

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full
                         bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center
                         text-[var(--text-primary)] hover:bg-white hover:shadow transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full
                         bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center
                         text-[var(--text-primary)] hover:bg-white hover:shadow transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div className="flex items-center justify-center gap-2 pb-4">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-[var(--color-primary)]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
