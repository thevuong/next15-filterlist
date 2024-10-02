import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  safelist: ['bg-primary', 'bg-primary-dark', 'bg-primary-darker', 'bg-accent-cyan', 'bg-accent-purple', 'bg-gray-400'],
  theme: {
    extend: {
      colors: {
        accent: {
          cyan: '#2399FA',
          purple: '#7C23FA',
        },
        primary: {
          DEFAULT: '#2457FA',
          dark: '#183BAD',
          darker: '#142F8B',
          light: '#BECDFF',
          lighter: '#DFE7FF',
        },
      },
    },
  },
};
export default config;
