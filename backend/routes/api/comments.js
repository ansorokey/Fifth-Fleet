const express = require('express');
const { Comment } = require('../../db/models');

const router = express.Router();

// all comments
router.get('/', async (req, res) => {
    const allComments = await Comment.findAll();

    res.json({
        comments: allComments
    });
});

module.exports = router;
