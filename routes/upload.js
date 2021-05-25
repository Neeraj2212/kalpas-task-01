const express = require("express");
const multer = require("multer");
const csv = require("csv-parse");
const fs = require("fs");
const { promisify } = require("util");
const Oscar = require("../models/oscar-model");
const { authenticate } = require("./../authorize");

const router = express.Router();
const unlinkAsync = promisify(fs.unlink);

// Temprory storage for csv file

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		let filename = file.originalname.split(".");
		cb(null, filename[0] + `${Date.now()}.` + filename[1]);
	},
});

var upload = multer({ storage: storage });

/**
 *
 * @param {String} filePath Temprory file address of csv file
 * @returns
 */

const parse_csv = (filePath) =>
	new Promise((resolve, reject) => {
		let entries = [];
		fs.createReadStream(filePath)
			.pipe(csv({ autoParse: true, columns: true }))
			.on("data", (row) => {
				entries.push(row);
			})
			.on("end", async () => {
				await unlinkAsync(filePath);
				console.log("File parsed successfully ");
				resolve(entries);
			})
			.on("error", (err) => reject(err))
			.on("close", () => console.log("closed"));
	});

/* POST csv file */

router.post(
	"/",
	authenticate,
	upload.single("csv-file"), // key should be csv-file and value = .csv file
	async (req, res, next) => {
		console.log(req.file);

		let entries = await parse_csv(req.file.path);

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
