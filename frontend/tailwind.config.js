/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin, flowbite.plugin()],
};
