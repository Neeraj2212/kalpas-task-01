const mongoose = require("mongoose");

/**
 * List of Oscars
 */

const OscarList = new mongoose.Schema({
	name: { type: String, trim: true },
	release: String,
	nomination: Number,
	year: {
		type: Number,
		min: 1800,
	},
	rating: Number,
});

const Oscar = mongoose.model("Oscar", OscarList);
module.exports = Oscar;
