import {html} from '../../node_modules/lit-html/lit-html.js';

import {createListing} from '../api/functions.js';

const createTemplate = async (onSubmit) => html `
    <section id="create-listing">
        <div class="container">
            <form @submit=${await onSubmit} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`
export async function createListingPage(ctx){
    ctx.render(await createTemplate(onSubmit));

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

        await createListing({brand, model, description, year, imageUrl, price});
        ev.target.reset();

        ctx.page.redirect(`/all-listings`)
    }
}