const pairMovieToMoviesByGenre = (moviesObj, moviesByGenre) => {
	moviesObj.map(movie => {
		let uniqueMoviesWithSameGenre = new Set();
		movie.genres.map((genre) => {
			moviesByGenre[genre].map(({ id, name }) => {
				if (id !== movie.id) {
					uniqueMoviesWithSameGenre.add({ id, name });
				}
			});
		});
		movie.moviesWithSameGenre = [...uniqueMoviesWithSameGenre];
	});
	
	return moviesObj;
};

module.exports = pairMovieToMoviesByGenre;
