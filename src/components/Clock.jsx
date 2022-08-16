import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

export default function Clock(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isNotMobile, setIsNotMobile] = useState(window.innerWidth <= 768);
	const updateGreeting = () => {
		setIsNotMobile(window.innerWidth <= 768);
	};

	useEffect(() => {
		window.addEventListener("resize", updateGreeting);
		return () => {
			window.removeEventListener("resize", updateGreeting);
		};
	});

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
	const selectGreetingMobile = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return "good morning";
		} else if (props.hour >= 12 && props.hour < 18) {
			return "good evening";
		} else {
			return "good night";
		}
	};

	const selectGreeting = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return "good morning, it's currently";
		} else if (props.hour >= 12 && props.hour < 18) {
			return "good evening, it's currently";
		} else {
			return "good night, it's currently";
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

	const locationContent = function () {
		if (cityName !== "" && stateName !== "") {
			return `in ${((<span>{cityName}</span>), (<span>{stateName}</span>))}`;
		}
		if (error) {
			return error;
		}
		if (isLoading) {
			return "Loading...";
		}
	};

	return (
		<section className={props.isPanelOpen ? `${styles["container-active"]}` : styles.container}>
			<div className={`${styles[""]}`}>
				{selectSymbol()}
				<span className={styles.greeting}>{isNotMobile ? selectGreetingMobile() : selectGreeting()}</span>
			</div>
			<div className={`${styles["container-time"]}`}>
				<span className={styles.time}>{props.time}</span>
				<span className={styles.timezoneAbrev}>{props.timezoneAbrev}</span>
			</div>
			{/* {Placeholder to prevent API requests} */}
			<div className={`${styles["location-info"]}`}>in Baltimore, Maryland</div>
			{/* <div className={`${styles["location-info"]}`}>{locationContent()}</div> */}
		</section>
	);
}
