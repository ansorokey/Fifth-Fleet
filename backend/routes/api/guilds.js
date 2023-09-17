const express = require('express');
const { Guild, User, GuildMember, sequelize } = require('../../db/models');

const router = express.Router();

// Get guild by guildId
router.get('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const guild = await Guild.findByPk(guildId, {
        include: [
            {
                model: User,
                as: 'Host'
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

    // const numMembers = await GuildMember.count({
    //     where: {
    //         guildId
    //     }
    // });

    // convert to a json object for simple adding of association count
    const jsonGuild = guild.toJSON();
    jsonGuild.numMembers = +guild.Members.length;

    res.json({
        guild: jsonGuild
    });
});

// Get all Guilds
router.get('/', async (req, res) => {
    const allGuilds = await Guild.findAll({
        include: [
            {
                model: User,
                as: 'Host'
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

    const guildsJson = allGuilds.map(g => {
        let asJson = g.toJSON();
        asJson.numMembers = +g.Members.length;
        return asJson;
    });

    res.json({
        guilds: guildsJson
    });
});

module.exports = router;
