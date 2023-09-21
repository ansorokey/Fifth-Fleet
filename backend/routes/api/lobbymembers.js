const express = require('express');
const { LobbyMember } = require('../../db/models');

const router = express.Router();

// GET members by lobbyId
router.get('/:lobbyId', async (req, res) => {
    const { lobbyId } = req.params;
    const allMembers = await LobbyMember.findAll({
        where: {
            lobbyId
        }
    });

    res.json({
        members: allMembers
    });
});

// get all lobby members
router.get('/', async (req, res) => {
    const allMembers = await LobbyMember.findAll();

    res.json({
        members: allMembers
    });
});

module.exports = router;
