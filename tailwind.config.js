/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        thelamonblack: ['thelamonblack', 'sans-serif'],
        'bleeding-cowboys': ['bleeding-cowboys', 'sans-serif']
      },
      backgroundImage: {
        background: "url('/images/background.png')"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
