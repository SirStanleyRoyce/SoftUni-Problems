const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
//------> CUBE
//get all data
async function getAll() {
    return Cube.find({}).lean();
}

//get data by ID
async function getById(id) {
    return Cube.findById(id).lean();
}

//search
async function searchBy(name, minDiff, maxDiff) {
    const options = {
        'name': {
            '$regex': name || '',
            '$options': 'i'
        },
        'difficulty': {
            $gte: minDiff || 0,
            $lte: maxDiff || 6
        }
    };
    return Cube.find(options).lean();
}

//post data
async function postCube(body) {
    const cube = new Cube(body)
    await cube.save();
}

//------> ACCESSORY
//get attached accessories
async function getAccessories(cubeId){
    const accIds = (await Cube.findById(cubeId)).accessories || [];
    return Accessory.find({_id:{$in:accIds}})
}

//get available accessories
async function availableAccessories(cubeId){
    const used = (await Cube.findById(cubeId)).accessories || [];
    return Accessory.find({ _id: {$nin: used}}).lean();
}

//create an accessory
async function postAccessory(body){
    const accessory = new Accessory(body)
    await accessory.save();
}

//attach an accessory to a cube
async function attachAccessory(cubeId, accessoryId){
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    if(!cube || !accessory) throw new ReferenceError('No such cube/accessory.')

    cube.accessories.push(accessory);
    await cube.save();
}
module.exports = (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        searchBy,
        postCube,
        getAccessories,
        availableAccessories,
        postAccessory,
        attachAccessory
    };
    next();
}