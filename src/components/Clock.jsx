import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

export default function Clock(props) {
	// Render Greeting Message
	const chooseGreeting = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return "GOOD MORNING";
		} else if (props.hour >= 12 && props.hour < 18) {
			return "GOOD EVENING";
		} else {
			return "GOOD NIGHT";
		}
	};
	// Render Symbol
	const chooseSymbol = () => {
		if (props.hour >= 5 && props.hour < 17) {
			return <img className="symbol" src="/assets/desktop/icon-sun.svg" alt="sun" />;
		} else {
			return <img className="symbol" src="/assets/desktop/icon-moon.svg" alt="moon" />;
		}
	};

	// Render City and State
	const [locationInfo, setLocationInfo] = useState({
		data: {
			location: {
				city: {
					name: "",
				},
				region: {
					name: "",
				},
			},
		},
	});
	// const [error, setError] = useState(null);

	const cityName = locationInfo.data.location.city.name;
	const stateName = locationInfo.data.location.region.name;

	const getLocationInfo = async function () {
		try {
			const response = await fetch(
				"https://api.ipbase.com/v2/info?apikey=fpz1xxBUpR6p2h2P8isLDtb9Cp80jqamRSYLvbxc&ip=1.1.1.1"
			);
			if (!response.ok) {
				throw new Error("Problem getting data");
			}
			const data = await response.json();
			setLocationInfo(data);
		} catch (err) {
			// setError(err.message);
		}
	};

	useEffect(() => {
		// getLocationInfo();
	}, []);

	console.log(locationInfo);
	console.log(cityName);
	console.log(stateName);

	return (
		<div>
			<div>
				<span className={styles.message}>{chooseSymbol()}</span>
				<span className={styles.message}>{chooseGreeting()}</span>
			</div>
			<div>
				<span className={styles.time}>{props.time}</span>
				<span className={styles.timezone}>{props.timezone}</span>
			</div>
			<div className={`${styles["location-info"]}`}>
				in {""}
				<span>{cityName}</span>, <span>{stateName}</span>
			</div>
		</div>
	);
}
