/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        breathe: 'breathe 5s ease-in-out infinite',
        'float-up': 'floatUp 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(94,234,212,0)' },
          '50%': { transform: 'scale(1.06)', boxShadow: '0 0 40px 10px rgba(94,234,212,0.15)' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.4' },
          '50%': { transform: 'translateY(-12px)', opacity: '0.7' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
