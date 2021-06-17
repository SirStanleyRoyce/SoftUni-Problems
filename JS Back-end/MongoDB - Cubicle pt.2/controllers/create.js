module.exports = {
    create: async (req, res) => {
        res.render('create', {title: 'Create cube'});
    },
    post: async (req, res) => {
        try {
            await req.storage.postCube({
                name: req.body.name,
                description: req.body.description,
                imageURL: req.body.imageURL,
                difficulty: req.body.difficulty
            });
        } catch (err) {
            let error;
            if(err.name == 'ValidationError'){
                error = 'All fields required. Description up to 500 chars. Url must be valid.'
            } else {
                error = 'Database error.'
            }
            return res.render('create', { title:'Create cube', error });
        }
        res.redirect('/');
    }
}