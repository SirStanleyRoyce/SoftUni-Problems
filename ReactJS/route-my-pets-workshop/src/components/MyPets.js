import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import { getByUser } from '../services/petService';
import PetList from './Pets/PetList';

export default function MyPets() {
    const [pets, setPets] = useState([]);
    const { userId } = useMatch();

    useEffect(async () => {
        setPets(await getByUser(userId))
    })

    return (
        <section id="my-pets-page" class="my-pets">
            <h1>My Pets</h1>
            <PetList pets={pets} listClass="my-pets-list" />
        </section>
    )
}