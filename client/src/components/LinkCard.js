import React from "react";
import { Link } from "react-router-dom";
import { Segment, Input } from "semantic-ui-react";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

import { BASE_URL } from "../constants";

import "./LinkCard.css";

const LinkCard = (props) => {
	const { url } = props;

	return (
		<Segment>
			<p>{url.url}</p>
			<Input
				className="url-field"
				fluid
				type="text"
				disabled
				value={`${BASE_URL}/${url.id}`}
				name="url"
				action={{
					color: "blue",
					icon: "copy",
					content: "Copy Link",
					onClick: () => {
						copy(`${BASE_URL}/${url.id}`);
						toast.success("URL copied to clipboard");
					},
				}}
			/>
			<p className="success-card-subtitle">
				{url.probability}% probability •<Link to={`/stats/${url.id}`}> view stats</Link>
			</p>
		</Segment>
	);
};

export default LinkCard;
