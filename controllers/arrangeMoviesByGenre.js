const arrangeMoviesByGenre = (allMovies) => {
	const moviesByGenre = {};

	allMovies.forEach(movie => {
		movie.genres.foreach(genre => {
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
