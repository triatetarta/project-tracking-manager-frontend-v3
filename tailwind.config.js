/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#2684FF",
        "deep-blue": "#0254CF",
        "header-main": "#253858",
        "flow-yellow": "#FFE380",
        "flow-yellow-deep": "#ffd957",
        "flow-green": "#78f1c0",
        "flow-green-deep": "#4bebaa",
        "nice-orange": "#FF991F",
        "gray-text": "#6B778C",
        "red-text": "#DE350B",
        "red-text-light": "#e3522d",
        "ticket-bg": "#DEEBFF",
        "ticket-bg-hover": "#B3D4FF",
        "sidebar-bg": "#FAFBFC",
        "teams-bg": "#904EE2",
        "projects-bg": "#00C7E6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
