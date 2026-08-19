"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

// Falls back to a neutral placeholder instead of a broken-image icon, so a kit
// whose hero cut-out hasn't been generated yet still lays out correctly.
export default function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full min-h-32 flex flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 text-slate-300">
        <ImageOff className="h-8 w-8" />
        <span className="text-xs text-slate-400">Image coming soon</span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element -- project uses plain <img> throughout
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
