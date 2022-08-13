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
	const chooseGreeting = () => {
		if (props.hour >= 5 && props.hour < 12) {
			return <span className={styles.greeting}>GOOD MORNING</span>;
		} else if (props.hour >= 12 && props.hour < 18) {
			return <span className={styles.greeting}>GOOD EVENING</span>;
		} else {
			return <span className={styles.greeting}>GOOD NIGHT</span>;
		}
	};
	// Render Symbol
	const chooseSymbol = () => {
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
		locationContent = (
			<div className={`${styles["location-info"]}`}>
				in {""}
				<span>{cityName}</span>, <span>{stateName}</span>
			</div>
		);
	}
	if (error) {
		locationContent = <div className={`${styles["location-info"]}`}>{error}</div>;
	}
	if (isLoading) {
		locationContent = <div className={`${styles["location-info"]}`}>Loading...</div>;
	}

	// console.log(locationInfo);
	// console.log(cityName);
	// console.log(stateName);

	return (
		<div className={`${styles["container-main"]}`}>
			<div>
				{chooseSymbol()}
				{chooseGreeting()}
			</div>
			<div className={`${styles["container-time"]}`}>
				<span className={styles.time}>{props.time}</span>
				<span className={styles.timezone}>{props.timezone}</span>
			</div>
			{locationContent}
		</div>
	);
}
