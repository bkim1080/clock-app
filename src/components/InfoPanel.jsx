import styles from "./InfoPanel.module.css";

export default function InfoPanel(props) {
	return (
		<section className={props.isNight ? `${styles["info-panel-night"]}` : `${styles["info-panel-day"]}`}>
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
		</section>
	);
}
