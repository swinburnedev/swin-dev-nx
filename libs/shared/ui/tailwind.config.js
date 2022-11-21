/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  presets: [
    require('../../../tailwind.preset.js')
  ]
}
