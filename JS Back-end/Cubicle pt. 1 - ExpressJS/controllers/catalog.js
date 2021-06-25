const { getAll, searchBy } = require('../config/db');

module.exports = {
    catalog: async (req, res) => {
        let ctx;
        const [name, minDiff, maxDiff] = [req.query.search, req.query.from, req.query.to];
        if (name || minDiff || maxDiff) { //search
            ctx = {
                title: 'Search',
                name,
                minDiff,
                maxDiff,
                cubes: await searchBy(name, minDiff, maxDiff)
            };
        } else { //catalog
            ctx = {
                title: 'Catalog',
                cubes: await getAll()
            };
        }

        res.render('index', ctx);
    }
}
