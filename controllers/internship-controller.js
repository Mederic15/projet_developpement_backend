const HttpError = require("../models/http-error");
const Internship = require("../models/internship");
const Student = require("../models/student");
const { internshipExists } = require("../utils/useful-functions");

//GET Methods
async function getInternships(req, res, next) {
  let internships = [];
  try {
    internships = await Internship.find({});
    res.json({
      internships: internships.map((internship) => {
        return internship.toObject({ getters: true });
      }),
    });
  } catch (err) {
    console.log(err);
    new HttpError("Error while trying to fetch internships", 500);
  }
}
async function getInternshipsByEmployer(req, res, next) {
  const employerId = req.params.employerId;
  try {
    const existsEmployer = await employerExists(employerId);
    if (!existsEmployer) {
      next(new HttpError("This employer does not exist", 404));
    }
    let internships = [];
    internships = await Internship.find({ employerId: employerId });
    res.json({
      internships: internships.map((internship) => {
        return internship.toObject({ getters: true });
      }),
    });
  } catch (err) {
    console.log(err);
    new HttpError("Error while trying check employer's existence", 500);
  }
}

//POST Methods
async function addInternship(req, res, next) {
  const {
    title,
    description,
    salary,
    address,
    startingDate,
    endingDate,
    managerName,
    managerEmail,
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
      managerName,
      managerEmail,
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

async function addStudentToInternship(req, res, next) {
  const { studentId, internshipId } = req.params;
  var currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    (currentdate.getHours() - 5) +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  let internship;

  try {
    internship = await Internship.findById(internshipId);

    try {
      let student;
      try {
        student = await Student.findById(studentId);
      } catch (err) {
        console.log(err);
        return next(
          new HttpError("Error while trying to retrieve student", 500)
        );
      }

      internship.students.push({
        student: student,
        applicationDate: datetime,
      });
      internship.save();
    } catch (err) {
      console.log(err);
      return next(
        new HttpError("Error while trying to add student to internship", 500)
      );
    }

    res.status(200).json({
      message:
        "student " +
        studentId +
        " has successfully applied to " +
        internshipId +
        " internship",
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to retrive internship", 500));
  }
}

//PATCH Methods
async function patchInternship(req, res, next) {
  const { title, description, salary, address, startingDate, endingDate } =
    req.body;
  const internshipsId = req.params.internshipId;
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
    res
      .status(200)
      .json({ internshipsId: internships.toObject({ getters: true }) });
  } catch {
    return next(
      new HttpError("Error while trying to update the internship", 500)
    );
  }
}

//DELETE Methods
async function deleteInternship(req, res, next) {
  const internshipId = req.params.internshipId;
  try {
    const exists = await internshipExists(internshipId);
    if (!exists) {
      next(new HttpError("This internship does not exist", 404));
    }
    await Internship.deleteOne({ _id: internshipId });
    res.status(200).json({
      message: "Intership was successfully deleted and removed",
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while trying to delete internship", 500));
  }
}

module.exports = {
  getInternships: getInternships,
  getInternshipsByEmployer: getInternshipsByEmployer,
  addInternship: addInternship,
  patchInternship: patchInternship,
  deleteInternship: deleteInternship,
  addStudentToInternship: addStudentToInternship,
};
