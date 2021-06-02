import {changeView, navUpdate} from "./app.js";

export function logout(){
    sessionStorage.clear();
    navUpdate();
    changeView('homePage');
}