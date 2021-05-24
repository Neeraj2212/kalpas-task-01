const express = require("express");
const multer = require("multer");
const csv = require("csv-parse");
const fs = require("fs");
const { promisify } = require("util");

const router = express.Router();
const unlinkAsync = promisify(fs.unlink);

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

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

router.post("/upload", upload.single("csv-file"), (req, res, next) => {
	console.log(req.body);
	console.log(req.file);

	fs.createReadStream(req.file.path)
		.pipe(csv({ delimiter: ",", columns: true }))
		.on("data", (row) => {
			// console.log(row);
			console.log(Object.keys(row));
		})
		.on("end", async () => {
			await unlinkAsync(req.file.path);
			console.log("File parsed successfully ");
		});
	res.json({ message: "Parsed Successfully" });
});

module.exports = router;
