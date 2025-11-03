export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        blossom: {
          cream: '#fef5f1',
          light: '#fce7e4',
          rose: '#f8e5e1',
          warm: '#f5e6e0',
        },
      },
      animation: {
        'float-blossom': 'float-blossom 8s ease-in-out infinite',
        'bloom-in': 'bloom-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'petal-fall': 'petal-fall 8s linear',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
