/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": {
              display: "none",
            },
            "code::after": {
              display: "none",
            },
            code: {
              backgroundColor: theme("colors.stone.200"),
              borderRadius: theme("borderRadius.DEFAULT"),
              paddingLeft: theme("spacing[1.5]"),
              paddingRight: theme("spacing[1.5]"),
              paddingTop: theme("spacing.1"),
              paddingBottom: theme("spacing.1"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
