const colors = require('tailwindcss/colors');

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
