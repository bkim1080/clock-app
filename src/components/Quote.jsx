import { useEffect, useState } from "react";
import styles from "./Quote.module.css";

export default function Quote() {
	const [quoteInfo, setQuoteInfo] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getQuote = async function () {
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
		getQuote();
	}, []);

	let quoteContent = null;
	if (quoteInfo) {
		quoteContent = (
			<>
				<p>{quoteInfo.content}</p>
				<p>{quoteInfo.author}</p>
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
