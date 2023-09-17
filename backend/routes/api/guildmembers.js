const express = require('express');
const { GuildMember } = require('../../db/models');

const router = express.Router();

// GET members by guildId
router.get('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const allMembers = await GuildMember.findAll({
        where: {
            guildId
        }
    });

    res.json({
        members: allMembers
    });
});

// get all guild members across all guilds
router.get('/', async (req, res) => {
    const allMembers = await GuildMember.findAll();

    res.json({
        members: allMembers
    });
});

module.exports = router;
