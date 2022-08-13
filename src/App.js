import { useState, useEffect } from "react";

import Clock from "./components/Clock";
import InfoPanel from "./components/InfoPanel";
import Quote from "./components/Quote";

function App() {
	const [timeInfo, setTimeInfo] = useState({ datetime: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const time = timeInfo.datetime.slice(11, 16);
	const hour = parseInt(timeInfo.datetime.slice(11, 13));
	const timezone = timeInfo.abbreviation;

	const getTimeData = async function () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("http://worldtimeapi.org/api/ip");
			if (!response.ok) {
				throw new Error("Problem getting data (404)");
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

	let clockContent = <p></p>;
	if (timeInfo.datetime !== "") {
		clockContent = <Clock time={time} hour={hour} timezone={timezone} error={error} />;
	}
	if (error) {
		clockContent = <p>{error}</p>;
	}
	if (isLoading) {
		clockContent = <p>Loading...</p>;
	}

	return (
		<>
			<Quote />
			{clockContent}
			<InfoPanel />
		</>
	);
}

export default App;
