import mongoose from "mongoose";
import Debug from "debug";

import "../models/index.js";

const debug = new Debug("server:database");

if (process.env.MONGO_DB_DEBUG === "true") {
	mongoose.set("debug", true);
}

mongoose.connection.on("connecting", () => {
	debug("Connecting to database...");
});

mongoose.connection.on("error", (error) => {
	debug("Could not connect to database.");
	debug(error);
	throw error;
});

mongoose.connection.on("fullsetup", () => {
	debug("Connected to all servers of the replica set.");
});

mongoose.connection.on("connected", () => {
	debug("Connected to database.");
});

mongoose.connection.on("disconnected", () => {
	debug("Connection to database is closed...");
});

mongoose.connection.on("reconnected", () => {
	debug("Reconnected successfully to database...");
});

mongoose.connection.on("close", () => {
	debug("Successfully closed connection with database...");
});

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
	} catch (error) {
		debug("Could not connect to database.");
		debug(error);
		throw error;
	}
};

const disconnect = async () => {
	try {
		await mongoose.connection.close(false);
	} catch (error) {
		debug("Could not disconnect the database connection.");
		debug(error);
		throw error;
	}
};

const state = () => mongoose.connection.readyState;

export default { connect, disconnect, state };
