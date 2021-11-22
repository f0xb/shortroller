import React, { useState } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";

import "./About.css";

const about = [
	{
		title: "What is the Privacy Policy?",
		content:
			"The only personal information that is collected and stored is the IP, stored for less than 24 hours only to prevent spam. A cookie is set in the browser to indicate how many times the user has been trolled by links to limit minimize the number of trolls.",
	},
	{
		title: "Will the shortened links show the true URL's (destination) correct metadata when they are shared?",
		content:
			" Yes! The service detects if the requester of a link is a bot (e.g. Facebook, Twitter, Telegram, etc.) and provide the true website's metadata. Users will see where the link is supposed to redirect them to, but they will still have the possibility to get trolled.",
	},
	{
		title: "How does the service decide whether or not to troll?",
		content:
			"When a user shorten or generate a short URL, they specify a probability (50% by default), that probability is used to troll anyone that clicks the link. Exception is if the user has been trolled by a link before, a cookie is stored in the browser to guard them from getting trolled.",
	},
];

const About = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<Segment inverted>
			<Accordion inverted>
				{about.map((item, index) => (
					<div key={index}>
						<Accordion.Title
							active={activeIndex === index}
							index={0}
							onClick={() => setActiveIndex(index === activeIndex ? null : index)}
						>
							<Icon name="dropdown" />
							{item.title}
						</Accordion.Title>
						<Accordion.Content active={activeIndex === index}>
							<p>{item.content}</p>
						</Accordion.Content>
					</div>
				))}
			</Accordion>
		</Segment>
	);
};

export default About;
