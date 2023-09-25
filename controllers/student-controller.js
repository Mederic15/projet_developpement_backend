const HttpError = require("../models/http-error");
const Student = require("../models/student");

//GET Methods
//POST Methods
async function addStudent(req, res, next) {
  const { firstName, lastName, address, phoneNumber } = req.body;
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
//DELETE Methods

module.exports = {
  addStudent: addStudent,
};
