import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

export async function getListings(){
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}
export async function getMyListings(userId){
    return await api.get(host +`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
export async function getListingDetails(id){
    return await api.get(host + `/data/cars/${id}`)
}
export async function getListingByYear(year){
    return await api.get(host + `/data/cars?where=year%3D${year}`)
}
export async function createListing(body){
    return await api.post(host + '/data/cars', body)
}
export async function editListing(id, body){
    return await api.put(host + `/data/cars/${id}`, body)
}
export async function deleteListing(id){
    return await api.del(host + `/data/cars/${id}`)
}
