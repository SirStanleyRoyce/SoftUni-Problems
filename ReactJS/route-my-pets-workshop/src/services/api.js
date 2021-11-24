async function request(url, options) {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return response.json();
        } catch (error) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    }

    const authToken = sessionStorage.getItem('authToken');
    if (authToken != null) {
        options.headers['X-Authorization'] = authToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, body) {
    return await request(url, getOptions('post', body));
}

export async function put(url, body) {
    return await request(url, getOptions('put', body));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}