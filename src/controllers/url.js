import ogs from "open-graph-scraper";
import isbot from "isbot";

import nanoid from "../lib/nanoid.js";
import URL from "../models/url.js";
import catchAsync from "../middleware/catchAsyncErrors.js";
import ogtagstemplate from "../lib/ogtagstemplate.js";
import randomLink from "../lib/randomLink.js";

const MAX_TROLLS_PER_LINK = 3;

const shorten = catchAsync(async (req, res) => {
	let id = nanoid();
	// eslint-disable-next-line security/detect-non-literal-fs-filename, no-await-in-loop
	while (await URL.exists({ id })) id = nanoid();
	const { url, probability } = req.body;
	const tags = (await ogs({ url })).result;
	const dto = { url, probability, id, tags };
	const shortenedURL = await URL.create(dto);
	return res.status(201).json({ status: "success", data: shortenedURL });
});

const stats = catchAsync(async (req, res) => {
	const { id } = req.params;
	const url = await URL.findOne({ id });
	if (url) return res.status(200).json({ status: "success", data: url });
	return res.status(404).json({ status: "failure", message: "URL is not found" });
});

const redirect = catchAsync(async (req, res) => {
	const { id } = req.params;
	const bot = isbot(req.get("user-agent"));
	const url = await URL.findOne({ id });

	if (!url) return res.status(404).redirect("/notfound");
	if (bot) return res.send(ogtagstemplate(url.tags));

	const { cookies } = req;
	const reachedMaxTrolls = cookies && parseInt(cookies.trolled, 10) <= MAX_TROLLS_PER_LINK;
	const troll = Math.floor(Math.random() * 101) <= url.probability;

	await URL.findOneAndUpdate(
		{ id },
		{ $inc: { "stats.hits": 1, ...(() => (troll ? { "stats.trolls": 1 } : null))() } },
	);

	if (reachedMaxTrolls || !troll) return res.redirect(url.url);
	const trollsCount = cookies.trolled ? cookies.trolled + 1 : 1;
	res.cookie("trolled", trollsCount, { maxAge: 30 * 24 * 60 * 60 * 1000, path: `/${id}` });
	return res.redirect(randomLink());
});

export default {
	shorten,
	redirect,
	stats,
};
