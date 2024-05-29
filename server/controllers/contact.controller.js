const Contact = require('../models/contact.model');
const Reclamation = require('../models/reclamation.model');

exports.createContact = async (req, res) => {
  try {
    const {name, email, phone, description, status} = req.body;
    const contact = new Contact({name, email, phone, description, status});
    await contact.save();
    res.status(201).json({message: 'Contact created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
exports.createReclamation = async (req, res) => {
  try {
    const {name, email, phone, description, method, status, product} = req.body;
    const reclamation = new Reclamation({name, email, phone, description, method, status, product});
    await reclamation.save();
    res.status(201).json({message: 'Reclamation created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getAllReclamation = async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.updateReclamationStatus = async (req, res) => {
  try {
    const {id, newStatus} = req.body;
    const reclamation = await Reclamation.findById(id);
    if (!reclamation) {
      return res.status(404).json({message: 'Reclamation not found'});
    }
    reclamation.status = newStatus;
    await reclamation.save();
    res.status(200).json({message: 'Reclamation status updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};


exports.updateContactStatus = async (req, res) => {
  try {
    const {id, newStatus} = req.body;
    const reclamation = await Contact.findById(id);
    if (!reclamation) {
      return res.status(404).json({message: 'Reclamation not found'});
    }
    reclamation.status = newStatus;
    await reclamation.save();
    res.status(200).json({message: 'Reclamation status updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};



