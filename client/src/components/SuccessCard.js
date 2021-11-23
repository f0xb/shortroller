import React from "react";
import { Grid, Header } from "semantic-ui-react";
import "./SuccessCard.css";

import LinkCard from "./LinkCard";

const SuccessCard = (props) => {
	const { url } = props;

	return (
		<Grid stretched>
			<Grid.Row centered verticalAlign="middle">
				<Header size="huge" textAlign="center" inverted>
					<span>Link Generated Successfully!</span>
				</Header>
			</Grid.Row>
			<Grid.Row centered>
				<Grid.Column textAlign="center" className="success-subtitles">
					<p>Click the button below to copy your link to the clipboard.</p>
					<p>Happy sharing and trolling.</p>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column textAlign="center">
					<LinkCard url={url} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default SuccessCard;
