module.exports = {
    details: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAccessories(req.params.id);

        if (cube == undefined) res.redirect('/404');
        const ctx = {
            title: 'Details',
            cube,
            accessories
        }
        res.render('details', ctx);
    }
}