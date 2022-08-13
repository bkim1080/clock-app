import { useEffect, useState } from "react";
import styles from "./Quote.module.css";

export default function Quote() {
	const [quote, setQuote] = useState({ datetime: "" });
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
			setQuote(data);
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getQuote();
	}, []);

	let quoteContent = null;
	if (quote) {
		quoteContent = quote.content;
	}
	if (error) {
		quoteContent = error.message;
	}
	if (isLoading) {
		quoteContent = "Loading...";
	}

	console.log(quote);

	return <div>{quoteContent}</div>;
}
