const express = require("express");

const controllerEmployer = require("../controllers/employer-controller");
const router = express.Router();

//Mettre les route selon la demande
router.post("/employers", controllerEmployer.addEmployer);

router.post("/employers", controllerEmployer.employerConnection);
//router.patch("/studentId", controllerStudent.patchStudent);

module.exports = router;
