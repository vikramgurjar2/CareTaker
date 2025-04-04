const express = require("express");
const { getDoctors, addDoctors } = require("../controllers/doctorController");
const router = express.Router();

router.route("/doctor").get(getDoctors);
router.route("/doctor").post(addDoctors);

module.exports = router;
