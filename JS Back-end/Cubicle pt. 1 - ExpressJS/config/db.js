const fs = require('fs/promises');
const uniqID = require('uniqid');

//get all data
async function getAll() {
    const data = JSON.parse((await fs.readFile('./config/database.json')).toString());
    return Object.entries(data).map(([id, values]) => Object.assign({}, {id}, values));
}

//get data by ID
async function getById(id, res) {
    return (await getAll()).find(c => c.id === id);
}

//search
async function searchBy(name, minDiff, maxDiff) {
    [name, minDiff, maxDiff] = [name || '', minDiff || 1, maxDiff || 6];
    return (await getAll()).filter(c =>
        c.name.toLowerCase().includes(name.toLowerCase())
        & Number(c.difficulty) >= Number(minDiff)
        & Number(c.difficulty) <= Number(maxDiff));
}

//post data
async function postCube(body) {
    const data = JSON.parse((await fs.readFile('./config/database.json')).toString());
    data[uniqID()] = {
        name: body.name,
        description: body.description,
        imageURL: body.imageURL,
        difficulty: body.difficulty
    };
    await fs.writeFile('./config/database.json', JSON.stringify(data, null, 2))
}

module.exports = {
    getAll,
    getById,
    searchBy,
    postCube
}