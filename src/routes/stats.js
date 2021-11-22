import express from "express";

import controller from "../controllers/stats.js";

const router = express.Router({ caseSensitive: true, strict: true });

router.get("/", controller.stats);

export default router;
