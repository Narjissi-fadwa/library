/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'cursive'],
      },
    },
  },
  plugins: [],
}

