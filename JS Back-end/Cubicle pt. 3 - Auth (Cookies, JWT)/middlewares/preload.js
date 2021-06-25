function preloadCube() {
    return async (req, res, next) => {
        req.data = req.data || {};
        try {
            req.data.cube = await req.storage.getById(req.params.id);
            next();
        } catch (error) {
            console.error('Database error: ', error.message);
        }
    };
}
module.exports = { preloadCube };