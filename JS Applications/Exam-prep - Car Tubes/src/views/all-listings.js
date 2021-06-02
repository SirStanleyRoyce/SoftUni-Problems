import {html} from '../../node_modules/lit-html/lit-html.js';

import {getListings} from '../api/functions.js';

const listingsTemplate = (listings) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${listings ?
                    html`<!-- Display all records -->
                    ${listings.map(singleListingTemplate)}`
                    :
                    html`<!-- Display if there are no records -->
                    <p class="no-cars">No cars in database.</p> `}
        </div>
    </section>
`

export const singleListingTemplate = (listing) => html`
    <div class="listing">
        <div class="preview">
            <img src=${listing.imageUrl}>
        </div>
        <h2>${listing.brand +' '+ listing.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${listing.year}</h3>
                <h3>Price: ${listing.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${listing._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`

export async function allListingsPage(ctx){
    ctx.render(listingsTemplate(await getListings()));
}