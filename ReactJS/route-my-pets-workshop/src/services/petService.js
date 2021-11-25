import * as api from './api';

const SERVER_URL = 'https://softuni-practice-server.herokuapp.com/data';

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

export const createPet = async (userId, body) => {
    const res = await api.post(`${SERVER_URL}/pets`, body);
    return res;
} 

export const editPet = async (petId, body) => {
    const res = await api.put(`${SERVER_URL}/pets/${petId}`, body);
    return res;
}

export const deletePet = async (petId) => {
    const res = await api.del(`${SERVER_URL}/pets/${petId}`);
    return res;
}

export const isOwner = (userId, ownerId) => {
    return userId === ownerId;
}

export const getLikes = async (petId) => {
    const res = await api.get(`${SERVER_URL}/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    return res;
}

export const getLikeByUserId = async (petId, userId) => {
    const res = await api.get(`${SERVER_URL}/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return res;
}

export const likePet = async (petId) => {
    const res = await api.post(`${SERVER_URL}/likes`, { petId });
    return res;
}
