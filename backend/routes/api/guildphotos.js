const express = require('express');
const { GuildPhoto } = require('../../db/models');

const router = express.Router();

// Get all guild photos across all guilds
router.get('/all', async (req, res) => {
    const allPhotos = await GuildPhoto.findAll();

    res.json({
        photos: allPhotos
    });
});

// GET photos by guildId
router.get('/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const allPhotos = await GuildPhoto.findAll({
        where: {
            guildId
        }
    });

    res.json({
        photos: allPhotos
    });
});


module.exports = router;
