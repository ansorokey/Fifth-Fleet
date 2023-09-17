const express = require('express');
const { Lobby, User, QuestType, Greeting, Monster, LobbyMember } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
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

module.exports = router;
