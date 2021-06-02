import {register} from './register.js';
import {login} from './login.js';
import {logout} from './logout.js';
import {setMovies, getMovieDetails, like_dislike, addMovie, editMovie, getEditData, deleteMovie} from './movies.js';

export const section = {
    homePage: {
        home: document.getElementById('home-page'),
        moviesText: document.querySelector('h1.text-center'),
        movie: document.getElementById('movie'),
        addMovieBtn: document.getElementById('add-movie-button'),
        pagination: document.getElementById('pagination')
    },
    movieExample: {el: document.getElementById('movie-example')},
    addMovie: {el: document.getElementById('add-movie')},
    editMovie: {el: document.getElementById('edit-movie')},
    formLogin: {el: document.getElementById('form-login')},
    formRegister: {el: document.getElementById('form-sign-up')}
}
export const nav = {
    home: document.querySelector('nav a'),
    welcome: document.querySelectorAll('.nav-link')[0],
    logout: document.querySelectorAll('.nav-link')[1],
    login: document.querySelectorAll('.nav-link')[2],
    register: document.querySelectorAll('.nav-link')[3],
}


async function start() {
    navUpdate();
    await setMovies();
    changeView('homePage');

    //nav view-handler
    document.querySelector('nav').addEventListener('click', async (ev) => {
        if (ev.target == nav.home) {
            await setMovies()
            changeView('homePage');
        }
        if (ev.target == nav.login) changeView('formLogin');

        if (ev.target == nav.register) changeView('formRegister');

        if (ev.target == nav.logout && confirm('Are you sure you want to logout?')) logout();
    })

    //register
    section.formRegister.el.addEventListener('submit', await register)

    //login
    section.formLogin.el.addEventListener('submit', await login)

    //detail button
    section.homePage.movie.addEventListener('click', async (ev) => {
        if (ev.target.classList.contains('btn-info')) {
            await getMovieDetails(ev);
        }
    })
    //add movie view button
    section.homePage.addMovieBtn.addEventListener('click', () => {
        changeView('addMovie');
    })

    //add movie
    section.addMovie.el.addEventListener('submit', await addMovie)

    //like, edit, delete buttons
    section.movieExample.el.addEventListener('click', async (ev) => {
        if (ev.target.classList.contains('likeBtn')) await like_dislike();
        if (ev.target.classList.contains('delBtn')) await deleteMovie();
        if (ev.target.classList.contains('editBtn')) await changeView('editMovie');
    })
    //edit movie
    section.editMovie.el.addEventListener('submit', await editMovie);
}

start();

export function navUpdate() {
    if (sessionStorage.getItem('authToken')) {
        nav.register.style.display = 'none';
        nav.login.style.display = 'none';
        nav.logout.style.display = 'block';
        nav.welcome.textContent = `Welcome, ${sessionStorage.getItem('email')}`
        nav.welcome.style.display = 'block';
    } else {
        nav.welcome.style.display = 'none';
        nav.logout.style.display = 'none';
        nav.register.style.display = 'block';
        nav.login.style.display = 'block';
    }
}

export async function changeView(view) {
    //view is of type string and matches a section
    if (view === 'editMovie') await getEditData();

    for (const key in section) {
        if (key === view) Object.values(section[key]).forEach(s => s.style.display = 'block')
        else Object.values(section[key]).forEach(s => s.style.display = 'none')
    }
    if (sessionStorage.getItem('authToken') == null) section.homePage.addMovieBtn.style.display = 'none';
}