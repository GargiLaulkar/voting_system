/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          primary: '#0F1C3F',
          accent: '#1E56C8',
          success: '#0A7C42',
          warning: '#C47A0A',
          bg: '#F4F6FB',
          card: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
