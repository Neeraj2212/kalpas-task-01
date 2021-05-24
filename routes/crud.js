const express = require("express");
const router = express.Router();
const { oscarCtrl } = require("./../controller/oscar.controller");

router.get("/list", oscarCtrl.list);

router.post("/create", oscarCtrl.create);

router
	.route("/oscar/:id")
	.get(oscarCtrl.read)
	.put(oscarCtrl.update)
	.delete(oscarCtrl.remove);

router.param("id", oscarCtrl.oscarByID);
module.exports = router;
