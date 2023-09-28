const express = require('express');
const { Guild, User, Greeting, GuildPhoto, Comment } = require('../../db/models');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// multiple upload
// router.post('/guildId', multipleMulterUpload("images"), async (req, res) => {
//       const { guildId } = req.params;
//       const keys = await multipleFilesUpload({ files: req.files });
//       const images = await Promise.all(
//         keys.map(key => GuildPhoto.create({ key, guildId }))
//       );
//       const imageUrls = images.map(image => retrievePrivateFile(image.key));
//       return res.json(imageUrls);
//     }
//   );

// upload a guild image
router.post('/:guildId/photos',  singleMulterUpload("image"), async (req, res) => {
    const {guildId} = req.params;
    const userId = req.user.id;
    const {caption} = req.body;

    const imageUrl = req.file ? await singleFileUpload({ file: req.file, public: true }) :
    null;

    const newPhoto = await GuildPhoto.create({
        guildId: +guildId,
        userId,
        imageUrl,
        caption
    });

    return res.json({
        image: newPhoto
    });
});

// Get guild images
router.get('/:guildId/photos', async (req, res) => {
    const { guildId } = req.params;
    const images = await GuildPhoto.findAll({
        where: { guildId },
        include: [
            {model: Comment}
        ]
    });

    // const imageUrls = images.map(image => retrievePrivateFile(image.key));
    return res.json({
        images
    });
  }
);

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
                },
                include: {
                    association: 'Weapon'
                }
            },
            {
                model: Greeting
            },
            {
                model: GuildPhoto,
                as: 'Photos',
                include: [{
                    model: User
                },
                {
                    model: Comment
                }]
            },
        ]
    });

    if(!guild) {
        return res.json({
            guild: null
        });
    }

    // convert to a json object for simple adding of association count
    const jsonGuild = guild.toJSON();
    jsonGuild.numMembers = +guild.Members.length;

    res.json({
        guild: jsonGuild
    });
});

// delete guild by Id
router.delete('/:guildId', async (req, res) => {
    const {guildId} = req.params;

    const guild = await Guild.findByPk(guildId);

    if (guild) {
        await guild.destroy();
        return res.json({
            message: 'Deletion successsful'
        });
    }
});

// Edit guild by id
router.put('/:guildId', async (req, res) => {
    const {guildId} = req.params;
    const {name, about, greetingId, avatarUrl, bannerUrl} = req.body;

    const guild = await Guild.findByPk(guildId);

    if (guild) {
        guild.set({
            name,
            about,
            greetingId,
            avatarUrl,
            bannerUrl
        });

        await guild.save();

        const updatedGuild = await Guild.findByPk(guildId, {
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
                    },
                    include: {
                        association: 'Weapon'
                    }
                },
                {
                    model: Greeting
                },
                {
                    model: GuildPhoto,
                    as: 'Photos',
                    include: {
                        model: User
                    }
                }
            ]
        });

        const jsonGuild = updatedGuild.toJSON();
        jsonGuild.numMembers = +updatedGuild.Members.length;

        res.json({
            guild: jsonGuild
        });
    } else {
        // return an error for guild not found
    }
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
            },
            {
                model: Greeting
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

// Create a guild
router.post('/', requireAuth, async (req, res) => {
    const { name, about, greetingId } = req.body;
    const hostId = req.user.id;

    const newGuild = await Guild.create({
        hostId, name, about, greetingId
    });

    return res.json({
        guild: newGuild
    });
})

module.exports = router;
