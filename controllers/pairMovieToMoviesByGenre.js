const pairMovieToMoviesByGenre = (moviesObj, moviesByGenre) => {
	moviesObj.map(movie => {
		let uniqueMoviesWithSameGenre = new Set();
		movie.genres.map((genre) => {
			moviesByGenre[genre].map(mov => {
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
