import { html } from '../../node_modules/lit-html/lit-html.js';

import { search } from '../api/func.js'

const searchTemplate = (onSearch, isSearched, matches) => html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form @submit=${onSearch} id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Search">
            </p>
        </form>
        ${ isSearched?
       html` <div class="search-container">
            ${ matches.length > 0 ?
                matches.map(matchesTemplate)
            :
                html`<h3 className="no-articles">No matching articles</h3>`
        }
        </div>` : null
        }
    </section>
`
const matchesTemplate = (item) => html`
    <a class="article-preview" href="/details/${item._id}">
        <article>
            <h3>Topic: <span>${item.title}</span></h3>
            <p>Category: <span>${item.category}</span></p>
        </article>
    </a>
`

export async function searchPage(ctx){
    ctx.render(searchTemplate(onSearch))
    async function onSearch(ev){
        ev.preventDefault();
        const title = new FormData(ev.target).get('search');
        ctx.render(searchTemplate(onSearch, true, await search(title)));
    }
}