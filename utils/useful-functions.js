const Employer = require("../models/employer");
const Internship = require("../models/internship");
let ObjectId = require("mongoose").Types.ObjectId;

async function internshipExists(internshipId) {
  let exists = false;
  if (ObjectId.isValid(internshipId)) {
    exists = await Internship.exists({ _id: internshipId });
  }
  return exists;
}

async function employerExists(employerId) {
  let exists = false;
  if (ObjectId.isValid(employerId)) {
    exists = await Employer.exists({ _id: employerId });
  }
  return exists;
}

module.exports = {
  internshipExists: internshipExists,
  employerExists: employerExists,
};
