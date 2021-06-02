import {html} from '../../node_modules/lit-html/lit-html.js';

import {getListingByYear} from '../api/functions.js';
import {singleListingTemplate} from "./all-listings.js";

const searchByYearTemplate = (onClick, data, isSearched) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button @click=${onClick} class="button-list">Search</button>
        </div>

        ${isSearched ? html`
            <h2>Results:</h2>
            <div class="listings">

                <!-- Display all records -->
                ${data.map(singleListingTemplate)}` : null}

        ${isSearched && data.length === 0 ? html`<!-- Display if there are no matches -->
        <p class="no-cars"> No results.</p>` : null}
        </div>
    </section>
`

export async function searchPage(ctx) {
    ctx.render(searchByYearTemplate(onClick));

    async function onClick() {
        const year = document.getElementById('search-input').value.trim();
        if( isNaN(Number(year)) || year == '') return alert('invalid input')

        ctx.render(searchByYearTemplate(onClick, await getListingByYear(year), true));
    }
}