import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Grid, Input, Header } from "semantic-ui-react";
import toast from "react-hot-toast";
import isURL from "validator/lib/isURL";

import { shorten } from "../actions";

import "./Generate.css";
import SuccessCard from "./SuccessCard";
import { BASE_URL } from "../constants";

const Generate = () => {
	const dispatch = useDispatch();

	const [url, setUrl] = useState("");
	const [probability, setProbability] = useState("50");
	const [isValidUrl, setIsValidUrl] = useState(true);

	const state = useSelector((state) => state.url);

	useEffect(() => {
		if (state.error) toast.error(state.error);
	}, [state.error]);

	useEffect(() => {
		if (state.success) {
			setUrl("");
			toast.success("URL shortened! Now share it with friends. :)");
		}
	}, [state.success]);

	const handleSubmit = async () => {
		if (url.includes(BASE_URL)) return toast.error("Invalid domain name.");
		if (isURL(url)) {
			if (!url.startsWith("http") && !url.includes("://")) setUrl("https://" + url);
			setIsValidUrl(isURL(url));
			dispatch(shorten({ url, probability }));
		} else toast.error("Invalid URL");
	};

	const handleProbabilityChange = (e) => {
		const currentValue = e.target.value;
		if (currentValue.length === 0) return setProbability(0);
		const isValid = !isNaN(currentValue) && !isNaN(parseInt(currentValue));
		if (!isValid) return;
		const validValue = parseInt(currentValue);
		if (validValue >= 100) return setProbability(100);
		setProbability(parseInt(currentValue));
	};

	if (state.success === true) return <SuccessCard url={state.url} />;

	return (
		<Grid stretched>
			<Grid.Row centered verticalAlign="middle">
				<Header size="huge" textAlign="center" inverted>
					<span>Shorten a link, troll your friends!</span>
				</Header>
				<Header size="medium" textAlign="center" inverted>
					Each click of your generated link has a
					<input
						onClick={(e) => e.currentTarget.select()}
						className="probability"
						value={probability}
						onChange={handleProbabilityChange}
						maxLength="3"
						id="probability"
						type="text"
						size="4"
					/>
					% chance of trolling.
				</Header>
				<Grid.Row className="url-input">
					<Form name="form" onSubmit={handleSubmit}>
						<Input
							fluid
							error={!isValidUrl}
							autoCapitalize="none"
							type="text"
							value={url}
							name="url"
							onChange={(e, data) => setUrl(e.target.value)}
							label="http://"
							disabled={state.loading}
							placeholder="website to be shortened..."
							action={{
								color: "blue",
								icon: "chain",
								content: "Shorten",
								type: "submit",
							}}
						/>
					</Form>
				</Grid.Row>
			</Grid.Row>
		</Grid>
	);
};

export default Generate;
