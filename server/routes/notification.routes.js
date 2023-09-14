const express = require('express');
const NotificationSubscription = require('../models/notificationSubscription');
const {pushNotification} = require('../config/webpush');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
    const subscription = req.body;
    console.log('Subscription received');
    console.log(subscription);
    const notificationSubscription = new NotificationSubscription(subscription);
    console.log(notificationSubscription);
    try {
        await notificationSubscription.save();
        await pushNotification(subscription, JSON.stringify({ title: 'Welcome', body: 'Thanks for subscribing!' }));
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
        // pushNotification(subscription, JSON.stringify({ title: 'Goodbye', body: 'Thanks for subscribing!' }));
    } catch (e) {
        res.status(500).json({
            message: 'An error occurred while deleting the subscription.',
        });
    }
});

module.exports = router;