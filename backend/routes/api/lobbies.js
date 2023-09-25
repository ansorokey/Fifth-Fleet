const express = require('express');
const { Lobby, User, QuestType, Greeting, Monster, LobbyMember } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");
const router = express.Router();

// get lobby by id
router.get('/:lobbyId', async (req, res, next) => {
    const {lobbyId} = req.params;

    const lobby = await Lobby.findByPk(lobbyId, {
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
        ],

    });

    if (!lobby) {
        const err = new Error("The requested lobby couldn't be found.");
        err.title = "Lobby Not Found";
        err.errors = { message: "The requested lobby couldn't be found." };
        err.status = 404;
        return next(err);
    }

    res.json({
        lobby
    })
});

// get all lobbies
router.get('/', async (req, res) => {
    const {name, questType, greeting} = req.query;

    const monWhere = {
        required: false,
        where: {}
    };
    if(name) {
        monWhere.where.name = name;
        monWhere.required = true;
    }

    const greetWhere = {
        required: false,
        where: {}
    };
    if (greeting) {
        greetWhere.where.message = greeting;
        greetWhere.required = true;
    }

    const typeWhere = {
        required: false,
        where: {}
    };
    if (questType) {
        typeWhere.where.type = questType;
        typeWhere.required = true;
    };
    const allLobbies = await Lobby.findAll({
        include: [
            {
                model: User,
                as: 'Host'
            },
            {
                model: QuestType,
                ...typeWhere
            },
            {
                model: Greeting,
                ...greetWhere
            },
            {
                model: Monster,
                ...monWhere
            },
            {
                model: User,
                as: 'Members',
                through: {
                    attributes: []
                }
            }
        ],
        order: [
            ['createdAt', 'DESC']
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
