import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      translate: {
        '-1/2': '-50%',
      },
      height: {
        '70vh': '70vh',
        '80px': '80px',
        '160px': '160px',
      },
      width: {
        '80px': '80px',
        '160px': '160px',
      },
    },
  },
  plugins: [],
} satisfies Config;
