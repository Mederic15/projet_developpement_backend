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
    //Faire la verification de l'employeur
    employerId,
  } = req.body;
  try {
    const internshipToAdd = new Internship({
      title,
      description,
      salary,
      address,
      startingDate,
      endingDate,
      //Faire la verification de l'employeur
      employerId,
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
async function patchInternship(req, res, next) {
  const { 
    title, 
    description, 
    salary, 
    address, 
    startingDate, 
    endingDate
  } = req.body;
  const internshipId = req.params.internshipId;
  let internship;

  try {
    internship = await Internship.findById(internshipId);
    internship.title = title;
    internship.description = description;
    internship.salary = salary;
    internship.address = address;
    internship.startingDate = startingDate;
    internship.endingDate = endingDate;
    await internship.save();
    res.status(200).json({ internshipId: internship.toObject({ getters: true }) });
  } catch {
    return next(
      new HttpError("Error while trying to update the internship", 500)
    );
  }
}

//DELETE Methods

module.exports = {
    addInternship: addInternship,
    patchInternship: patchInternship,
  };