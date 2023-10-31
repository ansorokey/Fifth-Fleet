const express = require('express');
const { GuildMember, Guild, User } = require('../../db/models');

const router = express.Router();

// delete a membership by guildId
router.delete('/:guildId/users/:userId', async (req, res) => {
    const {guildId, userId} = req.params;

    const membership = await GuildMember.findOne({
        where: {
            userId,
            guildId
        }
    });

    await membership.destroy();

    return res.json({
        'message': 'successfully removed'
    })
});

// change a membership by guild id
router.put('/:guildId', async (req, res) => {
    const {guildId} = req.params;
    const {userId, membership} = req.body;

    const newMember = await GuildMember.findOne({
        where: {
            userId,
            guildId
        }
    });

    newMember.set({
        status: membership
    });

    await newMember.save();

    let user = await User.findByPk(newMember.userId, {
        include: {association: 'Weapon'}
    });

    user = user.toJSON();
    user.GuildMembers = {status: newMember.toJSON().status};

    return res.json({user});
});

// request a membership by guild id
router.post('/:guildId', async (req, res) => {
    const {guildId} = req.params;
    const user = req.user;

    await GuildMember.create({
        userId: user.id,
        guildId
    })
});

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
