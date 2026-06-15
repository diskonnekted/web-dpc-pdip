/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#AC0001',
          'red-dark': '#900101',
          'red-darkest': '#5A0004',
          gold: '#DAAA56',
          'gold-dark': '#BD8B33',
          dark: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}
