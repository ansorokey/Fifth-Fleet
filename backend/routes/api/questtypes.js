const express = require('express');
const { QuestType } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const allQuestTypes = await QuestType.findAll();

    res.json({
        questTypes: allQuestTypes
    });
});

module.exports = router;
