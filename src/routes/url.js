import express from "express";
import { body, validationResult } from "express-validator";

import controller from "../controllers/url.js";

const router = express.Router({ caseSensitive: true, strict: true });

router.post(
	"/shorten",
	[
		body("url").notEmpty().withMessage("URL must be provided").isURL().withMessage("URL is invalid"),
		body("probability").optional().isInt({ min: 0, max: 100 }).withMessage("Probability must be between 0 and 100"),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ status: "failure", message: errors.array() });
			return next();
		},
	],
	controller.shorten,
);

router.get("/stats/:id", controller.stats);

export default router;
