/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tennis: {
          green: "#4ade80",
          court: "#22c55e",
          net: "#16a34a",
        },
      },
    },
  },
  plugins: [],
};
