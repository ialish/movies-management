const express = require('express');
const router = express.Router();

const getPropUniqueValues = require('../controllers/getPropUniqueValues');
const getAllMovies = require('../controllers/getAllMovies');
const getMatchedMovies = require('../controllers/getMatchedMovies');
const arrangeMoviesByGenre = require('../controllers/arrangeMoviesByGenre');
const pairMovieToMoviesByGenre = require('../controllers/pairMovieToMoviesByGenre');

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
		const movie = {
			name: req.body.name,
			language: req.body.language,
			genre: req.body.genre
		}
		const allMovies = await getAllMovies();
		const matchedMovies = await getMatchedMovies(allMovies, movie);
		const moviesByGenre = arrangeMoviesByGenre(allMovies);
		const movieSearchResultObj = pairMovieToMoviesByGenre(matchedMovies, moviesByGenre);
		
		res.render('searchResults', { movieSearchResultObj });
	// };
});

module.exports = router;
