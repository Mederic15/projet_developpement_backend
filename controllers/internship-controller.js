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
        //Faire la verification de l'employeur
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
async function patchInternships(req, res, next) {
  const { 
    title, 
    description, 
    salary, 
    address, 
    startingDate, 
    endingDate 
  } = req.body;
  const internshipsId = req.params.internshipsId;
  let internships;

  try {
    internships = await Internship.findById(internshipsId);
    internships.title = title;
    internships.description = description;
    internships.salary = salary;
    internships.address = address;
    internships.startingDate = startingDate;
    internships.endingDate = endingDate;
    await internships.save();
    res.status(200).json({ internshipsId: internships.toObject({ getters: true }) });
  } catch {
    return next(
      new HttpError("patch internshipsId error", 500)
    );
  }
};

//DELETE Methods

module.exports = {
    addInternship: addInternship,
    patchInternships: patchInternships,
  };