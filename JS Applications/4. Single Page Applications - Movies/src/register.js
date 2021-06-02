import {changeView, navUpdate} from './app.js';

export async function register(ev){
    ev.preventDefault();

    const form = new FormData(ev.target);
    //validation
    if(!form.get('email').trim()) return alert('Invalid email !');
    if(form.get('password').trim().length < 6) return alert('Password must be at least 6 characters long !');
    if(form.get('repeatPassword').trim() !== form.get('password').trim()) return alert('Passwords don\'t match !');

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: form.get('email'), password: form.get('password')})
    })
    if(!response.ok) return alert('Something went wrong...');

    const data = await response.json();
    sessionStorage.setItem('authToken', data.accessToken)
    sessionStorage.setItem('userId', data._id)
    sessionStorage.setItem('email', data.email)

    ev.target.reset();

    navUpdate();
    changeView('homePage');
}
