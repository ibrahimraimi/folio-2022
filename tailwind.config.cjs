/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-writing-mode')({
      variants: ['responsive', 'hover']
    })
  ],
  important: true
};