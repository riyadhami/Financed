/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Add autoprefixer for vendor prefixes
  },
};

export default config;