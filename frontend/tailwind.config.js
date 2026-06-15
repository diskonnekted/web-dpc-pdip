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
        'brand-red': '#D41F26',
        'brand-red-dark': '#991419',
        'brand-red-darkest': '#5A0004',
        'brand-gold': '#DAAA56',
        'brand-gold-dark': '#BD8B33',
        'brand-aqua': '#95D9C0',
        'brand-dark': '#1a1a1a',
      }
    },
  },
  plugins: [],
}
