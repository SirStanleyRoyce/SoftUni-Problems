import {html} from '../../node_modules/lit-html/lit-html.js';

import {getListingDetails, deleteListing} from '../api/functions.js';

const detailsTemplate = (car, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}</li>
            </ul>

            <p class="description-para">${car.description}</p>

            ${sessionStorage.userId == car._ownerId ?
                    html `<div class="listings-buttons">
                        <a href="/edit/${car._id}" class="button-list">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                    </div>`
                    : null}
        </div>
    </section>
`

export async function detailsPage(ctx){
    const id = ctx.params.id;
    ctx.render(detailsTemplate(await getListingDetails(id), onDelete));

    async function onDelete(){
        if(confirm('Are you sure you want to delete this listing?')) await deleteListing(id);
        ctx.page.redirect('/all-listings');
    }
}