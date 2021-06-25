const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController.js');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController')
module.exports = async (app) => {
        app.use('/auth', authController)
        app.use('/cubes', cubeController);
        app.use('/accessory', accessoryController);
        app.use(homeController)
};