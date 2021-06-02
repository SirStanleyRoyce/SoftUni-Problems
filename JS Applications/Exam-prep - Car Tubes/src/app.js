import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from "./api/functions.js";
import { homePage } from "./views/home.js";
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { allListingsPage } from './views/all-listings.js';
import { myListingsPage } from './views/my-listings.js';
import { createListingPage } from './views/create-listing.js';
import { detailsPage } from './views/details.js';
import { searchPage } from './views/search.js';
import { editPage } from './views/edit.js';

navUpdate();

document.getElementById('logoutLink').addEventListener('click', onLogout)

const container = document.getElementById('site-content');

page('/', middleware, homePage)
page('/login', middleware,  loginPage);
page('/register', middleware,  registerPage);
page('/all-listings', middleware, allListingsPage);
page('/my-listings', middleware, myListingsPage);
page('/create-listing', middleware, createListingPage);
page('/details/:id', middleware, detailsPage);
page('/by-year', middleware, searchPage);
page('/edit/:id', middleware, editPage);

page.start();

function middleware(context, next){
    context.render = (content) => render(content, container);
    context.navUpdate = navUpdate;
    next();
}

function navUpdate(){
    const username = sessionStorage.getItem('username')
    const isLogged = username != null;

    if(isLogged){
        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('welcome').textContent = `Welcome ${username}!`
    }
    else{
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
window.nav = navUpdate;

function onLogout(){
    logout();
    navUpdate();
    page.redirect('/');
}
