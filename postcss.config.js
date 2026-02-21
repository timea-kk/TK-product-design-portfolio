/**
 * postcss.config.js – PostCSS pipeline for the project.
 * Tailwind runs first to process @tailwind directives; Autoprefixer adds vendor prefixes to CSS.
 * Vite runs this automatically when building or serving.
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
