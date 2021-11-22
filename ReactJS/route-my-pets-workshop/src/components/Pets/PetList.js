import PetCard from "./PetCard";

export default function PetList({ pets, listClass }) {
    return (
        <ul class={listClass}>
            {pets.map(pet => <PetCard key={pet._id} pet={pet} />) || <p class="no-pets">No pets in database!</p>}
        </ul>
    )
}