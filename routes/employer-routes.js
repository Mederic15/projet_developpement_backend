const express = require("express");

const controllerEmployer = require("../controllers/employer-controller");
const router = express.Router();

//Mettre les route selon la demande
router.post("/employers", controllerEmployer.addEmployer);

router.patch("/employers", controllerEmployer.employerConnection);
//router.patch("/studentId", controllerStudent.patchStudent);
router.get('/employers/:employerId', controllerEmployer.getEmployerInfoById);

module.exports = router;
