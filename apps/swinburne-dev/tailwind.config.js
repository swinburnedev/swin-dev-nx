/** @type {import('tailwindcss').Config} */
// const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
// TODO do we need to purse css for apps / libs - still required in tailwind v3?
module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  presets: [
    require('../../tailwind.preset.js')
  ]
}
