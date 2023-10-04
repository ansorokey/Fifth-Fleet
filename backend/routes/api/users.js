const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Weapon } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validate User sign up information
const validateSignup = [
    check('email')
        .exists({values: 'falsy'})
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({values: 'falsy'})
        .isLength({min: 4})
        .withMessage('Please provide a username between 4 and 30 characters in length'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email address'),
    check('password')
        .exists({values: 'falsy'})
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters in length'),
    handleValidationErrors
]

// GET user by id
router.get('/:userId', async (req, res) => {
    const {userId} = req.params;

    const user = await User.findByPk(userId, {
        include: [
            {
                association: 'Weapon'
            }
        ]
    });

    if (user) {
        return res.json({
            user
        });
    }
});

// Signing Up
// Validates user signup info before creating user
router.post('/', validateSignup, async (req, res, next) => {
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

// retrieve all users
router.get('/', async (req, res) => {

    const allUsers = await User.findAll();

    res.json({
        users: allUsers
    })
})

module.exports = router;
