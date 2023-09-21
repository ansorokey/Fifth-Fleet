const express = require('express');
const { GuildMessage } = require('../../db/models');

const router = express.Router();

// GET messages by guildId
router.get('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const allMessages = await GuildMessage.findAll({
        where: {
            guildId
        }
    });

    res.json({
        messages: allMessages
    });
});

// Get all guild messages across all guilds
router.get('/', async (req, res) => {
    const allMessages = await GuildMessage.findAll();

    res.json({
        messages: allMessages
    });
});

module.exports = router;
