/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Kenifraze Kings College identity — muted navy & gold, not a generic SaaS palette.
        ink: {
          DEFAULT: "#16233F", // sidebar / primary dark
          light: "#1E2F52",
          deep: "#0F1830", // dark-mode surface
        },
        parchment: {
          DEFAULT: "#F6F4EF", // main content background, light mode
          card: "#FFFFFF",
        },
        gold: {
          DEFAULT: "##F55A28",
          soft: "#D9BE7E",
          muted: "#8C6C1F",
        },
        slate: {
          text: "#2A2E35",
          muted: "#6B7280",
        },
        brick: "#B54A3F",
        forest: "#3F7D58",
      },
      fontFamily: {
        display: ["\"Source Serif 4\"", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
