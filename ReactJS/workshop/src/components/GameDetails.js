import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { getOne, getComments } from "../services/gameService";

export default function GameDetails({ match }) {
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const [isValidGameId, setGameIdValidity] = useState(true);

    const gameId = match.params.gameId;

    useEffect(() => {
        let gameDetails, gameComments;

        async function asyncSetData() {
            gameDetails = await getOne(gameId);
            gameComments = await getComments(gameId);

            if (gameDetails.hasOwnProperty('code')) {
                console.error('Game not found.')
                setGameIdValidity(false);
            }

            if (isValidGameId) {
                setGame(gameDetails);
                setComments(gameComments);
            }
        }
        asyncSetData();

    }, [])

    return (
        isValidGameId ?
            <section id="game-details">
                <h1>Game Details</h1>
                <div className="info-section">

                    <div className="game-header">
                        <img className="game-img" src={game.imageUrl} alt={`${game.title} image`} />
                        <h1>{game.title}</h1>
                        <span className="levels">MaxLevel: {game.maxLevel}</span>
                        <p className="type">{game.category}</p>
                    </div>

                    <p className="text">
                        {game.summary}
                    </p>

                    <div className="details-comments">
                        <h2>Comments:</h2>
                        {
                            comments.length > 0 ?
                                <ul>
                                    {comments.map(x =>
                                        <li className="comment">
                                            <p>Content: {x.content}</p>
                                        </li>
                                    )}
                                </ul>
                                : <p className="no-comment">No comments.</p>
                        }

                    </div>

                    <div className="buttons">
                        <a href={`/edit-game/${gameId}`} className="button">Edit</a>
                        <a href={`/delete-game/${gameId}`} className="button">Delete</a>
                    </div>
                </div>

                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form">
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>

            </section >

            : <Redirect to={{ pathname: '/404', state: { object: 'Game' } }} />
    );
}