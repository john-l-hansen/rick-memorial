"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Send, Sparkles, Lock, Unlock, KeyRound, Mail } from "lucide-react";

interface Story {
  id: string;
  author: string;
  relationship: string;
  message: string;
  date: string;
}

const initialStories: Story[] = [
  {
    id: "1",
    author: "Family & Loved Ones",
    relationship: "Family",
    message:
      "Rick's warmth, ready smile, and huge heart touched everyone in the room. He was truly a loving brother to all, always there to lend a hand or share a laugh.",
    date: "June 2026",
  },
  {
    id: "2",
    author: "Friends from Azusa",
    relationship: "Friend",
    message:
      "Never missed a chance to tell a great story or make someone smile. Rick had a rare gift of making every person feel welcomed and appreciated.",
    date: "June 2026",
  },
];

// Valid family passcodes (case-insensitive)
const VALID_PASSCODES = ["ladow", "azusa", "eagles", "11726", "11276", "rick", "family", "rick2026"];

export default function DigitalMemoryBook() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  
  const [author, setAuthor] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    try {
      // 1. Check persistent unlocked state
      const unlockedState = localStorage.getItem("rick_memorial_unlocked");
      if (unlockedState === "true") {
        setIsUnlocked(true);
      }

      // 2. Check URL search parameters (Magic link support e.g. ?passcode=ladow or ?invite=family)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("passcode") || params.get("invite") || params.get("key");
        if (code && VALID_PASSCODES.includes(code.toLowerCase().trim())) {
          setIsUnlocked(true);
          localStorage.setItem("rick_memorial_unlocked", "true");
        }
      }

      // 3. Load stored memories
      const saved = localStorage.getItem("rick_memorial_stories");
      if (saved) {
        setStories(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passcodeInput.toLowerCase().trim();
    if (VALID_PASSCODES.includes(cleanInput)) {
      setIsUnlocked(true);
      setPasscodeError(false);
      setPasscodeInput("");
      try {
        localStorage.setItem("rick_memorial_unlocked", "true");
      } catch {
        // ignore
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      localStorage.removeItem("rick_memorial_unlocked");
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newStory: Story = {
      id: Date.now().toString(),
      author: author.trim(),
      relationship: relationship.trim() || "Friend",
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    try {
      localStorage.setItem("rick_memorial_stories", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthor("");
    setRelationship("");
    setMessage("");
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  return (
    <section id="memories" className="scroll-mt-24">
      <div className="bg-white rounded-lg border border-brand-200/90 shadow-warm p-6 sm:p-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-brand-700 uppercase font-sans">
            Memories &amp; Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-950 mt-1.5">
            Digital Memory Book
          </h2>
          <div className="w-12 h-0.5 bg-brand-400 mx-auto my-3" />
          <p className="text-brand-700 text-sm sm:text-base font-serif italic">
            Share a memory, story, or message of comfort for Rick’s family.
          </p>
        </div>

        {/* Passcode Gate vs. Active Form */}
        {!isUnlocked ? (
          <div className="bg-brand-50/90 border border-brand-200 rounded-lg p-6 sm:p-8 mb-10 max-w-lg mx-auto text-center">
            <div className="w-12 h-12 bg-brand-100 text-brand-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-brand-700" />
            </div>
            
            <h3 className="font-serif text-xl font-semibold text-brand-950 mb-1.5">
              Family &amp; Friends Passcode
            </h3>
            <p className="text-xs sm:text-sm text-brand-700 font-serif italic mb-5 leading-relaxed">
              To keep this space private and meaningful for Rick’s family, please enter the family passcode from your invitation or flyer to share a memory.
            </p>

            <form onSubmit={handleUnlock} className="space-y-3">
              <div className="flex gap-2 max-w-xs mx-auto">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (passcodeError) setPasscodeError(false);
                    }}
                    placeholder="Enter passcode..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-brand-300 rounded text-sm text-brand-950 placeholder-brand-400 focus:outline-none focus:border-brand-700 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors shrink-0"
                >
                  Unlock
                </button>
              </div>

              {passcodeError && (
                <p className="text-xs text-red-700 font-medium">
                  Incorrect passcode. Please check your flyer or invitation (e.g. <em>LADOW</em>, <em>AZUSA</em>, <em>EAGLES</em>).
                </p>
              )}
            </form>

            <div className="mt-5 pt-4 border-t border-brand-200/70 text-xs text-brand-600 flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Need the code?</span>
              <a
                href="mailto:ricksmemorialtribute11726@gmail.com?subject=Passcode%20Request%20for%20Rick's%20Memory%20Book"
                className="underline hover:text-brand-900"
              >
                Contact the family
              </a>
            </div>
          </div>
        ) : (
          /* Unlocked Submission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-brand-50/70 border border-brand-200 rounded-lg p-5 sm:p-7 mb-10 max-w-2xl mx-auto relative"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-200/80">
              <div className="flex items-center gap-2 text-brand-900 font-serif font-semibold text-lg">
                <MessageSquare className="w-5 h-5 text-brand-700" />
                <span>Leave a Thought or Story</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-800 bg-brand-200/70 px-2.5 py-1 rounded-full">
                  <Unlock className="w-3 h-3 text-brand-700" />
                  Family Unlocked
                </span>
                <button
                  type="button"
                  onClick={handleLock}
                  className="text-[11px] text-brand-500 hover:text-brand-800 underline transition-colors"
                  title="Lock commenting"
                >
                  Lock
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Linda Smith"
                  className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus:border-brand-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                  Relationship to Rick
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Lifelong Friend, Niece, Neighbor"
                  className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus:border-brand-700 transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                Your Memory or Message *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What made you smile when you think of Rick? A memory you'll always carry..."
                className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus:border-brand-700 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Add to Memory Book
            </button>

            {showThankYou && (
              <div className="mt-3 p-3 bg-brand-200/60 text-brand-900 rounded text-sm text-center flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-700" />
                Thank you for sharing your beautiful memory of Rick.
              </div>
            )}
          </form>
        )}

        {/* List of Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {stories.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-md bg-brand-50/50 border border-brand-200/70 hover:border-brand-300 transition-colors flex flex-col justify-between"
            >
              <p className="text-brand-900 font-serif text-base leading-relaxed mb-4 italic">
                “{s.message}”
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-brand-200/60 text-xs text-brand-700">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-brand-600 fill-brand-200" />
                  <span className="font-semibold text-brand-900">{s.author}</span>
                  <span className="text-brand-500">• {s.relationship}</span>
                </div>
                <span>{s.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
