/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'serif'],  // Здесь добавляется шрифт по умолчанию
      },
      colors: {
        "primary": "linear-gradient(to right, #323BE7, #4D73EA"
      },
    },
  },
  plugins: [],
};