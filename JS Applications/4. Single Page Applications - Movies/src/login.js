import {changeView, navUpdate} from './app.js';

export async function login(ev){
    ev.preventDefault();

    const form = new FormData(ev.target);

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: form.get('email'), password: form.get('password')})
    })
    if(!response.ok) return alert('Wrong password/email combination...');

    const data = await response.json();
    sessionStorage.setItem('authToken', data.accessToken)
    sessionStorage.setItem('userId', data._id)
    sessionStorage.setItem('email', data.email)

    ev.target.reset();

    navUpdate();
    changeView('homePage');
}