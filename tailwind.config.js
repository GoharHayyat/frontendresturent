/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'wave-png': "url('./assets/wave.png')",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-[#f5fafd]",
    "bg-[#fcf1ed]",
    "bg-[#fbf0f4]",
    "bg-[#95c1db]",
    "bg-[#f5ab90]",
    "bg-[#e6779f]",
    "translate-x-[0vw]",
    "translate-x-[-100vw]",
    "translate-x-[-200vw]",
    {
      pattern: /left-\\[.*\\]/,
    },
  ],
};
