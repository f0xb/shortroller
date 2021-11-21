import mongoose from "mongoose";

const { Schema } = mongoose;

const URLSchema = new Schema(
	{
		url: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		probability: {
			type: Number,
			default: 50,
			min: 0,
			max: 100,
		},
		tags: {},
		stats: {
			hits: { type: Number, default: 0 },
			trolls: { type: Number, default: 0 },
		},
	},
	{ timestamps: true },
);

URLSchema.methods.toJSON = function toJSON() {
	const url = this.toObject();
	delete url._id;
	delete url.__v;
	return url;
};

const URL = mongoose.model("URL", URLSchema);

export default URL;
