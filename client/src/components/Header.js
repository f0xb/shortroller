import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Header } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetGenerate } from "../actions";
import "./Header.css";

const HeaderMenu = () => {
	let location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (location.pathname === "/") setActiveItem("generate");
		else setActiveItem(location.pathname.split("/").pop());
	}, [location]);

	const [activeItem, setActiveItem] = useState(location || "generate");

	return (
		<Menu inverted borderless className="header-menu">
			<Menu.Item disabled>
				<Link to="/" onClick={() => dispatch(resetGenerate())}>
					<Header inverted size="huge">
						Shortroller
					</Header>
				</Link>
			</Menu.Item>

			<Menu.Menu position="right">
				<Menu.Item
					name="generate"
					to="/"
					as={Link}
					color="green"
					active={activeItem === "generate"}
					onClick={(e, { name }) => {
						setActiveItem(name);
						dispatch(resetGenerate());
					}}
				/>

				<Menu.Item
					name="stats"
					to="/stats"
					as={Link}
					color="green"
					active={activeItem === "stats"}
					onClick={(e, { name }) => setActiveItem(name)}
				/>

				<Menu.Item
					name="about"
					to="/about"
					as={Link}
					color="green"
					active={activeItem === "about"}
					onClick={(e, { name }) => setActiveItem(name)}
				/>
			</Menu.Menu>
		</Menu>
	);
};

export default HeaderMenu;
