import {changeView, section} from './app.js';

let movies, moviesArr, moviePages, start, end, selected;

export async function setMovies() {
    const movieSection = section.homePage.movie.querySelector('.card-deck.d-flex.justify-content-center');

    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();

    let movies = Object.values(data);
    let pagesNum = movies.length / 6;
    const pagesNumRemainder = pagesNum % 1;
    const pagesNumNoRemainder = Math.floor(pagesNum);

    if (pagesNumRemainder > 0) pagesNum = Number(pagesNumNoRemainder) + 1;

    let moviePages = Array(pagesNum).fill(1).map((a, b) => b + 1);
    let start = 0;
    let end = 6;

    let selected = 1;

    movieSection.innerHTML = '';

    moviesArr = [];

    movies.forEach(m =>
        moviesArr.push(`
        <div class="card mb-4">
            <img class="card-img-top" src="${m.img}"
                alt="Card image cap" width="400">
            <div class="card-body">
                <h4 class="card-title">${m.title}</h4>
            </div>
            <div class="card-footer">
            <button value="${m._id}" type="button" class="btn btn-info">Details</button>
            </div>
        </div>`)
    )
    viewPagination();
    viewPageMovies();

    function viewPageMovies() {
        movieSection.innerHTML = moviesArr.slice(start, end).join('');
    }

    function viewPagination() {
        function goPrevious() {
            if (selected != 1) {
                start -= 6;
                end -= 6;
                selected--;
                viewPageMovies();
                viewPagination();
            }
        }

        function goNext() {
            if (selected < moviePages.length) {
                start += 6;
                end += 6;
                selected++;
                viewPageMovies();
                viewPagination();
            }
        }

        document.getElementById('paging').innerHTML = `
        <li class="page-item"><a class="page-link" href="javascript:void(0)" id="previousPage">Previous</a></li>
        <li class="page-item"><span class="page-link"> ${selected} | ${moviePages.length} </span></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)" id="nextPage">Next</a></li>
        `
        document.getElementById('previousPage').addEventListener('click', goPrevious);
        document.getElementById('nextPage').addEventListener('click', goNext);
    }
}


//once opened movie details, movieId get a value, which I use in all other movie detail functions
let movieId;

async function updateLikes(movieId) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
    return await response.json();
}

let hasLiked = [];

export async function getMovieDetails(ev) {
    //ev.target is the details button, where I store the id of the target movie
    movieId = ev.target.value;

    const response = await fetch('http://localhost:3030/data/movies/' + movieId)
    const data = await response.json();

    if (data._ownerId !== sessionStorage.getItem('userId') && sessionStorage.getItem('userId') != null) {
        document.querySelector('.delBtn').style.display = 'none';
        document.querySelector('.editBtn').style.display = 'none';
        document.querySelector('.likeBtn').style.display = 'inline';
    } else if (sessionStorage.getItem('userId') != null) {
        document.querySelector('.likeBtn').style.display = 'none';
        document.querySelector('.delBtn').style.display = 'inline';
        document.querySelector('.editBtn').style.display = 'inline';
    } else {
        document.querySelector('.delBtn').style.display = 'none';
        document.querySelector('.editBtn').style.display = 'none';
        document.querySelector('.likeBtn').style.display = 'none';
    }

    section.movieExample.el.querySelector('h1').textContent = `Movie title: ${data.title}`;
    section.movieExample.el.querySelector('img').src = data.img;
    section.movieExample.el.querySelector('p').textContent = data.description;
    section.movieExample.el.querySelector('span').textContent = ` ${await updateLikes(movieId)} likes`;

    if (hasLiked.some(x => x.user === sessionStorage.getItem('userId') & x.movieId === movieId)) {
        document.querySelector('.likeBtn').textContent = 'Dislike';
        document.querySelector('.likeBtn').style.backgroundColor = '#ff3300';
    } else {
        document.querySelector('.likeBtn').textContent = 'Like';
        document.querySelector('.likeBtn').style.backgroundColor = '#007bff';
    }

    changeView('movieExample');
}

export async function like_dislike() {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${sessionStorage.getItem('userId')}%22`);
    const ownLikes = await response.json();
    if (ownLikes.length === 1) {
        await fetch(`http://localhost:3030/data/likes/${ownLikes[0]._id}`, {
            method: 'DELETE',
            headers: {'X-Authorization': sessionStorage.getItem('authToken')}
        });
        hasLiked.splice(hasLiked.indexOf(hasLiked.find(x => x.user === sessionStorage.getItem('userId') & x.movieId === movieId)), 1);
        document.querySelector('.likeBtn').textContent = 'Like';
        document.querySelector('.likeBtn').style.backgroundColor = '#007bff';

    } else {
        await fetch('http://localhost:3030/data/likes', {
                method: 'POST',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({movieId})
            }
        )
        hasLiked.push({user: sessionStorage.getItem('userId'), movieId: movieId});
        document.querySelector('.likeBtn').textContent = 'Dislike';
        document.querySelector('.likeBtn').style.backgroundColor = '#ff3300';
    }

    section.movieExample.el.querySelector('span').textContent = `${await updateLikes(movieId)} likes`;
}

export async function addMovie(ev) {
    ev.preventDefault();

    const form = new FormData(ev.target);
    const [title, description, img] = [form.get('title').trim(), form.get('description').trim(), form.get('imageUrl').trim()];

    if (!title || !description || !img) return alert('Invalid input!');

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify({_ownerId: sessionStorage.getItem('userId'), title, description, img,})
    })
    if (!response.ok) return alert('Could not add movie...');

    ev.target.reset();
    await setMovies();
    changeView('homePage');
}

export async function getEditData() {
    const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
        method: 'GET',
        headers: {'X-Authorization': sessionStorage.getItem('authToken')}
    });
    const data = await response.json();
    section.editMovie.el.querySelector('input[name="title"]').value = data.title;
    section.editMovie.el.querySelector('textarea[name="description"]').value = data.description;
    section.editMovie.el.querySelector('input[name="imageUrl"]').value = data.img;
}

export async function editMovie(ev) {
    ev.preventDefault();

    const form = new FormData(ev.target);
    const [title, description, img] = [form.get('title').trim(), form.get('description').trim(), form.get('imageUrl').trim()];

    if (!title || !description || !img) return alert('Invalid input!');

    console.log(movieId)
    const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify({title, description, img})
    })
    if (!response.ok) return alert('Could not edit movie...');

    ev.target.reset();
    await setMovies();
    changeView('homePage');
}

export async function deleteMovie() {
    const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
        method: 'DELETE',
        headers: {'X-Authorization': sessionStorage.getItem('authToken')}
    })
    if (!response.ok) return alert(response.message);

    await setMovies();
    changeView('homePage')
}