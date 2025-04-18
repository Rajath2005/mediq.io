module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind's base reset
  },
};
