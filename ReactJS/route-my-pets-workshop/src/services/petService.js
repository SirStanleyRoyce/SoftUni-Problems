import * as api from './api';

const SERVER_URL = 'https://softuni-practice-server.herokuapp.com/data/';

export const getAll = async () => {
    const res = await api.get(`${SERVER_URL}/pets`);
    return res;
}

export const getOne = async (petId) => {
    const res = await api.get(`${SERVER_URL}/pets/${petId}`)
    return res;
}

export const getLatest = async () => {
    const res = await api.get(`${SERVER_URL}/pets?sortBy=_createdOn%20desc`);
    return res;
}

export const getByUser = async (userId) => {
    const res = await api.get(`${SERVER_URL}/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return res;
}