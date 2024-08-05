import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#191933',
          600: '#10101d',
        },
        secondary: '#ee9ca7',
        light: '#ffffff80',
      },
      boxShadow: {
        checkbox: '0 0 0 3px rgba(238, 156, 167, 0.2)',
        button: '0 0 12px rgba(238, 156, 167,0.4)',
      },
      spacing: {
        7.5: '30px',
      },
    },
  },
  plugins: [],
})
