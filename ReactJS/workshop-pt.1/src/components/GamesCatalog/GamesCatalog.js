import { useEffect, useState } from 'react';
import { getAll } from '../../services/gameService';
import GameCard from './GameCard'

export default function GamesCatalog({ viewHandler }) {
    const [games, setGames] = useState([]);

    useEffect(async () => {
        setGames(await getAll())
    }, [])
    return (
        <section id="catalog-page">
            <h1>All Games</h1>

            {games.map(x => <GameCard key={x._id} game={x} viewHandler={viewHandler} />)
                || <h3 className="no-articles">No articles yet</h3>}

        </section>
    );
}