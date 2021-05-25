const express = require("express");
const { userCtrl } = require("../controller/user.controller");

const router = express.Router();

router.route("").get(userCtrl.list).post(userCtrl.create);

router
	.route("/:userId")
	.get(userCtrl.read)
	.put(userCtrl.update)
	.delete(userCtrl.remove);
router.param("userId", userCtrl.userByID);

module.exports = router;
