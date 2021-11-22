import URL from "../models/url.js";
import catchAsync from "../middleware/catchAsyncErrors.js";

const stats = catchAsync(async (req, res) => {
	const results = await URL.aggregate([
		{
			$group: {
				_id: null,
				hits: { $sum: "$stats.hits" },
				trolls: { $sum: "$stats.trolls" },
				count: { $sum: 1 },
			},
		},
	]);

	if (results[0]) return res.status(200).json({ status: "success", data: results[0] });
	return res.status(500).json({ status: "failure" });
});

export default {
	stats,
};
