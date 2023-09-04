import React, { useEffect, useState } from "react";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/outline";
import { ThemeTypes } from "../../Constants/types";
type Props = {};

const ThemeToggler: React.FC<Props> = (props) => {
	const [theme, setTheme] = useState<ThemeTypes>("light");
	useEffect(() => {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (prefersDark) {
			document.documentElement.classList.add("dark");
			setTheme("dark");
		}
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	const onThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<div className='theme-container' onClick={onThemeToggle}>
			<SunIcon
				width={22}
				height={22}
				color='#fff200'
				className={`theme-icon ${theme === "dark" ? "translate-y-0" : "translate-y-24 opacity-0 -z-10"}`}
			/>
			<MoonIcon
				width={22}
				height={22}
				color='#000000'
				className={`theme-icon ${theme === "dark" ? "translate-y-24 opacity-0 -z-10" : "translate-y-0"}`}
			/>
			<span className=''>{theme === "dark" ? "Light" : "Dark"}</span>
		</div>
	);
};

export default ThemeToggler;
