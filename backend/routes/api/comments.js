const express = require('express');
const { Comment, GuildPhoto, User } = require('../../db/models');

const router = express.Router();

// delete a comment
router.delete('/:commentId', async (req, res) => {
    const {commentId} = req.params;

    const comment = await Comment.findByPk(commentId);
    // console.log('\n', comment, '\n');
    const photoId = comment.photoId;
    console.log(photoId);

    await comment.destroy();

    const photo = await GuildPhoto.findByPk(photoId, {
        include: [{
            model: Comment
        },
        {
            model: User
        }]
    });
    return res.json({photo})
});

// all comments
router.get('/', async (req, res) => {
    const allComments = await Comment.findAll();

    res.json({
        comments: allComments
    });
});

module.exports = router;
