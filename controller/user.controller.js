const User = require("../models/user-model");

const create = async (req, res, next) => {
	const user = new User(req.body);
	try {
		await user.save();
		return res.status(200).json({
			message: "Successfully signed up!",
		});
	} catch (err) {
		next(err);
	}
};

const list = async (req, res, next) => {
	try {
		let users = await User.find();
		res.json(users);
	} catch (err) {
		next(err);
	}
};

const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user) {
			res.status(400).json({
				error: "User not found",
			});
		}
		req.profile = user;
		next();
	} catch (err) {
		return res.status("400").json({
			error: "Could not retrieve user",
		});
	}
};

const read = (req, res, next) => {
	req.profile.password = undefined;
	// console.log(req.profile);
	return res.json(req.profile);
};

const update = async (req, res, next) => {
	try {
		let user = req.profile;
		user = Object.assign(user, req.body);
		console.log(user);
		await user.save();
		console.log("\n After \n");
		console.log(user);
		user.password = undefined;
		res.json(user);
	} catch (err) {
		next(err);
	}
};

const remove = async (req, res, next) => {
	try {
		let user = req.profile;
		let deletedUser = await user.remove();
		deletedUser.password = undefined;
		res.json(deletedUser);
	} catch (err) {
		next(err);
	}
};

exports.userCtrl = { create, userByID, read, list, remove, update };
