import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

export default function Clock(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getLocationInfo = async function () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"https://api.ipbase.com/v2/info?apikey=fpz1xxBUpR6p2h2P8isLDtb9Cp80jqamRSYLvbxc&ip=1.1.1.1"
			);
			if (!response.ok) {
				throw new Error("Loading Failed");
			}
			const data = await response.json();
			setLocationInfo(data);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		// getLocationInfo();
	}, []);

	// Render Greeting Message
	const selectGreeting = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return "GOOD MORNING";
		} else if (props.hour >= 12 && props.hour < 18) {
			return "GOOD EVENING";
		} else {
			return "GOOD NIGHT";
		}
	};
	// Render Symbol
	const selectSymbol = () => {
		if (props.hour >= 5 && props.hour < 17) {
			return <img className={styles.symbol} src="/assets/desktop/icon-sun.svg" alt="sun" />;
		} else {
			return <img className={styles.symbol} src="/assets/desktop/icon-moon.svg" alt="moon" />;
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

	const cityName = locationInfo.data.location.city.name;
	const stateName = locationInfo.data.location.region.name;

	let locationContent = <div></div>;

	if (cityName !== "" && stateName !== "") {
		locationContent = `in ${((<span>{cityName}</span>), (<span>{stateName}</span>))}`;
	}
	if (error) {
		locationContent = { error };
	}
	if (isLoading) {
		locationContent = "Loading...";
	}

	return (
		<section className={props.isPanelOpen ? `${styles["container-active"]}` : styles.container}>
			<div className={`${styles[""]}`}>
				{selectSymbol()}
				<span className={styles.greeting}>{selectGreeting()}</span>
			</div>
			<div className={`${styles["container-time"]}`}>
				<span className={styles.time}>{props.time}</span>
				<span className={styles.timezoneAbrev}>{props.timezoneAbrev}</span>
			</div>
			{/* {Placeholder to prevent API requests} */}
			<div className={`${styles["location-info"]}`}>in Baltimore, Maryland</div>
			{/* <div className={`${styles["location-info"]}`}>{locationContent}</div> */}
		</section>
	);
}
