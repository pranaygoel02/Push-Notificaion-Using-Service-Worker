const express = require('express');
const NotificationSubscription = require('../models/notificationSubscription');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
    const subscription = req.body;
    const notificationSubscription = new NotificationSubscription(subscription);
    try {
        await notificationSubscription.save();
        res.status(201).json({
            message: 'Subscription saved successfully.',
        });
    } catch (e) {
        res.status(500).json({
            message: 'An error occurred while saving the subscription.',
        });
    }
});

router.delete('/unsubscribe', async (req, res) => {
    const subscription = req.body;
    try {
        await NotificationSubscription.findOneAndDelete(subscription);
        res.status(200).json({
            message: 'Subscription deleted successfully.',
        });
    } catch (e) {
        res.status(500).json({
            message: 'An error occurred while deleting the subscription.',
        });
    }
});

module.exports = router;