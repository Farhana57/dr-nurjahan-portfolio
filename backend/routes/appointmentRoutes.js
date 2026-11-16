const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST: নতুন অ্যাপয়েন্টমেন্ট সেভ করার জন্য
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully!', 
      data: savedAppointment 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;