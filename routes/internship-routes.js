const express = require("express");

const controllerInternship = require("../controllers/internship-controller")
const router = express.Router();

//Mettre les route selon la demande
/*
router.get("/",controllerInternship.getInternships);

router.get("/:internshipId",controllerInternship.getInternship);

router.get("/:employerId",controllerInternship.getInternshipByEmployer);

router.patch("/:internshipId",controllerInternship.patchInternships);

router.delete("/:internshipId",controllerInternship.deleteInternships);
*/
router.post("/", controllerInternship.addInternship);

module.exports = router;