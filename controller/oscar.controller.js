const Oscar = require("./../models/oscar-model");

const create = async (req, res, next) => {
	const oscar = new Oscar(req.body);
	try {
		await oscar.save();
		return res.status(200).json({
			message: "Successfully Saved ! ",
		});
	} catch (err) {
		next(err);
	}
};

const list = async (req, res, next) => {
	try {
		let oscars = await Oscar.find();
		res.json(oscars);
	} catch (err) {
		next(err);
	}
};

const oscarByID = async (req, res, next, id) => {
	try {
		let oscar = await Oscar.findById(id);
		if (!oscar) {
			res.status(400).json({
				error: "Oscar details not found",
			});
		}
		req.award = oscar;
		next();
	} catch (err) {
		return res.status("400").json({
			error: "Could not retrieve Oscar Details",
		});
	}
};

const read = (req, res, next) => {
	return res.json(req.award);
};

const update = async (req, res, next) => {
	try {
		let oscar = req.award;
		console.log(oscar);
		oscar = Object.assign(oscar, req.body);
		await oscar.save();
		console.log("\n After \n");
		console.log(oscar);

		res.json(oscar);
	} catch (err) {
		next(err);
	}
};

const remove = async (req, res, next) => {
	try {
		let oscar = req.award;
		let deletedOscar = await oscar.remove();
		res.json(deletedOscar);
	} catch (err) {
		next(err);
	}
};

exports.oscarCtrl = { create, oscarByID, read, list, remove, update };
