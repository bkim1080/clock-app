import styles from "./InfoPanel.module.css";

export default function InfoPanel(props) {
	return (
		<section className={props.isNight ? `${styles["info-panel-night"]}` : `${styles["info-panel-day"]}`}>
			<div className={`${styles["container-content"]}`}>
				<div className={`${styles["container-data"]}`}>
					<span className={`${styles["data-category"]}`}>CURRENT TIMEZONE</span>
					<span className={`${styles["data"]}`}>{props.timezoneName}</span>
				</div>
				<div className={`${styles["container-data"]}`}>
					<span className={`${styles["data-category"]}`}>DAY OF THE YEAR</span>
					<span className={`${styles["data"]}`}>{props.dayOfYear}</span>
				</div>
				<div className={`${styles["container-data"]}`}>
					<span className={`${styles["data-category"]}`}>DAY OF THE WEEK</span>
					<span className={`${styles["data"]}`}>{props.dayOfWeek}</span>
				</div>
				<div className={`${styles["container-data"]}`}>
					<span className={`${styles["data-category"]}`}>WEEK NUMBER</span>
					<span className={`${styles["data"]}`}>{props.weekNum}</span>
				</div>
			</div>
		</section>
	);
}
