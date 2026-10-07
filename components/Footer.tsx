import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-975 text-brand-200 py-12 px-4 sm:px-6 border-t border-brand-950 no-print">
      <div className="max-w-4xl mx-auto text-center">
        <Heart className="w-5 h-5 text-brand-500 mx-auto mb-3 fill-brand-700" />
        <h3 className="font-serif text-2xl sm:text-3xl text-brand-50 font-semibold mb-2">
          Richard Earl LaDow Jr.
        </h3>
        <p className="text-brand-400 font-serif italic text-sm mb-6">
          October 5, 1957 — June 8, 2026
        </p>
        <p className="text-brand-500 text-xs tracking-[0.25em] uppercase mb-4">
          Husband — Father — Papa — Son — Brother — Uncle — Friend
        </p>
        <div className="w-16 h-px bg-brand-800 mx-auto mb-6" />
        <p className="text-brand-400 text-xs">
          Created with deep love and cherished memories by Rick’s family.
        </p>
      </div>
    </footer>
  );
}
