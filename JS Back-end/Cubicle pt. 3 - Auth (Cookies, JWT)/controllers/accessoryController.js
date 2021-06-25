const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards')

router.get('/create', (req, res) => {
    res.render('createAccessory', {title: 'Create Accessory'});
})

router.post('/create', async (req, res) => {
    try {
        await req.storage.postAccessory({
            name: req.body.name,
            description: req.body.description,
            imageURL: req.body.imageURL
        });
    } catch (err) {
        let error;
        if (err.name == 'ValidationError') {
            error = 'All fields required. Description up to 500 chars. Url must be valid.'
        } else {
            error = 'Database error.'
        }
        return res.render('createAccessory', {title: 'Create Accessory', error});
    }

    res.redirect('/');
})

module.exports = router;
