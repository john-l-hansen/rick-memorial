"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Heart, Send, Sparkles } from "lucide-react";

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

export default function DigitalMemoryBook() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [author, setAuthor] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rick_memorial_stories");
      if (saved) {
        setStories(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

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

        {/* Share Memory Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-brand-50/70 border border-brand-200 rounded-lg p-5 sm:p-7 mb-10 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4 text-brand-900 font-serif font-semibold text-lg">
            <MessageSquare className="w-5 h-5 text-brand-700" />
            <span>Leave a Thought or Story</span>
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
            className="w-full sm:w-auto px-6 py-2.5 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors flex items-center justify-center gap-2 shadow-sm"
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
