/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 2px 1px rgba(0,0,0,.4)",
      },
    },
  },
  plugins: [],
};
