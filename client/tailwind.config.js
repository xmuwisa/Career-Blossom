/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Open Sans", "sans-serif"],
      serif: ["Roboto Serif", "Georgia", "serif"],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [],
  },
}

