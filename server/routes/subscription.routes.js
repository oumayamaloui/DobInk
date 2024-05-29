const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');

router.post('/subscribe', subscriptionController.handleSubscription);
router.get('/status', subscriptionController.getSubStatus);
router.get('/load', subscriptionController.getAllSubscriptions);

module.exports = router;
