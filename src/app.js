import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import redirectRouter from "./routes/redirect.js";
import urlRouter from "./routes/url.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3013;

const app = express();
app.set("port", port);
app.set("x-powered-by", false);
app.set("etag", false);
app.set("case sensitive routing", false);
app.set("strict routing", true);

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use((req, res, next) => {
	if (req.is("application/json") || !req.get("Content-Type")) return next();
	return res.status(406).json({ status: "failure", message: "invalid request type" });
});

app.use(
	express.json({
		limit: "2kb",
		verify(req, res, buf, _encoding) {
			JSON.parse(buf);
		},
	}),
);

app.use(redirectRouter);
app.use("/api/url", urlRouter);

app.all("*", (req, res) => {
	return res.status(404).json({ status: "failure", message: "route not found" });
});

app.use(async (err, req, res, _next) => {
	return res.status(500).json({ status: "failure", message: "internal error" });
});

export default app;
