const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards')

router.get('/register', isGuest(), (req, res) => {
    res.render('register', {title: 'Register'});
})

router.post('/register', isGuest(),  async (req, res) => {
    const [username, password, repass] = [req.body.username, req.body.password, req.body.repeatPassword];
    if (password === repass) {
        try {
            await req.auth.register(username, password);
            res.redirect('/cubes')
        } catch (error) {
            res.render('register', {title: 'Register', u: username, error: error.message})
        }
    } else {
        res.render('register', {title: 'Register', u: username, error: 'Passwords don\'t match'})
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {title: 'Login'});
})

router.post('/login', isGuest(), async (req, res) => {
    const [username, password] = [req.body.username, req.body.password];
    try {
        await req.auth.login(username, password);
    } catch (error) {
        res.render('login', {title: 'Login', u: username, error: error.message})
    }
})

router.get('/logout', isUser(), (req, res) => {
    req.auth.logout();
    res.redirect('/cubes');
})

module.exports = router;