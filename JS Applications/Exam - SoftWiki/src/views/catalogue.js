import {html} from '../../node_modules/lit-html/lit-html.js';

import { getAll } from '../api/func.js'

const catalogueTemplate = (data) => html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${data.length > 0 ? data.map(item => html`<a class="article-preview" href="/details/${item._id}">
            <article>
                <h3>Topic: <span>${item.title}</span></h3>
                <p>Category: <span>${item.category}</span></p>
            </article>
        </a>`) : 
            html`<!-- No articles message -->
        <h3 class="no-articles">No articles yet</h3>
        </section>`
        }
`

export async function cataloguePage(ctx){
        ctx.render(catalogueTemplate(await getAll()));
}