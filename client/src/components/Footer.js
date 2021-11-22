import React, { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import API from "../api/url";

import "./Footer.css";

const Footer = () => {
	const [stats, setStats] = useState(null);
	useEffect(() => {
		const fetchSiteStats = async () => {
			try {
				const response = await API.get("/stats");
				const { data } = response;
				if (data.status === "success") setStats(data.data);
			} catch (error) {}
		};
		fetchSiteStats();
	}, []);
	const statsView = () => {
		if (stats)
			return (
				<div>
					<b>Site stats | </b>
					<Label size="tiny" color="blue">
						Total shortened links
						<Label.Detail>{stats.count}</Label.Detail>
					</Label>
					<Label size="tiny" color="violet">
						Total redirects
						<Label.Detail>{stats.hits}</Label.Detail>
					</Label>
					<Label size="tiny" color="orange">
						Total trolls
						<Label.Detail>{stats.trolls}</Label.Detail>
					</Label>
				</div>
			);
	};
	return (
		<div className="footer">
			<p>Made with ❤️, entirely for fun.</p>
			{statsView()}
		</div>
	);
};

export default Footer;
