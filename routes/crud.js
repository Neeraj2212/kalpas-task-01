const express = require("express");
const router = express.Router();
const { oscarCtrl } = require("./../controller/oscar.controller");
const { authenticate } = require("./../authorize");

/** GET list of all documents */

router.get("/list", authenticate, oscarCtrl.list);

/** Data Needed name,year,nominations,rating,release */

router.post("/create", authenticate, oscarCtrl.create); // To create document

router
	.route("/oscar/:id")
	.get(authenticate, oscarCtrl.read) // To read details of document with given id
	.put(authenticate, oscarCtrl.update) // To update details of document with given id
	.delete(authenticate, oscarCtrl.remove); // To delete details of document with given id

router.param("id", oscarCtrl.oscarByID);
module.exports = router;
