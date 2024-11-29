/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontSize: {
        '9xl': 'clamp(3rem, 10vw, 9rem)',
        '10xl': 'clamp(4rem, 12vw, 10rem)',
        '11xl': 'clamp(5rem, 15vw, 11rem)',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Jetbrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
}

