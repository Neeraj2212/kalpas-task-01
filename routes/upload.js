const express = require("express");
const multer = require("multer");
const csv = require("csv-parse");
const Oscar = require("../models/oscar-model");
const { authenticate } = require("./../authorize");

const router = express.Router();

var upload = multer();

/**
 *
 * @param {Buffer} fileBuffer Temprory file address of csv file
 * @returns
 */

const parse_csv = (fileBuffer) =>
	new Promise((resolve, reject) => {
		let result = [];
		csv(fileBuffer, {
			columns: true,
		})
			.on("data", (data) => result.push(data))
			.on("end", async () => {
				console.log("File parsed successfully ");
				resolve(result);
			})
			.on("close", () => console.log("closed"))
			.on("error", (err) => reject(err));
	});

/* POST csv file */

router.post(
	"/",
	authenticate,
	upload.single("csv-file"), // key in form-data should be csv-file and value = .csv file
	async (req, res, next) => {
		console.log(req.file);

		let entries = await parse_csv(req.file.buffer);

		/* Query to upload all csv data to mongodb */

		Oscar.insertMany(entries)
			.then((data) => {
				console.log(data);
				return res.json(data);
			})
			.catch((err) => console.log(err));
	}
);

module.exports = router;
