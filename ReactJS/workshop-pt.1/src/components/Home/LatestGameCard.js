export default function LatestGameCard({ game, viewHandler }) {
    const onDetailsClick = (e) => {
        e.preventDefault();

        viewHandler(`/details/${game._id}`);
    }

    return (
        <div className="game">
            <div className="image-wrap">
                <img src={game.imageUrl} alt="" />
            </div>
            <h3>{game.title}</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <a href={`/details/${game._id}`} onClick={onDetailsClick} className="btn details-btn">Details</a>
            </div>
        </div>
    );
}