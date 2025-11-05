/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        extralight: ["extralight"],
        light: ["light"],
        regular: ["regular"],
        medium: ["medium"],
        semibold: ["semibold"],
        bold: ["bold"],
      },
    },
  },
  plugins: [],
};
