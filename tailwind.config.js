/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#afecff",
        secondary: "#ffb2bf",
        accent:    "#00d9ff",
        surface:   "#1a2123",
        bg:        "#0e1417",
        muted:     "#bbc9ce",
        text:      "#dde4e6",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        sans:    ["Inter", "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
        xl:    "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        brand:      "0 0 40px rgba(0, 217, 255, 0.15)",
        "brand-lg": "0 0 80px rgba(0, 217, 255, 0.25)",
        card:       "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        hover:      "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "glow-pulse": "glowPulse 2.4s ease-in-out infinite",
        "float-y":    "floatY 4s ease-in-out infinite",
        "fade-up":    "fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
        shimmer:      "shimmer 1.5s infinite",
        "page-fade":  "pageFade 0.4s ease",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 16px rgba(0, 217, 255, 0.25)" },
          "50%":      { boxShadow: "0 0 40px rgba(0, 217, 255, 0.55)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pageFade: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};