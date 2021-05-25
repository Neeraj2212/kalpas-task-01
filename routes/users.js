const express = require("express");
const { userCtrl } = require("../controller/user.controller");
const { authenticate } = require("./../authorize");

const router = express.Router();

router
	.route("")
	.get(authenticate, userCtrl.list) // To get list of all Registered users in database
	.post(userCtrl.create); // To create a new user

router
	.route("/:userId")
	.get(authenticate, userCtrl.read) // To GET details of user with id = userId
	.put(authenticate, userCtrl.update) // To UPDATE details of user with id = userId
	.delete(authenticate, userCtrl.remove); // To DELETE details of user with id = userId
router.param("userId", userCtrl.userByID);

module.exports = router;
