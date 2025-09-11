export default {
  darkMode: "class", 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: {
            light: "#bbf7d0",
            DEFAULT: "#16a34a",
            dark: "#166534",
          },
          clay: "#d97706",
          grass: "#65a30d",
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};