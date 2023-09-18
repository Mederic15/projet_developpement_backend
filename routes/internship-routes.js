const express = require("express");

const controllerInternship = require("../controllers/internship-controller")
const router = express.Router();

//Mettre les route selon la demande
/*
router.get("/internships",controllerInternship.getInternships);

router.get("/internships/:internshipId",controllerInternship.getInternship);

router.get("/internships/:employerId",controllerInternship.getInternshipByEmployer);

router.post("/internships",controllerInternship.postInternships);

router.patch("/internships/:internshipId",controllerInternship.patchInternships);

router.delete("/internships/:internshipId",controllerInternship.deleteInternships);
*/

module.exports = router;