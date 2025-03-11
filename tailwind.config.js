/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow"],
        dh: ["Do Hyeon"],
        sans: ["Sans"],
        lex: ["Lexend Giga"],
        misans: ["MiSansLatin"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide")
  ]
}
