module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-brandDark',
    'text-light',
    'bg-bg',
    'bg-card',
    'text-text',
  ],
theme: {
  extend: {
    colors: {
      background: '#F5F5F5',
      surface: '#FFFFFF',
      'text-main': '#1C1C1C',
      'text-muted': '#5E5E5E',
      border: '#E0E0E0',
      cta: '#000000',
      'cta-text': '#FFFFFF',
    },
  },
},
  plugins: [require('daisyui')],
};
