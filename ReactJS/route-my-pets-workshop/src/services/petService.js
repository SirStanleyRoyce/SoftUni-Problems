const SERVER_URL = 'https://softuni-practice-server.herokuapp.com/data/';

export const getAll = async () => {
    return await (await fetch(`${SERVER_URL}/pets`)).json();
}

export const getOne = async (petId) => {
    return await (await fetch(`${SERVER_URL}/pets/${petId}`)).json();
}

export const getLatest = async () => {
    return await (await fetch(`${SERVER_URL}/pets?sortBy=_createdOn%20desc`)).json();
}

export const getByUser = async (userId) => {
    return await (await fetch(`${SERVER_URL}/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`))
}