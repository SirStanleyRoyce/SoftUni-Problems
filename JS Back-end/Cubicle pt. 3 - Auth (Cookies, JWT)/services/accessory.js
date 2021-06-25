const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

//------> ACCESSORY
//get attached accessories
async function getAccessories(cubeId) {
    const accIds = (await Cube.findById(cubeId)).accessories || [];
    return Accessory.find({_id: {$in: accIds}}).lean();
}

//get available accessories
async function availableAccessories(cubeId) {
    const used = (await Cube.findById(cubeId)).accessories || [];
    return Accessory.find({_id: {$nin: used}}).lean();
}

//create an accessory
async function postAccessory(body) {
    const accessory = new Accessory(body);
    await accessory.save();
}

//attach an accessory to a cube
async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    if (!cube || !accessory) throw new ReferenceError('No such cube/accessory.')

    cube.accessories.push(accessory);
    await cube.save();
}

module.exports = {
    getAccessories,
    availableAccessories,
    postAccessory,
    attachAccessory
}