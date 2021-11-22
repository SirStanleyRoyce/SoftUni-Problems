import { useState, useEffect } from 'react';

import { getAll } from '../services/petService';
import PetList from './Pets/PetList';

export default function Dashboard() {
    const [pets, setPets] = useState([]);

    useEffect(async () => {
        setPets(await getAll());
    })

    return (
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <PetList pets={pets} listClass="other-pets-list" />
        </section>
    )
}