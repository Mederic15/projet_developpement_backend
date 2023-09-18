const express = require("express");

const controllerEmployer = require("../controllers/employer-controller")
const router = express.Router();

//Mettre les route selon la demande
router.post("/employers", controllerEmployer.addEmployer);


module.exports = router;