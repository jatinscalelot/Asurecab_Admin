/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px',
        // => @media (min-width: 450px) { ... }
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        'primary': '#FF7E2E',
        'primary-dark': '#E86717',
        'primary-light': '#FFA366',
        'g1': '#000',
        'g2': '#232E3C',
        'g5': '#5E6E82',
        'g7': '#9DA9BB',
        'g6': '#748194',
        'l1': '#EAF6F9',
        'l2': '#D8E2EF',

        'l3': '#EDF2F9',
        'l4': '#F9FAFD',

        'red': '#FF3B30',
      },
      fontSize: {
        '84': ['84px', '96px'],
        '70': ['70px', '80px'],
        '64': ['64px', '54px'],

        '66': ['66px', '76px'],
        '56': ['56px', '66px'],
        '54': ['54px', '64px'],

        '50': ['50px', '61px'],
        '48': ['48px', '58px'],

        '46': ['46px', '61px'],
        '40': ['40px', '52px'],
        '36': ['36px', '46px'],
        '32': ['32px', '40px'],
        '30': ['30px', '40px'],

        '28': ['28px', '36px'],
        '26': ['26px', '36px'],
        '24': ['24px', '32px'],
        '22': ['22px', '30px'],
        '20': ['20px', '28px'],
        '18': ['18px', '26px'],
        '16': ['16px', '24px'],
        '14': ['14px', '22px'],
        '12': ['12px', '18px'],
      },
      fontFamily: {
        'Prata': ['Prata', 'serif'],
        'Lexend': ['Lexend', 'sans-serif']
      },
    },
  },
  plugins: [],
}

