import React from "react";
import styles from "./Clock.module.css";

export default function Clock(props) {
	// Render Greeting Message
	const chooseGreeting = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return "GOOD MORNING";
		} else if (props.hour >= 12 && props.hour < 18) {
			return "GOOD EVENING";
		} else {
			return "GOOD NIGHT";
		}
	};
	// Render Symbol
	const chooseSymbol = () => {
		if (props.hour >= 5 && props.hour < 17) {
			return <img className="symbol" src="/assets/desktop/icon-sun.svg" alt="sun" />;
		} else {
			return <img className="symbol" src="/assets/desktop/icon-moon.svg" alt="moon" />;
		}
	};
	return (
		<div>
			<div>
				<span className={styles.message}>{chooseSymbol()}</span>
				<span className={styles.message}>{chooseGreeting()}</span>
			</div>
			<span className={styles.time}>{props.time}</span>
			<span className={styles.timezone}>{props.timezone}</span>
		</div>
	);
}
