module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This enables the class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'comic-sans': ['"Comic Sans MS"', 'cursive'],
      },
      // Add any additional colors if needed
    },
  },
  plugins: [],
}