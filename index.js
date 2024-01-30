document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');

    function fetchMovies() {
        fetch('http://localhost:3000/films')
            .then(response => response.json())
            .then(films => {
                films.forEach(film => {
                    const listItem = document.createElement('li');
                    listItem.textContent = film.title;
                    listItem.addEventListener('click', () => displayMovieDetails(film.id));
                    filmsList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    function displayMovieDetails(movieId) {
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                const { poster, title, runtime, showtime, capacity, tickets_sold } = movie;

                movieDetails.innerHTML = `
                    <img src="${poster}" alt="${title} Poster">
                    <h2>${title}</h2>
                    <p>Runtime: ${runtime} mins</p>
                    <p>Showtime: ${showtime}</p>
                    <p>Available Tickets: ${capacity - tickets_sold}</p>
                `;
            })
            .catch(error => console.error('Error fetching movie details:', error));
    }

    window.buyTicket = function(movieId) {
        const availableTickets = parseInt(movieDetails.querySelector('p:last-child').textContent.split(': ')[1]);

        if (availableTickets > 0) {
            const updatedTickets = availableTickets - 1;
            movieDetails.querySelector('p:last-child').textContent = `Available Tickets: ${updatedTickets}`;
        } else {
            alert('Sorry, the show is sold out.');
        }
    };
    
    fetchMovies();
});