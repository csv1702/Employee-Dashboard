export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d7ebff",
          200: "#b6d8ff",
          300: "#8abfff",
          400: "#579df7",
          500: "#2f7bf5",
          600: "#255fd8",
          700: "#1f4eaf",
          800: "#1f438e",
          900: "#213d75",
        },
        accent: {
          50: "#e6fcf7",
          100: "#c6f8ea",
          200: "#95efd8",
          300: "#62e0be",
          400: "#3ec9a4",
          500: "#17af8a",
          600: "#0f8f70",
          700: "#0e735c",
          800: "#105c4b",
          900: "#0f4c3f",
        },
        neutral: {
          50: "#f7f9fc",
          100: "#edf1f7",
          200: "#dfe6f0",
          300: "#c9d4e2",
          400: "#9caabd",
          500: "#6f8097",
          600: "#52617a",
          700: "#3a475e",
          800: "#243149",
          900: "#151f32",
          950: "#0a1221",
        },
        success: {
          500: "#12b76a",
          600: "#039855",
        },
        error: {
          500: "#f04438",
          600: "#d92d20",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 34px -18px rgba(15, 23, 42, 0.45)",
        card: "0 6px 20px -12px rgba(15, 23, 42, 0.25)",
        lift: "0 16px 40px -22px rgba(47, 123, 245, 0.45)",
      },
      borderRadius: {
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out",
      },
    },
  },
  plugins: [],
};
