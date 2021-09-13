module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: '#009186',
        'mobile-appbar': 'white',
        main: '#F7F7F7',
        sidebar: '#2D3142',
        todo: 'white',
        'list-item-active': '#009186',
      },
      textColor: {
        primary: '#009186',
        light: 'white',
        dark: '#2D3142',
      },
      transitionDelay: {
        0: '0ms',
      },
      transitionDuration: {
        0: '0ms',
      },
      screens: {
        'd-touch': { raw: '(hover: none)' },
      },
      zIndex: {
        appbar: 80,
        'option-menu-back': 89,
        'option-menu': 90,
        'option-menu-items': 91,
        'side-menu': 100,
        'dialog-backdrop': 109,
        dialog: 1100,
      },
      boxShadow: {
        dialog: '0 0 6px 3px rgba(0, 0, 0, 0.3)',
        'side-menu': '1px 0 6px 2px rgba(0, 0, 0, 0.5)',
        todo: '0 0 6px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
