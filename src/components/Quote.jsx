import { useEffect, useState } from "react";
import styles from "./Quote.module.css";

export default function Quote() {
	const [quoteInfo, setQuoteInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const controller = new AbortController();
	const signal = controller.signal;

	// Fetch quote info with error handling
	const getQuoteInfo = async function () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("https://api.quotable.io/random", { signal });
			if (!response.ok) {
				throw new Error("Loading Failed");
			}
			const data = await response.json();
			setQuoteInfo(data);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getQuoteInfo();
		return () => {
			controller.abort();
		};
	}, []);

	const quoteContent = function () {
		if (quoteInfo) {
			return (
				<>
					<div className={`${styles["quote-text"]}`}>
						<p className={`${styles["quote"]}`}>"{quoteInfo.content}"</p>
						<p className={`${styles["quote-author"]}`}>{quoteInfo.author}</p>
					</div>
					<img
						className={`${styles["refresh-icon"]}`}
						onClick={getQuoteInfo}
						src="../../assets/desktop/icon-refresh.svg"
						alt="refresh icon"
					/>
				</>
			);
		}
		if (error) {
			return error.message;
		}
		if (isLoading) {
			return "Loading...";
		}
	};

	return <section className={`${styles["container"]}`}>{quoteContent()}</section>;
}
