import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
	return (
		<button className={`${styles["button"]}`} onClick={props.displayPanel}>
			MORE
			<img
				className={props.isPanelDisplayed ? `${styles["up-arrow-icon"]}` : `${styles["down-arrow-icon"]}`}
				src="../../assets/desktop/icon-arrow-up.svg"
				alt="arrow icon"
			/>
		</button>
	);
}
