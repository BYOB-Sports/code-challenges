/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#167968",
        accent: "#FF6B35"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
}
