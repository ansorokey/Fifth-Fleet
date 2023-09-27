const express = require('express');
const { Monster } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const allMonsters = await Monster.findAll({
        attributes: ['id', 'name']
    });

    res.json({
        monsters: allMonsters
    });
});

module.exports = router;
