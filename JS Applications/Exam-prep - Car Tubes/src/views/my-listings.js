import {html} from '../../node_modules/lit-html/lit-html.js';

import {getMyListings} from '../api/functions.js';
import {singleListingTemplate} from "./all-listings.js";

const myListingsTemplate = (listings) => html`
    <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                <!-- Display all records -->
                ${listings.map(singleListingTemplate)}

                ${ listings.length === 0 ?
                html`<!-- Display if there are no records -->
                <p class="no-cars"> You haven't listed any cars yet.</p>` : null}
            </div>
        </section>
`


export async function myListingsPage(ctx) {
    ctx.render(myListingsTemplate(await getMyListings(sessionStorage.getItem('userId'))));
}