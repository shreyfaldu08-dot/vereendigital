/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#090A0C',
          text: '#F3F1EB',
        },
        secondary: {
          bg: '#15171A',
          text: '#9A9BA2',
        },
        accent: {
          lime: '#89bc30',
          light: '#e2f0ca',
        },
        light: {
          bg: '#F0EFEA',
        },
        dark: {
          text: '#151515',
        },
        border: 'rgba(255,255,255,0.16)',
      },
      fontFamily: {
        display: ['Franklin Gothic Demi', 'Franklin Gothic Medium', 'sans-serif'],
        serif:   ['Franklin Gothic Demi', 'Franklin Gothic Medium', 'sans-serif'],
        sans:    ['Poppins', 'sans-serif'],
        mono:    ['Poppins', 'monospace'],
      },
      spacing: {
        'page': '5vw',
      }
    },
  },
  plugins: [],
}
