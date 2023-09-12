// All other routes not for cookies will be defined here
const router = require('express').Router();

// Test Route
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
