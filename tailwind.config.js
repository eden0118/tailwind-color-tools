/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          secondary: 'var(--color-bg-secondary)',
        },
        ui: {
          DEFAULT: 'var(--color-ui-default)',
          hover: 'var(--color-ui-hover)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          'muted-hover': 'var(--color-text-muted-hover)',
        },
        accent: {
          indigo: {
            DEFAULT: 'var(--color-accent-indigo)',
            focus: 'var(--color-accent-indigo-focus)',
          },
          pink: {
            DEFAULT: 'var(--color-accent-pink)',
          },
          green: {
            DEFAULT: 'var(--color-accent-green)',
          },
        },
      },
    },
  },
  plugins: [],
};