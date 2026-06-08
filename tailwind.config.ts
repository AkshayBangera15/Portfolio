import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00f5ff",
        neon2: "#7b2fff",
        neon3: "#ff006e",
        neon4: "#00ff88",
        amber: "#ffb700",
        bg0: "#020408",
        bg1: "#030b12",
        bg2: "#041220",
        bg3: "#051930",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        display: ["Syne", "sans-serif"],
        code: ["Space Mono", "monospace"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,245,255,0.3), 0 0 40px rgba(0,245,255,0.1)",
        neon2: "0 0 20px rgba(123,47,255,0.4), 0 0 40px rgba(123,47,255,0.15)",
        neon3: "0 0 20px rgba(255,0,110,0.3)",
      },
      animation: {
        "grid-scroll": "gridScroll 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 0.8s step-end infinite",
        pulse: "pulse 2s infinite",
        glitch1: "glitch1 3s infinite linear alternate-reverse",
        glitch2: "glitch2 3s infinite linear alternate",
      },
      keyframes: {
        gridScroll: { to: { transform: "translate(40px, 40px)" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
export default config;
