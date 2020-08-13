const getMatchedMovies = async (allMovies, movieObj) => {
	const movieName = movieObj.name.toLowerCase();

	const matchedMovies = allMovies.filter(movie => 
		movie.name.toLowerCase().includes(movieName) &&
		movie.language.includes(movieObj.language) &&
		(movie.genres.includes(movieObj.genre) || movieObj.genre === '')
	);
	
	return matchedMovies;
};

module.exports = getMatchedMovies;
