/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sercomp: {
          100: '#6c63ff',
          200: '#424890',
          300: '#2e3267',
          400: '#1f2641',
        },
      },
      boxShadow: {
        '3xl': '0px 4px 8px rgba(0, 0, 0, 0.5);',
      }
  }
 },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"]
    }
  }
  }
