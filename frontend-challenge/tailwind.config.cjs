import { defineConfig } from "tailwindcss";

module.exports ={
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // blue
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F59E0B", // yellow-orange
          light: "#FBBF24",
        },
        accent: {
          gray: "#6B7280",
          lightGray: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
