/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      size: {
        smallIco: '24px'
      },
      fill: {
        main: '#e2e8f0'
      },
      transitionDuration: {
        DEFAULT: '300ms'
      }
    },
    fontFamily: {
      main: ['Ubuntu', 'serif'],
      secondary: ['Tahoma', 'sans-serif']
    }
  },
  plugins: []
}
