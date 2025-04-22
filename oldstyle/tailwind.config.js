/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f',
        'light-purple': '#F7F2FF',
        'purple': '#EADDFF',
        'dark-purple': '#AD88DA',
      },
    },
  },
  plugins: [],
}
