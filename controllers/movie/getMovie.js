const getMovies = require('../../models/readJSON');
const getShows = require('../../models/showsData');

const getMovie = async (movieId) => {
	let show = await getShows(movieId);
	show = show.data;	
	if (show) { return show };
	
	const filename = 'data/newMovies.json';
	const movies = await getMovies(filename);
	const movie = movies.find(movie => movie.id === movieId);
	return movie;
};

module.exports = getMovie;
