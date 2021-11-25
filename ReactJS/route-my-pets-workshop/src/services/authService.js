import * as api from './api';

const AUTH_SERVER_URL = 'http://softuni-practice-server.herokuapp.com/users';

export const login = async (email, password) => {
    try {
        const res = await api.post(`${AUTH_SERVER_URL}/login`, { email, password })

        sessionStorage.setItem('authToken', res.accessToken);
        sessionStorage.setItem('userId', res._id);
        sessionStorage.setItem('email', res.email);

        return res;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export const register = async (email, password) => {
    const res = await api.post(`${AUTH_SERVER_URL}/register`, { email, password })

    sessionStorage.setItem('authToken', res.accessToken);
    sessionStorage.setItem('userId', res._id);
    sessionStorage.setItem('email', res.email);

    return res;
}


export const logout = async () => {
    const res = await fetch(`${AUTH_SERVER_URL}/logout`);

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');

    return res;
}

export const getUserData = () => {
    return {
        email: sessionStorage.getItem('email'),
        userId: sessionStorage.getItem('userId')
    }
}

export const isAuthenticated = () => {
    return Boolean(sessionStorage.getItem('authToken'));
}