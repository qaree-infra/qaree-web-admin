"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

function ThemeToggle() {
	const { theme, systemTheme, setTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;
	const toggledTheme = currentTheme === "light" ? "dark" : "light";

	return (
		<Button
			size={"icon"}
			variant={"outline"}
			onClick={() => {
				setTheme(toggledTheme);
			}}
			aria-labelledby="theme-toggle-button"
		>
			{currentTheme === "light" ? <Sun /> : <Moon />}
		</Button>
	);
}

export default ThemeToggle;
