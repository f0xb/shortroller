import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import Cookies from "cookies";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import redirectRouter from "./routes/redirect.js";
import urlRouter from "./routes/url.js";
import statsRouter from "./routes/stats.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3001;

const app = express();
app.set("port", port);
app.set("x-powered-by", false);
app.set("etag", false);
app.set("case sensitive routing", false);
app.set("strict routing", true);

app.use(cors());
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				...helmet.contentSecurityPolicy.getDefaultDirectives(),
				"script-src": ["'self'", "'unsafe-inline'"],
			},
		},
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(Cookies.express([process.env.COOKIE_SECRET]));

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}

// set up routes and static files. order-sensitive.
app.use("/api/url", urlRouter);
app.use("/api/stats", statsRouter);
app.use(redirectRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
	});
}

export default app;
