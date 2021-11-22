import { Link } from "react-router-dom"

export default function PetCard({ pet }) {
    return (
        <li class="otherPet">
            <h3>Name: {pet.name}</h3>
            <p>Type: {pet.type}</p>
            <p class="img"><img src={pet.imageUrl} /></p>
            <Link class="button" to={`/details/${pet._id}`}>Details</Link>
        </li>
    )
}