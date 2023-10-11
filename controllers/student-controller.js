const HttpError = require("../models/http-error");
const Student = require("../models/student");

//GET Methods
//POST Methods
async function addStudent(req, res, next) {
  const { firstName, lastName, address, phoneNumber, email, password } = req.body;
  try {
    const studentToAdd = new Student({
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
    });
    await studentToAdd.save();
    res.status(201).json({ student: studentToAdd.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Error while creating student", 500));
  }
}
//PATCH Methods
/*
async function patchStudent(req, res, next) {
  const { firstName, lastName, adresse, phoneNumber } =
    req.body;
  const studentId = req.params.studentId;
  let student;
  try {
    student = await Student.findById(studentId);
    student.firstName = firstName;
    student.lastName = lastName;
    student.adresse = adresse;
    student.phoneNumber = phoneNumber;
    await student.save();
    res
      .status(200)
      .json({ studentId: student.toObject({ getters: true }) });
  } catch {
    return next(
      new HttpError("Error while trying to update the student", 500)
    );
  } 
} */
//DELETE Methods

module.exports = {
  addStudent: addStudent,
  //patchStudent: patchStudent,
};
