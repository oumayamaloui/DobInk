const Appointment = require('../models/appointment.model');

exports.create = async (req, res) => {
  try {
    const appt = await Appointment.create(req.body);
    res.status(201).json(appt);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_req, res) => {
  try {
    const items = await Appointment.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
