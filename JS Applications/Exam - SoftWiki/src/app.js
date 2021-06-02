import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from './api/func.js'
import { homePage } from './views/home.js';
import { cataloguePage } from './views/catalogue.js';
import { registerPage } from './views/account.js';
import { loginPage } from './views/account.js'
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


navUpdate();

document.getElementById('logout').addEventListener('click', onLogout);

const container = document.getElementById('main-content');

page('/', middleware, homePage);
page('/catalogue', middleware, cataloguePage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/search', middleware, searchPage);

page.start();

function middleware(ctx, next){
    ctx.render = (content) => render(content, container);
    ctx.navUpdate = navUpdate;
    next();
}
function navUpdate(){
    const isLogged = sessionStorage.getItem('authToken') != null;
    if(isLogged){
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}
function onLogout(){
    logout();
    navUpdate();
    page.redirect('/');
}