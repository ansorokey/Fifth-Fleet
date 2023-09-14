const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Signing Up
router.post('/', async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    // create a new user instance
    const newUser = await User.create({
        username,
        email,
        hashedPassword
    });

    // create a user object excluding password
    const safeUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    };

    // Set JWT cookie with NON-sensitive user info
    await setTokenCookie(res, safeUser);

    // return user
    res.json({
        user: safeUser
    })
});

module.exports = router;
