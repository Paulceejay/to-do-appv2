/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primaryIndigo: "#6f5ff5",
      secondaryIndigo: "#7869f6",
      activeIndigo: "#9084f7",
      white: "#ffffff",
      footerIcons: "#bac4d3",
      textColor: "#d8dbe0",
      primaryBlack: "#76797d",
      secondaryBlack: "#4e5157",
      green: "#00b75d",
      red: "#ef4444",
      primaryLightTheme: "#f2f4f8",
      secondaryLightTheme: "#d5dbe7",
      secondaryLightTheme2: "#c4c9d0",
      darkTheme: "#161722",
      darkerTheme: "#25273c",
      darkLightTheme: "#777a92",
      darkGrayTheme: "#4d5066",
      darkerGrayTheme: "#393a4c",
      slate: "#cbd5e1",
      transparent: "#000000A5",
    },
    extend: {
      display: ["group-hover"],
      animation: {
        spinner: "spinner 1.2s linear infinite",
        todosAppear: "todosAppear 1s ease-out forwards",
      },
      keyframes: {
        spinner: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        todosAppear: {
          "0%": { transform: "translateY(3rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
