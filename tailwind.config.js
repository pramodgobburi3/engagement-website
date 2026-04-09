/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#7C9070',
          light: '#A8B89A',
          dark: '#4E6347',
        },
        terracotta: {
          DEFAULT: '#C1692A',
          light: '#D4845A',
          dark: '#8F4A1A',
        },
        cream: {
          DEFAULT: '#F5EDD6',
          light: '#FAF5EC',
          dark: '#E8D9B5',
        },
        warmBrown: {
          DEFAULT: '#6B4226',
          light: '#8B5E3C',
          dark: '#2C1A0E',
        },
        marigold: {
          DEFAULT: '#E8A020',
          light: '#F0BB50',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Lato"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
