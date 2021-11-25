import { useNavigate } from "react-router";

import { editPet } from "../../services/petService";

export default function EditPet({ petId, petData, setPetData, userId }) {
    const navigate = useNavigate();

    const editHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { name, description, imageUrl, type } = Object.fromEntries(form);

        await editPet(petId, { name, description, imageUrl, type });
        setPetData({ name, description, imageUrl, type });
        navigate(`/my-pets/${userId}`);
    }

    return (
        <section id="edit-page" className="edit">
            <form id="edit-form" method="POST" onSubmit={editHandler}>
                <fieldset>
                    <legend>Edit my Pet</legend>
                    <p className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input">
                            <input type="text" name="name" id="name" defaultValue={petData.name} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description"
                                id="description" defaultValue={petData.description}></textarea>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input type="text" name="imageUrl" id="image" defaultValue={petData.imageUrl} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="type">Type</label>
                        <span className="input">
                            <select id="type" name="type" defaultValue={petData.type}>
                                <option value="cat" >Cat</option>
                                <option value="dog">Dog</option>
                                <option value="parrot">Parrot</option>
                                <option value="reptile">Reptile</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Save" />
                </fieldset>
            </form>
        </section>
    )
}