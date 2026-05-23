/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      colors: {
        royal: {
          50: '#f6f8fb',
          100: '#e9eef8',
          500: '#1f3b82',
          700: '#0f2a66'
        },
        amber: {
          50: '#fff8f1',
          500: '#d97706'
        },
        luxury: '#b8860b'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.08)'
      }
    }
  },
  plugins: []
};
