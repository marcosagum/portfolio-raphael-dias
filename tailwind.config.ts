import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#efeee9',
        primary: '#DEDBC8',
      },
      fontFamily: {
        hn: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Almarai', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
