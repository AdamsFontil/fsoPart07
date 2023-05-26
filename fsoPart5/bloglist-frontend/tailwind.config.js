/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Lato',
          'Roboto',
          'Montserrat',
          'Source Sans Pro',
          'Open Sans',
          'Raleway',
          'Nunito',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Merriweather',
          'Georgia',
          'Playfair Display',
          'Times New Roman',
          'serif',
        ],
        mono: ['"font-mono"', 'monospace'],
      },
      colors: {
        primary: 'emerald-500',
        secondary: '#243B53',
        accent: '#F3F4F6',
        error: '#DC2626',
        success: '#059669',
        warning: '#FBBF24',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('daisyui')],
}
