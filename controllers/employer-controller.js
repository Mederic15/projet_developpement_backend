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

async function employerConnection(req, res, next) {
  const { email, password } = req.body;
  let employerExist
  try {
    employerExist = await Employer.findOne({ email: email, password: password });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while connecting employer", 500));
  }

  if (!employerExist || employerExist.password !== password) {
    return next(new HttpError("False information on connexion employer", 401));
  }

  res.status(201).json({
    message: "employer object",
    employer: employerExist.toObject({ getters: true }),
  });
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
  employerConnection: employerConnection
};
