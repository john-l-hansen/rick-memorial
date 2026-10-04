"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface PhotoProps {
  src: string;
  alt: string;
  caption: string;
}

const photos: PhotoProps[] = [
  {
    src: "/images/rick-01.png",
    alt: "Rick smiling outdoors",
    caption: "Rick with his trademark warm smile",
  },
  {
    src: "/images/rick-02.png",
    alt: "Rick with his dog",
    caption: "At home with his beloved companion",
  },
  {
    src: "/images/rick-03.png",
    alt: "Rick in red shirt",
    caption: "Cherished moments with family and friends",
  },
];

export default function PhotoTriptych() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-square overflow-hidden bg-brand-100 rounded-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-brand-200/80"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-950/70 text-white p-2.5 rounded-full backdrop-blur-sm shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center py-3 text-brand-800 text-sm font-medium font-serif italic">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
