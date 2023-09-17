const express = require('express');
const { LobbyGreeting } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { category } = req.query;
    const where = {};

    if (category) {
        where.category = category
    }

    const allGreetings = await LobbyGreeting.findAll({
        where
    });

    res.json({
        greetings: allGreetings
    });
});

module.exports = router;
