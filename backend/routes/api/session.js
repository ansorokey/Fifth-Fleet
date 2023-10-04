const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Weapon } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Login Validations
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password'),
    handleValidationErrors
];

// Get the curent user
router.get('/', async (req, res) => {
    // user was stored in request by restoreUser in previous middleware
    const { user } = req;
    if( user ) {
        const safeUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            weaponUrl: user.Weapon.iconUrl,
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
// Middleware only allows this to be reached if a credential and password exist
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    // query for the user with matching credential
    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: [
                { username: credential },
                { email: credential }
            ]
        },
        include: {
            association: 'Weapon'
        }
    });

    if( user && bcrypt.compareSync(password, user.hashedPassword.toString()) ) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
            weaponUrl: user.Weapon.iconUrl,
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
