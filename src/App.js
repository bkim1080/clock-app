import { useState, useEffect } from "react";

import Clock from "./components/Clock";
import InfoPanel from "./components/InfoPanel";
import Quote from "./components/Quote";

function App() {
	const [info, setInfo] = useState({ datetime: "" });
	const [error, setError] = useState(null);

	const time = info.datetime.slice(11, 16);
	const hour = parseInt(info.datetime.slice(11, 13));
	const timezone = info.abbreviation;

	const getTimeData = async function () {
		try {
			const response = await fetch("http://worldtimeapi.org/api/ip");
			if (!response.ok) {
				throw new Error("Problem getting data");
			}
			const data = await response.json();
			setInfo(data);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		getTimeData();
	}, []);

	let clockContent = <p></p>;

	if (error) {
		clockContent = <p>{error}</p>;
	} else {
		clockContent = <Clock time={time} hour={hour} timezone={timezone} error={error} />;
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
