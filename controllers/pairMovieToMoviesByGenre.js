const pairMovieToMoviesByGenre = (moviesObj, moviesByGenre) => {
	moviesObj.forEach(movie => {
		let uniqueMoviesWithSameGenre = new Set();
		movie.genres.forEach((genre) => {
			moviesByGenre[genre].forEach(mov => {
				if (mov.id !== movie.id) {
					uniqueMoviesWithSameGenre.add(mov);
				}
			});
		});
		movie.moviesWithSameGenre = [...uniqueMoviesWithSameGenre];
	});
	
	return moviesObj;
};

module.exports = pairMovieToMoviesByGenre;
