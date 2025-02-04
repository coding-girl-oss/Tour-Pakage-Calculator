/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'), // Add scrollbar plugin
  ],
  daisyui: {
    themes: [
      {
        pinkTheme: {
          primary: "#FAD0C9", // Pink Salt
          secondary: "#6E6E6D", // Charcoal Gray
          accent: "#FFC1C1", // Optional soft accent pink
          neutral: "#6E6E6D", // Charcoal Gray as neutral
          "base-100": "#FFFFFF", // White background
          info: "#FDC1C5", // Soft pink for info
          success: "#FAD0C9", // Pink Salt for success
          warning: "#F99FA3", // Warning in pinkish tones
          error: "#F47A81", // Error in darker pink
        },
      },
    ],
  },
};

