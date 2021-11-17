const SERVER_URL = 'http://localhost:3030/data';

export async function getAll() {
    return (await fetch(`${SERVER_URL}/games?sortBy=_createdOn%20desc`)).json();
}

export async function getOne(id) {
    try {
        return (await fetch(`${SERVER_URL}/games/${id}`)).json();
    }
    catch (e) {
        throw new Error(e);
    }
}

export async function getLatest() {
    return (await fetch(`${SERVER_URL}/games?sortBy=_createdOn%20desc&distinct=category`)).json();
}

export async function getComments(id) {
    try {
        return (await fetch(`${SERVER_URL}/comments?where=gameId%3D%22${id}%22`)).json();
    } catch (e) {
        throw new Error(e);
    }
}