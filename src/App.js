import { useState, useEffect } from "react";

import Clock from "./components/Clock";
import InfoPanel from "./components/InfoPanel";
import Quote from "./components/Quote";

function App() {
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

	let clockContent = <p></p>;
	if (timeInfo.datetime !== "") {
		clockContent = <Clock time={time} hour={hour} timezoneAbrev={timezoneAbrev} error={error} />;
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

	let infoPanelContent = <p></p>;
	if (timeInfo.datetime !== "") {
		infoPanelContent = (
			<InfoPanel timezoneName={timezoneName} dayOfYear={dayOfYear} dayOfWeek={dayOfWeek} weekNum={weekNum} />
		);
	}
	if (error) {
		infoPanelContent = <p>{error}</p>;
	}
	if (isLoading) {
		infoPanelContent = <p>Loading...</p>;
	}

	return (
		<>
			<Quote />
			{clockContent}
			{infoPanelContent}
		</>
	);
}

export default App;
