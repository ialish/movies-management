const getMovies = require('../models/readJSON');
const getShows = require('../models/showsData');

const getPropUniqueValues = async (property) => {
	const filename = 'data/newMovies.json';
	const movies = await getMovies(filename);
	let shows = await getShows();
	shows = shows.data;
	const allPropValues = [...movies, ...shows].map(movie => movie[property]).flat();
	
	const uniqueValues = new Set();

	allPropValues.forEach(propVal => uniqueValues.add(propVal));

	return [...uniqueValues].sort();
};

module.exports = getPropUniqueValues;
