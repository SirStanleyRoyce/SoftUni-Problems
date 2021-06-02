import {html} from '../../node_modules/lit-html/lit-html.js'

import {login} from '../api/functions.js'

const loginTemplate = async (onSubmit) => html`
    <section id="login">
        <div class="container">
            <form @submit=${await onSubmit} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
`

export async function loginPage(ctx) {
    ctx.render(await loginTemplate(onSubmit))

    async function onSubmit(ev) {
        ev.preventDefault();
        const form = new FormData(ev.target);
        const username = form.get('username').trim();
        const password = form.get('password').trim();

        await login(username, password);
        ev.target.reset();
        ctx.navUpdate();
        ctx.page.redirect('/all-listings')
    }
}