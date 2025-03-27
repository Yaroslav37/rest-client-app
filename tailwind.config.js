export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackground: 'var(--color-dark)',
        lightBackground: 'var(--color-dark-grey)',
        primary: 'var(--color-grey)',
        secondary: 'var(--color-light-green)',
        textContrast: 'var(--color-green)',
      },
    },
  },
};