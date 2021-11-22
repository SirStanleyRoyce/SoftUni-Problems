export default function AddPet() {
    return (
        <section id="create-page" class="create">
            <form id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Pet</legend>
                    <p class="field">
                        <label htmlFor="name">Name</label>
                        <span class="input">
                            <input type="text" name="name" id="name" placeholder="Name" />
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image" />
                        </span>
                    </p>
                    <p class="field">
                        <label htmlFor="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                                <option value="parrot">Parrot</option>
                                <option value="reptile">Reptile</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Pet" />
                </fieldset>
            </form>
        </section>
    )
}