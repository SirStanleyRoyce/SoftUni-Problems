import {html} from '../../node_modules/lit-html/lit-html.js';

import { create } from '../api/func.js'

const createTemplate = (onCreate) => html`
    <section id="create-page" class="content">
        <h1>Create Article</h1>

        <form @submit=${onCreate} id="create">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>

                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>

            </fieldset>
        </form>
    </section>
`

export async function createPage(ctx){
    ctx.render(createTemplate(onCreate))
    async function onCreate(ev){
        ev.preventDefault();
        const form = new FormData(ev.target);
        const title = form.get('title');
        const category = form.get('category');
        const content = form.get('content');

        if(title === '' || category === '' || content === '') return alert('All inputs are required!');
        if(!['JavaScript', 'C#', 'Java', 'Python'].includes(category)) return alert('Available categories are JavaScript, C#, Java and Python.');

        await create(title, category, content);
        ctx.page.redirect('/');
    }
}