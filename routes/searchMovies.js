const express = require('express');
const router = express.Router();

const getPropUniqueValues = require('../controllers/getPropUniqueValues');
const getAllMovies = require('../controllers/getAllMovies');
const getMatchedMovies = require('../controllers/getMatchedMovies');
const getMoviesByGenre = require('../controllers/getMoviesByGenre');

router.get('/', async function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const languages = await getPropUniqueValues('language');
		const genres = await getPropUniqueValues('genres');
		res.render('searchMovies', { languages, genres });
	}
});

router.post('/results', async function(req, res, next) {
	// if (!req.session.admin && !req.session.user) {
	// 	const message = 'Unauthorized Access';
	// 	res.render('alert', { message });
	// } else {
		const allMovies = await getAllMovies();
		const movie = {
			name: req.body.name,
			language: req.body.language,
			genre: req.body.genre
		}
		const matchedMovies = await getMatchedMovies(allMovies, movie);
		const moviesByGenre = await getMoviesByGenre(allMovies, matchedMovies);
		
		res.render('searchResults', { matchedMovies });
	// };
});

module.exports = router;
