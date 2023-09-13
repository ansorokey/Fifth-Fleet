const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

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

module.exports = router;
