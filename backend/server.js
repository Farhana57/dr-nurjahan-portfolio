const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Appointment = require('./models/Appointment'); // অ্যাপয়েন্টমেন্ট মডেল
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.log('Database Connection Error:', err));
// Test Route
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send('<h2>ডাঃ নূরজাহান (মুক্তি) ব্যাকএন্ড সার্ভার সফলভাবে চলছে... 🚀</h2>');
});

// Appointment POST Route - নতুন বুকিং ডাটা সেভ করার জন্য
app.post('/api/appointments', async (req, res) => {
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

// Appointment GET Route - ডাটাবেজের সব বুকিং দেখার জন্য (নতুন যোগ করা হলো)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: appointments.length, 
      data: appointments 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});