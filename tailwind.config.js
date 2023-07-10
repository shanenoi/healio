/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-blue-300": "#4285f4",
        "monochrome-white": "#fff",
        whitesmoke: "#f8f8f8",
        "neutral-grey-200": "#e9e9e9",
        "neutral-grey-500-secondary": "#808080",
        "semantic-error-error-05": "#ed1b2e",
        "neutral-grey-600": "#626262",
        "neutral-grey-700": "#3c3c3c",
        "red-red-400": "#ea4335",
        "grey-grey-40-t": "#dfdfe2",
        "grey-grey-300-s": "#888b96",
        "grey-grey-900-p": "#202124",
        "blue-blue-400": "#2b77f3",
        "blur-background": "rgba(0, 0, 0, 0.3)",
        "neutral-neutral-6": "#222",
        "red-red-500": "#de2817",
        "blue-blue-600": "#0b51c1",
        mediumaquamarine: "#9feaca",
        "blue-blue-800": "#09454d",
      },
      fontFamily: {
        "button-button-2": "Roboto",
        "mobile-body-subtitle-2": "'Open Sans'",
      },
      borderRadius: {
        "3xs": "10px",
        xl: "20px",
        "81xl": "100px",
      },
    },
    fontSize: {
      sm: "14px",
      xs: "12px",
      base: "16px",
      xl: "20px",
      "29xl": "48px",
      lg: "18px",
      "13xl": "32px",
      "77xl": "96px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
