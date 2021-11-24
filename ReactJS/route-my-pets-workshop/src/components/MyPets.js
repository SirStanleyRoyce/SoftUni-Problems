import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getByUser } from '../services/petService';
import PetList from './Pets/PetList';

export default function MyPets() {
    const params = useParams();

    const [pets, setPets] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setPets(await getByUser(params.userId || sessionStorage.getItem('userId')))
        }
        fetchData();
    }, [params.userId])

    return (
        <section id="my-pets-page" className="my-pets">
            <h1>My Pets</h1>
            <PetList pets={pets} listClass="my-pets-list" />
        </section>
    )
}