const router = require('express').Router()
const {isUser, isOwner} = require('../middlewares/guards')
const {preloadCube} = require("../middlewares/preload");

//catalog & search
router.get('/', async (req, res) => {
    let ctx;
    const [name, minDiff, maxDiff] = [req.query.search, req.query.from, req.query.to];
    if (name || minDiff || maxDiff) { //search
        ctx = {
            title: 'Search',
            name,
            minDiff,
            maxDiff,
            cubes: await req.storage.searchBy(name, minDiff, maxDiff)
        };
    } else { //catalog
        ctx = {
            title: 'Catalog',
            cubes: await req.storage.getAll()
        };
    }

    res.render('index', ctx);
})

//details
router.get('/details/:id', preloadCube(), async (req, res) => {
    const cube = req.data.cube;

    if (cube == undefined) return res.redirect('/404');
    cube.isOwner = req.user && (cube.author._id == req.user._id);
    const ctx = {
        title: 'Details',
        cube,
        accessories: cube.accessories
    }
    res.render('details', ctx);
})

//create
router.get('/create', isUser(), async (req, res) => {
    res.render('create', {title: 'Create cube'});
})

router.post('/create', isUser(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL,
        difficulty: req.body.difficulty,
        author: req.user._id
    };

    try {
        await req.storage.postCube(cube);
    } catch (err) {
        let error;
        if (err.name == 'ValidationError') {
            error = 'All fields required. Description up to 500 chars. Url must be valid.'
        } else {
            error = 'Database error.'
        }
        cube[`selected${cube.difficulty}`] = true;
        return res.render('create', {title: 'Create cube', cube, error});
    }
    res.redirect('/');
})

//edit
router.get('/edit/:id', preloadCube(), isOwner(), async (req, res) => {
    const cube = req.data.cube;

    if (!cube) res.redirect('/404');

    cube[`selected${cube.difficulty}`] = true;
    const ctx = {
        title: 'Edit',
        cube
    }
    res.render('edit', ctx)
})

router.post('/edit/:id', preloadCube(), isOwner(), async (req, res) => {
    const cubeId = req.data.cube._id;
    const body = {
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL,
        difficulty: Number(req.body.difficulty)
    };
    try {
        await req.storage.editCube(cubeId, body);
        res.redirect(`/cubes/details/${cubeId}`)
    } catch (error) {
        console.error(error.message)
        res.redirect(`/cubes/edit/${cubeId}`)
    }
})

//delete
router.get('/delete/:id', preloadCube(), isOwner(), (req, res) => {
    const cube = req.data.cube;
    if (!cube) res.redirect('/404');

    cube[`selected${cube.difficulty}`] = true;
    const ctx = {
        title: 'Delete',
        cube
    }
    res.render('delete', ctx);
})

router.post('/delete/:id', preloadCube(), isOwner(), async (req, res) => {
    await req.storage.deleteCube(req.data.cube._id);
    res.redirect('/cubes');
})

//attaching accessories
router.get('/attach/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const ctx = {
        title: 'Attach Accessory',
        cube: await req.storage.getById(id),
        accessories: await req.storage.availableAccessories(id)
    }
    res.render('attachAccessory', ctx);
})

router.post('/attach/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    await req.storage.attachAccessory(id, req.body.accessory)
    res.redirect(`/cubes/details/${id}`);
})

module.exports = router;