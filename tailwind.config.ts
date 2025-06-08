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
        purple: {
          deep: "#1b1140",
          medium: "#251a4a",
          light: "#352a52",
        },
        blue: {
          primary: "#1a73e8",
          hover: "#1665cb",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config; 