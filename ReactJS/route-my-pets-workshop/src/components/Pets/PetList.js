import PetCard from "./PetCard";

export default function PetList({ pets, listClass }) {
    return (
        <ul className={listClass}>
            {pets.length > 0
                ? pets.map(pet => <PetCard key={pet._id} pet={pet} />)
                : <p className="no-pets">No pets in database!</p>}
        </ul>
    )
}