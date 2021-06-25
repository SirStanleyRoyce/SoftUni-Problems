const Cube = require('../models/Cube');

//------> CUBE
//get all data
async function getAll() {
    return Cube.find({}).lean();
}

//get data by ID
async function getById(id) {
    const cube = await Cube.findById(id)
        .populate('accessories')
        .populate('author')
        .lean();

    return {
        _id: cube._id,
        name: cube.name,
        description: cube.description,
        imageURL: cube.imageURL,
        difficulty: cube.difficulty,
        accessories: cube.accessories,
        author: cube.author
    }
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

//edit
async function editCube(id, body){
    const cube = await Cube.findById(id);

    if(!cube) throw new ReferenceError('No such cube in database.');

    Object.assign(cube, body);
    return cube.save();
}
//delete
async function deleteCube(id){
    return Cube.deleteOne({_id: id});
}
module.exports = {
    getAll,
    getById,
    searchBy,
    postCube,
    editCube,
    deleteCube
}