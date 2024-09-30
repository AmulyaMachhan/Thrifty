import flowbitePlugin from "flowbite/plugin";
import flowbite from "flowbite-react/tailwind";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ["Abril Fatface", "serif"],
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [flowbitePlugin, flowbite.plugin(), nextui()],
};
