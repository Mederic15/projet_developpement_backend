const express = require("express");

const controllerStudent = require("../controllers/student-controller");
const router = express.Router();

//Mettre les route selon la demande
router.post("/students", controllerStudent.addStudent);

module.exports = router;
