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
                cubes: await req.storage.searchBy(name, minDiff, maxDiff)
            };
        } else { //catalog
            ctx = {
                title: 'Catalog',
                cubes: await req.storage.getAll()
            };
        }

        res.render('index', ctx);
    }
}
