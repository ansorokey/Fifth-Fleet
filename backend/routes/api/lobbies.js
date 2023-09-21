const express = require('express');
const { Lobby, User, QuestType, Greeting, Monster, LobbyMember } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// get all lobbies
router.get('/', async (_req, res) => {
    const allLobbies = await Lobby.findAll({
        include: [
            {
                model: User,
                as: 'Host'
            },
            {
                model: QuestType
            },
            {
                model: Greeting
            },
            {
                model: Monster
            },
            {
                model: User,
                as: 'Members',
                through: {
                    attributes: []
                }
            }
        ]
    });

    res.json({
        lobbies: allLobbies
    })
});

// create a lobby
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const {messageId, questTypeId, rankPreference, targetMonsterId } = req.body;

    const newLobby = await Lobby.create({
        hostId: +userId,
        messageId,
        targetMonsterId,
        questTypeId,
        rankPreference
    });

    return res.json({
        lobby: newLobby
    });
})

module.exports = router;
