const cubeService = require('../services/cube');
const accessoryService = require('../services/accessory');

module.exports = () => {
    return (req, res, next) => {
        req.storage = Object.assign({}, cubeService, accessoryService);
        next();
    };
}