const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const internshipSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  address: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  employerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Employer",
  },
  students: { type: [], required: false },
});

module.exports = mongoose.model("Internship", internshipSchema);
