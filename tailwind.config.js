/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#ff4d00',
          gold: '#ffc100',
          light: '#ff7400',
        },
        sacred: {
          saffron: '#ff4d00',
          gold: '#ffc100',
          amber: '#ff7400',
        }
      },
      fontFamily: {
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        hindi: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #ff4d00, 0 0 10px #ff4d00' },
          '50%': { boxShadow: '0 0 20px #ff4d00, 0 0 30px #ff4d00' },
        },
      },
    },
  },
  plugins: [],
}
