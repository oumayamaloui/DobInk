const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/createContact', contactController.createContact);
router.post('/createReclamation', contactController.createReclamation);
router.get('/loadContact', contactController.getAllContact);
router.get('/loadReclamation', contactController.getAllReclamation);
router.put('/updateReclamation', contactController.updateReclamationStatus);
router.put('/updateContact', contactController.updateContactStatus);
module.exports = router;
