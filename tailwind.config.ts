import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        test: 'repeat(auto-fit, minmax(15rem, 1fr))'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        patua: ['var(--font-patua)']
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
