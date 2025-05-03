import flowbiteReact from "flowbite-react/plugin/tailwindcss";
const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors :{
        "main": "#7AE2CF",
        "submain":'#077A7D',
      }
    },
  },
  plugins: [flowbiteReact,heroui()],
  darkMode: "class"
}