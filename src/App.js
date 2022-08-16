import { useState, useEffect } from "react";
import styles from "./App.module.css";

import Button from "./components/Button";
import Clock from "./components/Clock";
import InfoPanel from "./components/InfoPanel";
import Quote from "./components/Quote";

function App() {
	// Button
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const displayPanel = function () {
		setIsPanelOpen((prevIsPanelOpen) => !prevIsPanelOpen);
	};

	// Fetch Time Info
	const [timeInfo, setTimeInfo] = useState({ datetime: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getTimeData = async function () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("http://worldtimeapi.org/api/ip");
			if (!response.ok) {
				throw new Error("Loading Failed");
			}
			const data = await response.json();
			setTimeInfo(data);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getTimeData();
	}, []);

	// Clock
	const time = timeInfo.datetime.slice(11, 16);
	const hour = parseInt(timeInfo.datetime.slice(11, 13));
	const timezoneAbrev = timeInfo.abbreviation;
	const timezoneName = timeInfo.timezone;
	let isNight;
	if (5 <= hour <= 23) {
		isNight = true;
	} else {
		isNight = true;
	}

	let clockContent = <p></p>;
	if (timeInfo.datetime !== "") {
		clockContent = (
			<Clock isPanelOpen={isPanelOpen} time={time} hour={hour} timezoneAbrev={timezoneAbrev} error={error} />
		);
	}
	if (error) {
		clockContent = <p>{error}</p>;
	}
	if (isLoading) {
		clockContent = <p>Loading...</p>;
	}

	// InfoPanel
	const dayOfYear = timeInfo.day_of_year;
	const dayOfWeek = timeInfo.day_of_week;
	const weekNum = timeInfo.week_number;

	let infoPanelContent;
	if (timeInfo.datetime !== "" && isPanelOpen) {
		infoPanelContent = (
			<InfoPanel
				isNight={isNight}
				isPanelOpen={isPanelOpen}
				timezoneName={timezoneName}
				dayOfYear={dayOfYear}
				dayOfWeek={dayOfWeek}
				weekNum={weekNum}
			/>
		);
	}
	if (error) {
		infoPanelContent = <p>{error}</p>;
	}
	if (isLoading) {
		infoPanelContent = <p>Loading...</p>;
	}

	return (
		<div className={isNight ? `${styles["container-night"]}` : `${styles["container-day"]}`}>
			{!isPanelOpen && <Quote />}
			{clockContent}
			<Button isPanelOpen={isPanelOpen} displayPanel={displayPanel} />
			{infoPanelContent}
		</div>
	);
}

export default App;
