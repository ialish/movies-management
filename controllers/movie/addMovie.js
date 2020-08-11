const getMovies = require('../../models/readJSON');
const setMovies = require('../../models/writeJSON');
const getShows = require('../../models/showsData');

const addMovie = async (movieObj) => {
	const filename = 'data/newMovies.json';
	let movies = await getMovies(filename);
	let id = 0;

	if (!movies.length) {
		let shows = await getShows();
		shows = shows.data;
		id = shows[shows.length - 1].id + 1;
	} else {
		id = movies[movies.length - 1].id + 1;
	}

	movieObj = { id, ...movieObj};
	movies.push(movieObj);
	await setMovies(filename, movies);
};

module.exports = addMovie;
