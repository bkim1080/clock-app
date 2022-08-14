import { useState } from "react";
import styles from "./InfoPanel.module.css";

export default function InfoPanel(props) {
	const [isPanelDisplayed, setIsPanelDisplayed] = useState(false);

	const displayPanel = function () {
		setIsPanelDisplayed((prevIsPanelDisplayed) => !prevIsPanelDisplayed);
	};

	return (
		<div>
			<button className={`${styles["button"]}`} onClick={displayPanel}>
				MORE{" "}
				<img
					className={`${styles["arrow-icon"]}`}
					src="../../assets/desktop/icon-arrow-down.svg"
					alt="down arrow icon"
				/>
			</button>
			{isPanelDisplayed && (
				<div>
					<ol>
						<li className={`${styles["list-item"]}`}>
							<span>CURRENT TIMEZONE</span>
							<span>{props.timezoneName}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span>DAY OF THE YEAR</span>
							<span>{props.dayOfYear}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span>DAY OF THE WEEK</span>
							<span>{props.dayOfWeek}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span>WEEK NUMBER</span>
							<span>{props.weekNum}</span>
						</li>
					</ol>
				</div>
			)}
		</div>
	);
}
