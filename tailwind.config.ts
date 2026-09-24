import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#061A36",
          50: "#EEF2F7",
          100: "#D6E0EC",
          200: "#AFC2DA",
          300: "#7E9AC0",
          400: "#4C71A0",
          500: "#2C5080",
          600: "#1C3A63",
          700: "#122A4A",
          800: "#0C1F38",
          900: "#061A36",
          950: "#040F20",
        },
        gold: {
          DEFAULT: "#C9962B",
          50: "#FBF4E7",
          100: "#F5E5C4",
          200: "#EBCC8D",
          300: "#DFB35B",
          400: "#D3A23F",
          500: "#C9962B",
          600: "#A87721",
          700: "#805B1A",
          800: "#5A3F13",
          900: "#38270C",
        },
        surface: "#F7F8FA",
        ink: "#111827",
        muted: "#64748B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(6,26,54,0.04), 0 4px 16px -8px rgba(6,26,54,0.10)",
        "card-hover": "0 2px 4px rgba(6,26,54,0.05), 0 10px 24px -10px rgba(6,26,54,0.14)",
        nav: "0 1px 0 rgba(6,26,54,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
