const HttpError = require("../models/http-error");
const Employer = require("../models/employer");

//GET Methods
//POST Methods
async function addEmployer(req, res, next) {
  const {
    companyName,
    address,
    managerFirstName,
    managerLastName,
    phoneNumber,
    phoneBooth,
  } = req.body;
  try {
    const employerToAdd = new Employer({
      companyName,
      address,
      managerFirstName,
      managerLastName,
      phoneNumber,
      phoneBooth,
    });
    await employerToAdd.save();
    res
      .status(201)
      .json({ employer: employerToAdd.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while creating employer", 500));
  }
}
//PATCH Methods
//DELETE Methods

module.exports = {
  addEmployer: addEmployer,
};
