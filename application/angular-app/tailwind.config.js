/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(to right, #e0e0e0 0%, #f5f5f5 20%, #e0e0e0 40%, #e0e0e0 100%)",
      },
    },
  },
  plugins: [],
};
