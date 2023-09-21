// All other routes not for cookies will be defined here
const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = require('express').Router();
const sessionRouter = require('./session');
const userRouter = require('./users');
const lobbyRouter = require('./lobbies');
const greetingRouter = require('./greetings');
const questTypeRouter = require('./questtypes');
const monsterRouter = require('./monsters');
const lobbyMessageRouter = require('./lobbymessages');
const lobbyMemberRouter = require('./lobbymembers');
const guildRouter = require('./guilds');
const guildMessagesRouter = require('./guildmessages');
const guildMemberRouter = require('./guildmembers');
const guildPhotoRouter = require('./guildphotos');

// Adds the current user to the request and passes it on
// current user in db if found
// null if not
router.use(restoreUser);

// All routes here begin with /api (defined in ../index.js)
router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/lobbies', lobbyRouter);
router.use('/greetings', greetingRouter);
router.use('/questTypes', questTypeRouter);
router.use('/monsters', monsterRouter);
router.use('/lobby-chat', lobbyMessageRouter);
router.use('/lobbymembers', lobbyMemberRouter);
router.use('/guilds', guildRouter);
router.use('/guild-chat', guildMessagesRouter);
router.use('/guildmembers', guildMemberRouter);
router.use('/guildphotos', guildPhotoRouter);
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
