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
				MORE
				<img
					className={isPanelDisplayed ? `${styles["up-arrow-icon"]}` : `${styles["down-arrow-icon"]}`}
					src="../../assets/desktop/icon-arrow-up.svg"
					alt="arrow icon"
				/>
				{/* {isPanelDisplayed ? (
					<img
						className={`${styles["up-arrow-icon"]}`}
						src="../../assets/desktop/icon-arrow-up.svg"
						alt="up arrow icon"
					/>
				) : (
					<img
						className={`${styles["down-arrow-icon"]}`}
						src="../../assets/desktop/icon-arrow-down.svg"
						alt="down arrow icon"
					/>
				)} */}
			</button>
			{isPanelDisplayed && (
				<div className={`${styles["info-panel"]}`}>
					<ol className={`${styles["list"]}`}>
						<li className={`${styles["list-item"]}`}>
							<span className={`${styles["category"]}`}>CURRENT TIMEZONE</span>
							<span className={`${styles["data"]}`}>{props.timezoneName}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span className={`${styles["category"]}`}>DAY OF THE YEAR</span>
							<span className={`${styles["data"]}`}>{props.dayOfYear}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span className={`${styles["category"]}`}>DAY OF THE WEEK</span>
							<span className={`${styles["data"]}`}>{props.dayOfWeek}</span>
						</li>
						<li className={`${styles["list-item"]}`}>
							<span className={`${styles["category"]}`}>WEEK NUMBER</span>
							<span className={`${styles["data"]}`}>{props.weekNum}</span>
						</li>
					</ol>
				</div>
			)}
		</div>
	);
}
