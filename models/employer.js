const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  managerFirstName: { type: String, required: true },
  managerLastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  phoneBooth: { type: String, required: true },
});

module.exports = mongoose.model("Employer", employerSchema);
