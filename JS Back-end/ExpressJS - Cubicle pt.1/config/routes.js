const { catalog }  = require('../controllers/catalog.js');
const { details }  = require('../controllers/details.js');
const { create, post }  = require('../controllers/create.js');
const { about }  = require('../controllers/about.js');
const { notFound }  = require('../controllers/404.js');

module.exports = async (app) => {
        app.get('/', await catalog);
        app.get('/details/:id', await details);
        app.get('/create', create);
        app.post('/create', await post)
        app.get('/about', about);
        app.all('*', notFound);
};