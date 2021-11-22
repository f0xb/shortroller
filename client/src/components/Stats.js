import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Form, Grid, Input, Header, Segment, Loader, Button } from "semantic-ui-react";
import toast from "react-hot-toast";

import { BASE_URL } from "../constants";

import API from "../api/url";

import "./Generate.css";

const Stats = () => {
	const { id } = useParams();
	const history = useHistory();
	const [input, setInput] = useState("");
	const [stats, setStats] = useState(null);
	const [state, setState] = useState("idle");

	const fetchStats = async (urlId) => {
		setState("loading");
		try {
			const response = await API.get(`/url/stats/${urlId}`);
			setStats(response.data.data);
			setState("stats");
		} catch (error) {
			setState("error");
		}
	};

	useEffect(() => {
		if (id) fetchStats(id);
	}, [id]);

	const handleSubmit = () => {
		const inputId = input.includes(BASE_URL) ? input.split("/").pop() : input;
		if (inputId && inputId.match(/^[A-Za-z0-9]+$/i) && inputId.length === 10) history.push(`/stats/${inputId}`);
		else toast.error("Please enter a valid URL or ID to get its stats");
	};

	const viewInput = () => {
		return (
			<Grid stretched>
				<Grid.Row centered verticalAlign="middle">
					<Header size="huge" textAlign="center" inverted>
						<span>Shortened Link Stats!</span>
					</Header>
					<Header size="medium" textAlign="center" inverted>
						See statistics about your generated shortened links.
					</Header>
					<Grid.Row>
						<div className="url-input">
							<Form name="form" onSubmit={handleSubmit}>
								<Input
									fluid
									autoCapitalize="none"
									type="text"
									value={input}
									name="id"
									onChange={(e) => setInput(e.target.value)}
									label={`https://${BASE_URL}/`}
									placeholder="shortened URL or ID..."
									action={{
										color: "blue",
										icon: "send",
										content: "View Stats",
										type: "submit",
									}}
								/>
							</Form>
						</div>
					</Grid.Row>
				</Grid.Row>
			</Grid>
		);
	};

	const viewLoading = () => {
		return (
			<Grid stretched>
				<Grid.Row centered verticalAlign="middle">
					<Loader active inverted size="big" inline="centered">
						Loading...
					</Loader>
				</Grid.Row>
			</Grid>
		);
	};

	const viewError = () => {
		return (
			<Grid stretched>
				<Grid.Row centered verticalAlign="middle">
					<Header size="huge" textAlign="center" inverted>
						<span>An Error Occurred.</span>
					</Header>
					<Header size="medium" textAlign="center" inverted>
						Invalid URL supplied.
					</Header>
					<Button content="Primary" primary>
						Try Again
					</Button>
				</Grid.Row>
			</Grid>
		);
	};

	const viewStats = () => {
		console.log("stats===>", stats);
		return (
			<Grid stretched>
				<Grid.Row centered verticalAlign="middle">
					<Header size="huge" textAlign="center" inverted>
						<span>STATS.</span>
					</Header>
				</Grid.Row>
			</Grid>
		);
	};

	switch (state) {
		case "error":
			return viewError();
		case "loading":
			return viewLoading();
		case "stats":
			return viewStats();
		default:
			return viewInput();
	}
};

export default Stats;
