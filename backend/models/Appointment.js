const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: String },
  phone: { type: String, required: true },
  chamber: { type: String, required: true },
  date: { type: String, required: true },
  serialNumber: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);