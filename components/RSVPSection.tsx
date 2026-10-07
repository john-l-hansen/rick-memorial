"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, Send, ExternalLink } from "lucide-react";

export default function RSVPSection() {
  const rsvpEmail = "ricksmemorialtribute11726@gmail.com";
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("1");
  const [guestNote, setGuestNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(rsvpEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const subject = encodeURIComponent(`RSVP for Rick's Memorial - ${guestName || "Guest"}`);
  const body = encodeURIComponent(
    `Name(s): ${guestName || "[Your Name]"}\nAttendee Email: ${guestEmail || "[Your Email]"}\nNumber Attending: ${attendeeCount}\n\nNote for Family:\n${guestNote || "[Optional message]"}`
  );

  const mailtoLink = `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${rsvpEmail}&su=${subject}&body=${body}`;
  const yahooWebLink = `https://compose.mail.yahoo.com/?to=${rsvpEmail}&subj=${subject}&body=${body}`;
  const outlookWebLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${rsvpEmail}&subject=${subject}&body=${body}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="scroll-mt-24">
      <div className="bg-brand-950 text-brand-50 rounded-lg p-6 sm:p-12 shadow-elevated border border-brand-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase font-sans">
            Please Let Us Know
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-50 mt-1 mb-2">
            RSVP for the Memorial
          </h2>
          <p className="text-brand-300 font-serif italic text-base sm:text-lg mb-4">
            Kindly RSVP by <strong className="text-brand-100 font-semibold">November 1, 2026</strong>{" "}
            if you plan on joining us.
          </p>
          <p className="text-xs text-brand-400 mb-8 max-w-md mx-auto">
            You can RSVP using <strong>any email provider</strong> (Yahoo, Outlook, iCloud, AOL, Hotmail, Gmail, etc.) or copy our address below.
          </p>

          {/* Quick Email Copy Box */}
          <div className="inline-flex items-center justify-between gap-3 bg-brand-900/90 border border-brand-700 px-4 py-3 rounded-md max-w-full mb-8">
            <div className="flex items-center gap-2 overflow-hidden text-left">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <a
                href={mailtoLink}
                className="text-brand-100 font-sans font-medium text-xs sm:text-sm hover:underline truncate"
              >
                {rsvpEmail}
              </a>
            </div>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="px-3 py-1 bg-brand-800 hover:bg-brand-700 text-brand-100 rounded text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Email
                </>
              )}
            </button>
          </div>

          {/* Direct RSVP Form */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-brand-900/60 border border-brand-800 rounded-lg p-6 sm:p-8 text-left backdrop-blur-sm"
          >
            <h3 className="font-serif text-lg text-brand-100 mb-1 font-semibold text-center">
              Send Your RSVP
            </h3>
            <p className="text-xs text-brand-400 text-center mb-6">
              Fill in your details below and choose how to send your message
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Your Name(s) *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. John & Jane Doe"
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-600 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Your Email Address (Any provider welcome)
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="e.g. yourname@yahoo.com / outlook.com / icloud.com"
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-600 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Number of Attendees
                </label>
                <select
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(e.target.value)}
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 focus:outline-none focus:border-brand-400 transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  A Note for the Family (Optional)
                </label>
                <textarea
                  rows={3}
                  value={guestNote}
                  onChange={(e) => setGuestNote(e.target.value)}
                  placeholder="Share a thought, memory, or note of support..."
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-600 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>

              {/* Primary Send Button (Opens user's default email app) */}
              <button
                type="submit"
                className="w-full mt-2 py-3 bg-brand-100 text-brand-950 font-semibold rounded hover:bg-white transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Open Email &amp; Send RSVP
              </button>

              {/* Webmail Quick-Compose Options for users on Yahoo, Outlook, Gmail, etc. */}
              <div className="pt-4 border-t border-brand-800/80 text-center">
                <p className="text-[11px] text-brand-400 uppercase tracking-wider mb-2">
                  Or compose directly in your webmail service:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={yahooWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors"
                  >
                    Yahoo Mail
                    <ExternalLink className="w-3 h-3 text-brand-400" />
                  </a>
                  <a
                    href={outlookWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors"
                  >
                    Outlook / Hotmail
                    <ExternalLink className="w-3 h-3 text-brand-400" />
                  </a>
                  <a
                    href={gmailWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors"
                  >
                    Gmail
                    <ExternalLink className="w-3 h-3 text-brand-400" />
                  </a>
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors"
                  >
                    Apple / Other App
                    <ExternalLink className="w-3 h-3 text-brand-400" />
                  </a>
                </div>
              </div>
            </div>

            {submitted && (
              <div className="mt-4 p-3 bg-brand-950/80 border border-brand-700 rounded text-center text-xs text-brand-200">
                <Check className="w-4 h-4 text-green-400 inline mr-1.5" />
                Opening your email message. If your email app didn't open, use the webmail buttons above or email us directly at <strong className="text-white">{rsvpEmail}</strong>.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
