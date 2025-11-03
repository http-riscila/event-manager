// tailwind.config.mjs
import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js", // importante para classes Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};
