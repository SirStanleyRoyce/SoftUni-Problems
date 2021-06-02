import { html } from '../../node_modules/lit-html/lit-html.js';

import { getListingDetails, editListing } from '../api/functions.js';

const editTemplate = (onSubmit, data) => html `
    <section id="edit-listing">
        <div class="container">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${data.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${data.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${data.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${data.year}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${data.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${data.price}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`
export async function editPage(ctx){
    const id = ctx.params.id;

    ctx.render(editTemplate(onSubmit, await getListingDetails(id)));

    async function onSubmit(ev){
        ev.preventDefault();
        const form = new FormData(ev.target);
        const brand = form.get('brand').trim();
        const model = form.get('model').trim();
        const description = form.get('description').trim();
        const year = Number(form.get('year').trim());
        const imageUrl = form.get('imageUrl').trim();
        const price =  Number(form.get('price').trim())

        if([brand, model, description, year, imageUrl, price].some(x => x.length === 0)) return alert('All inputs are required!')
        if(price <= 0 || year <= 0) return alert('Price and year must be positive numbers!')

        await editListing(id, {brand, model, description, year, imageUrl, price});
        ev.target.reset();

        ctx.page.redirect(`/details/${id}`)
    }
}