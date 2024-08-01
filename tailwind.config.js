/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        padrao: 'Lato',
      },
      colors: {
        'azul-texto': '#3B97BC',
        'azul-logo': '#3CACDD',
        'roxao': '#6D28D9',
      },
    },
  },
  plugins: [],
}