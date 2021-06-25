const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createUser, getUserByUsername} = require('../services/user');
const {COOKIE_NAME, TOKEN_SECRET} = require('../config')

module.exports = async () => {
    return async (req, res, next) => {
        req.auth = { register, login, logout};
        if(readToken(req)) next();

        function createToken(user) {
            const userData = {_id: user._id, username: user.username};
            const token = jwt.sign(userData, TOKEN_SECRET);
            res.cookie(COOKIE_NAME, token, {httpOnly: true});
            return userData;
        }

        function readToken(req) {
            const token = req.cookies[COOKIE_NAME];
            if (token) {
                try {
                    const userData = jwt.verify(token, TOKEN_SECRET);
                    req.user = userData;
                    res.locals.user = userData;

                } catch (err) {
                    res.clearCookie(COOKIE_NAME);
                    res.redirect('/auth/login');
                    return false;
                }
            }
            return true;
        }

        async function register(username, password) {
            if (await getUserByUsername(username)) {
                throw new Error('Username is taken!');
            }
            const hash = await bcrypt.hash(password, 10);
            const user = await createUser(username, hash);
            createToken(user);
        }

        async function login(username, password) {
            const user = await getUserByUsername(username);
            if (user && await bcrypt.compare(password, user.hashedPassword)) {
                createToken(user);
                res.redirect('/cubes')
            } else {
                throw new Error('Wrong username or password!')
            }
        }

        function logout() {
            res.clearCookie(COOKIE_NAME);
        }
    }
}