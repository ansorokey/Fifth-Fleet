const express = require('express');
const { Guild, User } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const allGuilds = await Guild.findAll({
        include: {
            model: User,
            as: 'Host'
        }
    });

    res.json({
        guilds: allGuilds
    });
});

module.exports = router;
