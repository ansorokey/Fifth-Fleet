const express = require('express');
const { GuildPhoto, Comment, User } = require('../../db/models');

const router = express.Router();

router.get('/photos/:photoId', async (req, res) => {
    const {photoId} = req.params;

    const photo = await GuildPhoto.findByPk(photoId, {
        include: {model: Comment}
    });

    return res.json({
        photo
    })
})

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

    if (newComment) {
        const comment = await Comment.findByPk(newComment.id);
        return res.json({
            comment
        });
    }


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
