import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;


export async function getAll() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}
export async function getCategories() {
    return await api.get(host + `/data/wiki?sortBy=_createdOn%20desc&distinct=category`);
}
export async function details(id) {
    return await api.get(host + `/data/wiki/${id}`);
}
export async function create(title, category, content) {
    return await api.post(host + '/data/wiki', {title, category, content});
}
export async function update(id, title, category, content){
    return await api.put(host + `/data/wiki/${id}`, {title, category, content});
}
export async function del(id){
    return await api.del(host + `/data/wiki/${id}`);
}

export async function search(title){
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${title}%22`);
}