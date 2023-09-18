const HttpError = require("../models/http-error");
const Internship = require("../models/internship");

//GET Methods
//POST Methods
async function addInternship(req, res, next) {
  const {
    title,
    description,
    salary,
    address,
    startingDate,
    endingDate,
    employerId
  } = req.body;
  try {
    const internshipToAdd = new Internship({
        title,
        description,
        salary,
        address,
        startingDate,
        endingDate,
        employerId
    });
    await internshipToAdd.save();
    res
      .status(201)
      .json({ internship: internshipToAdd.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while creating internship", 500));
  }
}

//PATCH Methods
//DELETE Methods

module.exports = {
    addInternship: addInternship,
  };