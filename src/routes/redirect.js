import express from "express";

import controller from "../controllers/url.js";

const router = express.Router({ caseSensitive: true, strict: true });

router.get("/:id", controller.redirect);

export default router;
