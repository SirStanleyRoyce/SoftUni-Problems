module.exports = {
    create: async (req, res) => {
        res.render('createAccessory', {title: 'Create Accessory'});
    },
    post: async (req, res) => {
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
    },
    attachPage: async (req, res) => {
        const cubeId = req.params.id;
        const ctx = {
            title: 'Attach Accessory',
            cube: await req.storage.getById(cubeId),
            accessories: await req.storage.availableAccessories(cubeId)
        }
        res.render('attachAccessory', ctx);
    },
    attachPost: async (req, res) => {
        const cubeId = req.params.id;
        await req.storage.attachAccessory(cubeId, req.body.accessory)
        res.redirect(`/details/${cubeId}`);
    }
}