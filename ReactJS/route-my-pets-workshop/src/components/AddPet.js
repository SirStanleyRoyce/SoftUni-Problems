import { useNavigate, Navigate } from "react-router";
import { createPet } from "../services/petService";

export default function AddPet({ userData }) {
    const navigate = useNavigate();
    const createHandler = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const { name, description, imageUrl, type } = Object.fromEntries(form);

        try {
            const res = await createPet(userData.user.userId, { name, description, imageUrl, type });
            navigate(`/pet/${res._id}`);
        }
        catch {
            alert('You have to be logged in in order to create a post.');
            navigate('/login');
        }

    }

    return (
        userData.isAuthenticated
            ?
            <section id="create-page" className="create">
                <form id="create-form" method="POST" onSubmit={createHandler}>
                    <fieldset>
                        <legend>Add new Pet</legend>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span className="input">
                                <input type="text" name="name" id="name" placeholder="Name" />
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="description">Description</label>
                            <span className="input">
                                <textarea name="description" id="description" placeholder="Description"></textarea>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="image">Image</label>
                            <span className="input">
                                <input type="text" name="imageUrl" id="image" placeholder="Image" />
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="type">Type</label>
                            <span className="input">
                                <select id="type" name="type">
                                    <option value="cat">Cat</option>
                                    <option value="dog">Dog</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="reptile">Reptile</option>
                                    <option value="other">Other</option>
                                </select>
                            </span>
                        </p>
                        <input className="button submit" type="submit" value="Add Pet" />
                    </fieldset>
                </form>
            </section>

            : <Navigate to='/login' replace={true} />
    )
}