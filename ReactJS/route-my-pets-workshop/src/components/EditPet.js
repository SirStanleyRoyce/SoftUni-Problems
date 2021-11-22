export default function EditPet() {
    return (
        <section id="edit-page" class="edit">
            <form id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Pet</legend>
                    <p class="field">
                        <label htmlFor="name">Name</label>
                        <span class="input">
                            <input type="text" name="name" id="name" value="Milo" />
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">Today, some dogs are used as pets, others are used to help humans do their work. They are a popular pet because they are usually playful, friendly, loyal and listen to humans. Thirty million dogs in the United States are registered as pets.[5] Dogs eat both meat and vegetables, often mixed together and sold in stores as dog food. Dogs often have jobs, including as police dogs, army dogs, assistance dogs, fire dogs, messenger dogs, hunting dogs, herding dogs, or rescue dogs.</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value="/images/dog.png" />
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="dog">
                                <option value="cat" >Cat</option>
                                <option value="dog" selected>Dog</option>
                                <option value="parrot">Parrot</option>
                                <option value="reptile">Reptile</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save" />
                </fieldset>
            </form>
        </section>
    )
}