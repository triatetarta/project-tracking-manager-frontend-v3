/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#2684FF",
        "medium-blue": "#2074e3",
        "dark-blue": "#1d66c4",
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
        "deep-purple": "#773ae7",
        "light-orange": "#f6803e",
        "medium-orange": "#dd6136",
        "deep-orange": "#cc5d34",
        "blue-text": "#1d1b84",
        "blue-fade-text": "#344b80",
        "light-green": "#13BB70",
        "medium-green": "#11a865",
        "dark-green": "#0E8D54",
        "pale-bg": "#f6fafe",
        "neat-purple": "#8c4bff",
        "neat-turquoise": "#00b6c8",
        "neat-yellow": "#f6b73e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
