"use client";

import React, { useState, useEffect } from "react";
import { Heart, Calendar, MessageSquare, Image, Mail } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-50/95 backdrop-blur-md shadow-sm border-b border-brand-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 text-brand-900 hover:text-brand-700 transition-colors group"
        >
          <Heart className="w-4 h-4 text-brand-600 fill-brand-200 group-hover:scale-110 transition-transform" />
          <span className="font-serif text-lg tracking-wide uppercase font-medium">
            Richard Earl LaDow Jr.
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-brand-800">
          <a
            href="#details"
            className="hover:text-brand-950 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            Service Details
          </a>
          <a
            href="#photos"
            className="hover:text-brand-950 transition-colors flex items-center gap-1.5"
          >
            <Image className="w-3.5 h-3.5 text-brand-600" />
            Photos
          </a>
          <a
            href="#memories"
            className="hover:text-brand-950 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
            Share a Memory
          </a>
          <a
            href="#rsvp"
            className="px-4 py-2 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            RSVP
          </a>
        </nav>
      </div>
    </header>
  );
}
