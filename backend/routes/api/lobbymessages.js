const express = require('express');
const { LobbyMessage } = require('../../db/models');

const router = express.Router();

// GET messages by lobbyId
router.get('/:lobbyId', async (req, res) => {
    const { lobbyId } = req.params;
    const allMessages = await LobbyMessage.findAll({
        where: {
            lobbyId
        }
    });

    res.json({
        messages: allMessages
    });
});

router.get('/', async (req, res) => {
    const allMessages = await LobbyMessage.findAll();

    res.json({
        messages: allMessages
    });
});

module.exports = router;
