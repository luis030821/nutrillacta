import type { Config } from "tailwindcss";
import color from "tailwindcss/colors";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./infraestructure/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      paleta: {
        100: "#FA6900",
        200: "#f8f6f4",
        300: "#fff",
        // 300: "#FAFAFA",
        400: "#CDBDAE",
        500: "#fdefe6",
        600: "#EFEFEF",
        700: "#ccc",
        800: "#001e42",
        900: "#000000",
      },
      "blaze-orange": {
        "50": "#fff8ec",
        "100": "#fff0d3",
        "200": "#ffdea5",
        "300": "#ffc56d",
        "400": "#ffa132",
        "500": "#ff840a",
        "600": "#fa6900",
        "700": "#cc4d02",
        "800": "#a13c0b",
        "900": "#82330c",
        "950": "#461704",
      },
      "midnight-blue": {
        "50": "#e9faff",
        "100": "#cef3ff",
        "200": "#a7ecff",
        "300": "#6be4ff",
        "400": "#26d0ff",
        "500": "#00aaff",
        "600": "#0080ff",
        "700": "#0065ff",
        "800": "#0057e6",
        "900": "#004eb3",
        "950": "#001e42",
      },
      ...color,
    },
  },
  plugins: [],
};
export default config;
