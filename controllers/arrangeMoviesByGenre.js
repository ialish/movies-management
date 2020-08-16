const arrangeMoviesByGenre = (allMovies) => {
	const moviesByGenre = {};

	allMovies.map(movie => {
		movie.genres.map(genre => {
			if (!moviesByGenre[genre]) {
				moviesByGenre[genre] = [movie];
			} else {
				moviesByGenre[genre].push(movie);
			};
		});
	});
	
	return moviesByGenre;
};

module.exports = arrangeMoviesByGenre;
