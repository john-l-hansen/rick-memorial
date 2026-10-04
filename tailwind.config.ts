import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FAF8F6",   // Warm Linen Canvas
          100: "#F4EFEC",  // Soft Alabaster
          200: "#EBE2DD",  // Warm Sand
          300: "#DDCDC4",  // Neutral Sand
          400: "#C7B0A2",  // Soft Clay
          500: "#B09280",  // Muted Cocoa
          600: "#9A7B68",  // Walnut Accent
          700: "#806555",  // Warm Timber Accent
          800: "#6B5649",  // Rich Chestnut
          900: "#5C4B40",  // Deep Earth Primary
          950: "#30251F",  // Espresso Dark Accent
          975: "#1F1814",  // Midnight Espresso
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Cabin", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(48, 37, 31, 0.07)",
        elevated: "0 12px 36px -4px rgba(48, 37, 31, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
