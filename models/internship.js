const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const internshipSchema = new Schema({
    title:{type: String, required: true},
    description: {type: String, required: true},
    salary: {type: String, required: true},
    address: {type: String, required: true},
    startingDate: {type: String, required: true},
    endingDate: {type: String, required: true},
    employerId:{type: mongoose.Types.ObjectId, required: true, ref:"Employer"}
});

module.exports = mongoose.model("Internship", internshipSchema);