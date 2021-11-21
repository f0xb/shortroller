import http from "http";
import Debug from "debug";

import database from "./database/database.js";
import app from "./app.js";

const debug = Debug("server:index");

const server = http.createServer(app);
const port = app.get("port");

async function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`HTTP server is up and running on ${bind}`);
}

async function onClose() {
	debug("Server is closed...");
}

async function onError(error) {
	debug(error);
	await database.disconnect();
	if (error.syscall !== "listen") throw error;
	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
	switch (error.code) {
		case "EACCES":
			debug(`${bind} requires elevated privileges.`);
			process.exit(1);
		case "EADDRINUSE":
			debug(`${bind} is already in use.`);
			process.exit(1);
		default:
			process.exit(1);
	}
}

server.on("error", onError);
server.on("listening", onListening);
server.on("close", onClose);

process.on("unhandledRejection", async (reason, promise) => {
	debug("Unhandled rejection at promise: ", promise, "reason: ", reason);
	await server.close();
	await database.disconnect();
	process.exit(1);
});

process.on("uncaughtException", async (error) => {
	debug("Uncaught Exception thrown. Error: ", error);
	await server.close();
	await database.disconnect();
	process.exit(1);
});

process.on("exit", (code) => debug(`process exiting with code: ${code}.`));

const bootstrap = async () => {
	debug(`Starting server v${process.env.npm_package_version}...`);
	debug(`Environment: ${process.env.NODE_ENV}...`);

	try {
		await database.connect();
	} catch (error) {
		debug(error);
		process.exit(1);
	}

	try {
		await server.listen(app.get("port"));
	} catch (error) {
		await database.disconnect();
		debug(error);
		process.exit(1);
	}
};

bootstrap();
