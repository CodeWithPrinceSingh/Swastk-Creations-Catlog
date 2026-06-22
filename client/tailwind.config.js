/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F3',
        blush: '#F8E8E0',
        blushdark: '#F3DCD3',
        rose: {
          50: '#FBF0EE',
          100: '#F4D9D6',
          300: '#D98E96',
          500: '#9C4A52',
          600: '#8A3F47',
          700: '#6B1F2A',
          800: '#551822',
        },
        gold: '#C9A86A',
        ink: '#3D2B2E',
        inkmuted: '#7A6A6C',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        card: '0 4px 24px rgba(61, 43, 46, 0.08)',
        cardHover: '0 12px 32px rgba(61, 43, 46, 0.14)',
      },
    },
  },
  plugins: [],
};
