import React from "react";
import styles from "./Clock.module.css";

export default function Clock(props) {
	return (
		<div>
			<span className={styles.time}>{props.time}</span>
			<span className={styles.timezone}>{props.timezone}</span>
		</div>
	);
}
