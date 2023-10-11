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
    email,
    password,
  } = req.body;
  try {
    const employerToAdd = new Employer({
      companyName,
      address,
      managerFirstName,
      managerLastName,
      phoneNumber,
      phoneBooth,
      email,
      password,
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

/*
//PATCH Methods
async function patchEmployer(req, res, next) {
  const { companyName, address, managerFirstName, managerLastName, phoneNumber, phoneBooth } =
    req.body;
  const employerId = req.params.employerId;
  let employer;
  try {
    employer = await Employer.findById(employerId);
    employer.companyName = companyName;
    employer.address = address;
    employer.managerFirstName = managerFirstName;
    employer.managerLastName = managerLastName;
    employer.phoneNumber = phoneNumber;
    employer.phoneBooth = phoneBooth;
    await employer.save();
    res
      .status(200)
      .json({ employerId: employer.toObject({ getters: true }) });
  } catch {
    return next(
      new HttpError("Error while trying to update the employer", 500)
    );
  } 
}*/
//DELETE Methods

module.exports = {
  addEmployer: addEmployer,
  //patchEmployer: patchEmployer,
};
