import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#07111f",
          900: "#0a1729",
          800: "#10223a"
        },
        ink: {
          900: "#111827",
          700: "#334155",
          500: "#64748b"
        },
        cyan: {
          electric: "#13c8ff",
          soft: "#e8f8ff"
        },
        cloud: "#f5f7fb"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
        line: "0 0 0 1px rgba(148, 163, 184, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
