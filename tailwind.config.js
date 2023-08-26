/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    colors: {
      'azul': '#202537',
      'azul-300': '#DADCE008',
      'azul-200': '#565F7E',
      'darkgris': '##939B9F',
      'gris-100': '#F3F3F3',
      'gris-200': '#939B9F4D',
      'gris-300': '#939B9F',
      'amarillo': '#CEB02C',
      'ligham': '#CEB02C',
      'darkam': '#CEB02C',
      'verde': '#66A060',
      'negro': '#000000',
      'blanco': '#ffff'
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '18px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '35px',
      '5xl': '40px',
    },
    extend: {},
  },
  plugins: [
    
  ],
}

