import type { Config } from "tailwindcss";
import { shadcnPlugin } from "./src/lib/shadcn-plugin";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],

	plugins: [require("tailwindcss-animate"), shadcnPlugin],
} satisfies Config;

export default config;
