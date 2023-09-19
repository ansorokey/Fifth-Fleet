const express = require('express');
const { Guild, User, Greeting, GuildPhoto } = require('../../db/models');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile } = require("../../awsS3");
// import { requireAuth } from '../../utils/auth';

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
        guildId,
        userId,
        imageUrl,
        caption
    });

    console.log(newPhoto);
});

// Gret guild images
router.get('/:guildId/photos', async (req, res) => {
    const { guildId } = req.params;
    const images = await GuildPhoto.findAll({
        where: { guildId }
    });

    const imageUrls = images.map(image => retrievePrivateFile(image.key));
    return res.json(imageUrls);
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
                }
            },
            {
                model: Greeting
            },{
                model: GuildPhoto,
                as: 'Photos'
            }
        ]
    });

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

module.exports = router;
