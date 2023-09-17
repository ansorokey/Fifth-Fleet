const express = require('express');
const { Lobby, User, QuestType, LobbyGreeting, Monster } = require('../../db/models');

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
                model: LobbyGreeting
            },
            {
                model: Monster
            }
        ]
    });

    res.json({
        lobbies: allLobbies
    })
});

module.exports = router;
