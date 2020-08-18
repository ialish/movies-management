const getMovies = require('../models/readJSON');
const getShows = require('../models/showsData');

const getAllMovies = async () => {
	const filename = 'data/newMovies.json';
	const movies = await getMovies(filename);
	let shows = await getShows();

	shows = shows.data.map(({ id, name, language, genres }) => {
		return { id, name, language, genres };
	});
	
	return [...shows, ...movies];
};

module.exports = getAllMovies;
