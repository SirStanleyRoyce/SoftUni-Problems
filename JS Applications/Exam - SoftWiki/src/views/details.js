import {html} from '../../node_modules/lit-html/lit-html.js';

import { details, del} from '../api/func.js'

const detailsTemplate = (item, isOwner, onDelete) => html `
    <section id="details-page" class="content details">
        <h1>${item.title}</h1>

        <div class="details-content">
            <strong>Published in category ${item.category}</strong>
            <p>${item.content}</p>

            <div class="buttons">
                ${isOwner? html`<a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${item._id}" class="btn edit">Edit</a>` : null}
                <a href="/" class="btn edit">Back</a>
            </div>
        </div>
    </section>
`

export async function detailsPage(ctx){
    const id = ctx.params.id;
    const item = await details(id);
    const isOwner = sessionStorage.getItem('userId') == item._ownerId;

    async function onDelete(){
        if(confirm('Do you want to delete this article?')) await del(id);
        ctx.page.redirect('/');
    }
    ctx.render(detailsTemplate(item, isOwner, onDelete));
}