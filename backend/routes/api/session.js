const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Get the curent user
router.get('/', async (req, res) => {
    // user was stored in request by restoreUser in previous middleware
    const { user } = req;
    if( user ) {
        const safeUser = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        return res.json({
            user: safeUser
        });
    } else {
        return res.json({
            user: null
        })
    }
});

// Logging In
router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    // query for the user with matching credential
    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: [
                { username: credential },
                { email: credential }
            ]
        }
    });

    if( user && bcrypt.compareSync(password, user.hashedPassword.toString()) ) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username
        };

        // sets the JWT token using the user's info
        // The jwt token is read and passed into future requests to check for user
        await setTokenCookie(res, safeUser);

        res.json({
            user: safeUser
        });

    } else {
        // throw error
        const err = new Error('Login Failed');
        err.status = 401;
        err.title = 'Login Failed';
        err.errors = {
            credential: 'The provided credentials were invalid'
        };

        // Pass on to the next error handling middleware
        next(err);
    }
});

// Logging Out
router.delete('/', async (_req, res) => {
    // The token cookie contains the user info
    // Clearing the cookie removes user data
    res.clearCookie('token');

    // return a success response
    return res.json({
        message: 'Succcess'
    });
});

module.exports = router;
