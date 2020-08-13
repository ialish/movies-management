const express = require('express');
const router = express.Router();

const getPropUniqueValues = require('../controllers/getPropUniqueValues');
const getMoviesRelated = require('../controllers/getMoviesRelated');

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
		const moviesRelated = await getMoviesRelated(movie);
		
		res.render('searchResults', { moviesRelated });
	// };
});

module.exports = router;
