/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#fef6ef",
          dark: "#1a1a1a", // from dark mode
        },
        accent: {
          DEFAULT: "#fce2ce",
          dark: "#2d2d2d", // from dark mode
        },
        chat: {
          darkText: "#553922",
          lightText: "#616161",
          placeholder: "#9e9e9e",
          border: "#757575",
          buttonBg: "#fce2ce",
          buttonText: "#92613a",
          link: "#c3824e",
          error: "#d32f2f",
          success: "#4caf50",
        },
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

