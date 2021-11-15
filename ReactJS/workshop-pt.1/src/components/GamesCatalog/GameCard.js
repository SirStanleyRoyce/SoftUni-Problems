export default function GameCard({ game, viewHandler }) {
    const onDetailsClick = (e) => {
        e.preventDefault();

        viewHandler(`/details/${game._id}`);
    }

    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} alt="" />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <a href={`/details/${game._id}`} onClick={onDetailsClick} className="details-button">Details</a>
            </div>
        </div>
    );
}