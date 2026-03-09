module.exports = {
  plugins: [
    // Tailwind's PostCSS integration lives in a separate package for Tailwind v4
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};
