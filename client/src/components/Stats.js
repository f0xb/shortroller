import React, { useState } from "react";
import { Form, Grid, Input, Header, Segment, Dimmer, Loader, Button, Icon } from "semantic-ui-react";

import { BASE_URL } from "../constants";

import API from "../api/url";

import "./Generate.css";

const Stats = () => {
	const [id, setId] = useState("");
	const [stats, setStats] = useState(null);
	const [state, setState] = useState("idle");

	const handleSubmit = async () => {
		setState("loading");
		try {
			const response = await API.get(`/url/stats/${id}`);
			setStats(response.data.data);
			setState("stats");
		} catch (error) {
			setState("error");
		}
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
							<Form name="form" onSubmit={() => handleSubmit()}>
								<Input
									fluid
									autoCapitalize="none"
									type="text"
									value={id}
									name="id"
									onChange={(e) => setId(e.target.value)}
									label={`${BASE_URL}/`}
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

	return viewStats();
};

export default Stats;
