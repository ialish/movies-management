const getMovies = require('../models/readJSON');
const getShows = require('../models/showsData');

const getAllMovies = async () => {
	const filename = 'data/newMovies.json';
	const movies = await getMovies(filename);
	let shows = await getShows();
	shows = shows.data;
	
	return [...movies, ...shows];
};

module.exports = getAllMovies;
