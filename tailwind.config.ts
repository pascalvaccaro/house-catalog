import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  safelist: [{ pattern: /^bg-(lime|orange|purple).+/}]
} satisfies Config;
