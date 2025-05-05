import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Add this line to scan your project files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
};

export default config;
