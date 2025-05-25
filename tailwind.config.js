/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#735344',
          light:   '#8A6553',
          dark:    '#5D4237',
        },
        secondary: {
          DEFAULT: '#00CABA',
          light:   '#00E6D5',
          dark:    '#00A89A',
        },
        accent: {
          DEFAULT: '#F07522',
          light:   '#F5923F',
          dark:    '#D86A1B',
        },
        taupe: {
          DEFAULT: '#796451',
          light:   '#9A8573',
          dark:    '#5A4A3E',
        },
        neutral: {
          DEFAULT: '#F5F7FA',
          dark:    '#3A3A3A',
        },
      },
      keyframes: {
        colorCycle: {
          '0%, 100%': { color: '#FFFFFF' },
          '25%':      { color: '#00CABA' },
          '50%':      { color: '#F5F7FA' },
          '75%':      { color: '#F07522' },
        },
        imageCycle: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '25%':      { filter: 'hue-rotate(90deg)' },
          '50%':      { filter: 'hue-rotate(180deg)' },
          '75%':      { filter: 'hue-rotate(270deg)' },
        },
        backgroundCycle: {
          '0%, 100%': { backgroundImage: 'linear-gradient(to right, #735344, #8A6553)' },
          '33%':      { backgroundImage: 'linear-gradient(to right, #8A6553, #F07522)' },
          '66%':      { backgroundImage: 'linear-gradient(to right, #F07522, #735344)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        colorCycle:      'colorCycle 8s infinite',
        imageCycle:      'imageCycle 8s infinite',
        backgroundCycle: 'backgroundCycle 15s infinite',
        fadeIn:          'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
