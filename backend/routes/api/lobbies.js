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

// edit lobby by id
router.put('/:lobbyId', async (req, res) => {
    const {lobbyId} = req.params;
    let {messageId, questTypeId, rankPreference, targetMonsterId, sessionCode } = req.body;
    if (!+targetMonsterId) targetMonsterId = null;
    console.log(req.body);

    const lobby = await Lobby.findByPk(lobbyId);

    if (lobby) {
        lobby.set({
            messageId,
            questTypeId,
            rankPreference,
            targetMonsterId,
            sessionCode
        });

        await lobby.save();
        const updatedLobby = await Lobby.findByPk(lobbyId, {
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

        return res.json({
            lobby: updatedLobby
        });
    }

});

// delete lobby by id
router.delete('/:lobbyId', async (req, res) => {
    const {lobbyId} = req.params;

    const lobby = await Lobby.findByPk(lobbyId);

    await lobby.destroy();

    return res.json({
        message: 'Delete successful'
    });
})

// get all lobbies
router.get('/', async (req, res) => {
    const {name, questType, greeting, limit} = req.query;

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

    let allLobbies = await Lobby.findAll({
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

    if (limit) {
        allLobbies = allLobbies.slice(allLobbies.length - limit);
    }

    res.json({
        lobbies: allLobbies
    })
});

// create a lobby
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const {messageId, questTypeId, rankPreference, targetMonsterId, sessionCode } = req.body;

    const newLobby = await Lobby.create({
        hostId: +userId,
        messageId,
        targetMonsterId,
        questTypeId,
        rankPreference,
        sessionCode
    });

    return res.json({
        lobby: newLobby
    });
})

module.exports = router;
