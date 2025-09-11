/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'byob-yellow': '#F7F76D',
        'byob-green': '#004225',
        'byob-orange': '#FF8C42',
      }
    },
  },
  plugins: [],
}

