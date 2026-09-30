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
        display: ['Libre Franklin', 'sans-serif'],
        sans: ['Libre Franklin', 'sans-serif'],
        serif: ['Libre Franklin', 'sans-serif'],
      },
      spacing: {
        'page': '5vw',
      }
    },
  },
  plugins: [],
}
