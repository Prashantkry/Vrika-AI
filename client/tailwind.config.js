/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "text-gradient": "text 1.5s linear infinite",
      },
      keyframes: {
        text: {
          to: {
            backgroundPosition: "200% center",
          },
        },
      },
      colors: {
        "our-blue": "#00aaaa",
        "our-blue1": "#00bbbb",
        "our-blue2": "#009999",
        grayC: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          903: "#080808", // 3
          906: "#0f0f0f", // 6
          909: "#171717", // 9
          912: "#1f1f1f", // 12
          915: "#262626", // 15
        },
        "custom-cyan": "#00AAAA",
        customCyan: "#00AAAA",
        eulaGray: "#181818",
      },
    },
  },
  plugins: [],
};
