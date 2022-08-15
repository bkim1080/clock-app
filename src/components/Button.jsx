import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
	return (
		<button
			className={props.isPanelOpen ? `${styles["open-panel"]} ${styles.button}` : styles.button}
			onClick={props.displayPanel}
		>
			{props.isPanelOpen ? "LESS" : "MORE"}
			<img
				className={props.isPanelOpen ? `${styles["up-arrow-icon"]}` : `${styles["down-arrow-icon"]}`}
				src="../../assets/desktop/icon-arrow-up.svg"
				alt="arrow icon"
			/>
		</button>
	);
}
