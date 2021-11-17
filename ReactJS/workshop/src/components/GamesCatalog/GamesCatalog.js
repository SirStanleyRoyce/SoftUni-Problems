import { useEffect, useState } from 'react';
import { getAll } from '../../services/gameService';
import GameCard from './GameCard'

export default function GamesCatalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function asyncSetGames() {
            setGames(await getAll());
        }
        asyncSetGames();
    }, [])

    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {games.map(x => <GameCard key={x._id} game={x} />)
                || <h3 className="no-articles">No articles yet</h3>}

        </section>
    );
}