const express = require('express');
const { Greeting } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { category } = req.query;
    const where = {};

    if (category) {
        where.category = category
    }

    const allGreetings = await Greeting.findAll({
        where
    });

    res.json({
        greetings: allGreetings
    });
});

module.exports = router;
