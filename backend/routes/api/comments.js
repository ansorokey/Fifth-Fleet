const express = require('express');
const { Comment, GuildPhoto, User } = require('../../db/models');

const router = express.Router();

//edit a comment
router.put('/:commentId', async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;

    const comment = await Comment.findByPk(commentId);
    comment.content = content;
    await comment.save();

    return res.json({
        comment
    });
});

// delete a comment
router.delete('/:commentId', async (req, res) => {
    const {commentId} = req.params;

    const comment = await Comment.findByPk(commentId);

    if (comment) await comment.destroy();

    return res.json({
        "message": "successfully deleted"
    });
});

// all comments
router.get('/', async (req, res) => {
    const allComments = await Comment.findAll();

    res.json({
        comments: allComments
    });
});

module.exports = router;
