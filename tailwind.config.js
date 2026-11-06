/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0369A1',
          700: '#075985',
          800: '#0C4A6E',
          900: '#082F49',
        },
        tealbrand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          500: '#A855F7',
          600: '#9333EA',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FEF9EF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 148, 136, 0.08), 0 2px 6px -1px rgba(2, 132, 199, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 40px -15px rgba(2, 132, 199, 0.15)',
        'elderly': '0 10px 25px -5px rgba(15, 118, 110, 0.12), 0 8px 10px -6px rgba(15, 118, 110, 0.08)',
      }
    },
  },
  plugins: [],
}
