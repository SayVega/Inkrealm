/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        primary: "#1a365d",
        secondary: "#2d3748",
        accent: "#ed8936",
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
} 