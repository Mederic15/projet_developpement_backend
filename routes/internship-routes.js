const express = require("express");

const controllerInternship = require("../controllers/internship-controller");
const router = express.Router();

//Mettre les route selon la demande
/*
 */

router.get("/", controllerInternship.getInternships);

router.get("/:employerId", controllerInternship.getInternshipsByEmployer);

router.post("/", controllerInternship.addInternship);

router.patch("/:internshipId/:studentId", controllerInternship.addStudentToInternship);

router.patch("/:internshipId", controllerInternship.patchInternship);

router.delete("/:internshipId", controllerInternship.deleteInternship);

module.exports = router;
