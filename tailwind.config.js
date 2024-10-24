module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all React components are scanned for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  ignoreWarnings: [
    {
      module: /tailwind-merge/,
      message: /Failed to parse source map/,
    },
  ],
};
