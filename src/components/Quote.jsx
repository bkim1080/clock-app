import { useEffect, useState } from "react";
import styles from "./Quote.module.css";

export default function Quote() {
	const [quoteInfo, setQuoteInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getQuoteInfo = async function () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("https://api.quotable.io/random");
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
	}, []);

	let quoteContent = null;
	if (quoteInfo) {
		quoteContent = (
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
		quoteContent = error.message;
	}
	if (isLoading) {
		quoteContent = "Loading...";
	}

	console.log(quoteInfo);
	console.log(quoteInfo.content);
	console.log(quoteInfo.author);

	return <div className={`${styles["container-main"]}`}>{quoteContent}</div>;
}
