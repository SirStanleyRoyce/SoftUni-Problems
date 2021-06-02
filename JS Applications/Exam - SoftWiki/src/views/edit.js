import {html} from '../../node_modules/lit-html/lit-html.js';

import { details, update } from '../api/func.js'

const editTemplate = (data, onEdit) => html`
    <section id="edit-page" class="content">
        <h1>Edit Article</h1>

        <form @submit=${onEdit} id="edit">
            <fieldset>
                <p class="field title">
                    <label for="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter article title" .value=${data.title}>
                </p>

                <p class="field category">
                    <label for="category">Category:</label>
                    <input type="text" name="category" id="category" placeholder="Enter article category" .value=${data.category}>
                </p>
                <p class="field">
                    <label for="content">Content:</label>
                    <textarea name="content" id="content" .value=${data.content}></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Save Changes">
                </p>

            </fieldset>
        </form>
    </section>
`

export async function editPage(ctx){
    const id = ctx.params.id;
    const data = await details(id)
    ctx.render(editTemplate(data, onEdit))
    async function onEdit(ev){
        ev.preventDefault();
        const form = new FormData(ev.target);
        const title = form.get('title');
        const category = form.get('category');
        const content = form.get('content');

        if(title === '' || category === '' || content === '') return alert('All inputs are required!');
        if(!['JavaScript', 'C#', 'Java', 'Python'].includes(category)) return alert('Available categories are JavaScript, C#, Java and Python.');

        await update(id, title, category, content);
        ctx.page.redirect('/');
    }
}