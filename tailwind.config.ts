import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vanilla: '#FFF7E6',
        blush: '#F7C8D3',
        rosewood: '#B46A72',
        sage: '#A8B58A',
        misty: '#A9B7C6',
        midnight: '#2D3A47',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        script: ['Great Vibes', 'cursive'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: "0", transform: 'translateY(30px)' },
          '100%': { opacity: "1", transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config;
