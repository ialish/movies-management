const getMovies = require('../models/readJSON');
const getShows = require('../models/showsData');

const getMatchedMovies = async (movieObj) => {
	const filename = 'data/newMovies.json';
	const movies = await getMovies(filename);
	let shows = await getShows();
	shows = shows.data;
	const allMovies = [...movies, ...shows];
	const movieName = movieObj.name.toLowerCase();

	const moviesRelated = allMovies.filter(movie => 
		movie.name.toLowerCase().includes(movieName) &&
		movie.language.includes(movieObj.language) &&
		(movie.genres.includes(movieObj.genre) || movieObj.genre === '')
	);
	
	return moviesRelated;
};

module.exports = getMatchedMovies;