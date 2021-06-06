const { postCube } = require('../config/db');

module.exports = {
    create: async (req, res) => {
        res.render('create', {title: 'Create cube'});
    },
    post: async (req, res) => {
        await postCube(req.body)
        res.redirect('/');
    }
}