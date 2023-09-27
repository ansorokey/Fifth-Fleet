const express = require('express');
const { GuildPhoto, Comment } = require('../../db/models');

const router = express.Router();


// create a comment for a guild photo
router.post('/:photoId/comments', async (req, res) => {
    const {photoId} = req.params;
    const userId = req.user.id;
    const {content} = req.body;

    const newComment = await Comment.create({
        userId,
        photoId,
        content
    });

    return res.json({
        comment: newComment
    });

});

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
