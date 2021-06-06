module.exports = {
    details: async (req, res) => {
        const cube = await require('../config/db').getById(req.params.id);

        const ctx = {
            title: 'Details',
            cube
        }
        res.render('details', ctx);
    }
}