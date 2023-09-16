// All other routes not for cookies will be defined here
const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = require('express').Router();
const sessionRouter = require('./session');
const userRouter = require('./users');

// Adds the current user to the request and passes it on
// current user in db if found
// null if not
router.use(restoreUser);

// All routes here begin with /api (defined in ../index.js)
router.use('/session', sessionRouter);
router.use('/users', userRouter);

// test route
// router.get('/set-token-cookie', async(_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'demouser'
//         }
//     });

//     setTokenCookie(res, user);
//     return res.json({user})
// });

// test route
// router.get(
//     '/restore-user',
//     (req, res) => {
//       return res.json(req.user);
//     }
// );

// test route
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

// Test Route
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
