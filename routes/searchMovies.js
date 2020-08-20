const express = require('express');
const router = express.Router();

const getPropUniqueValues = require('../controllers/getPropUniqueValues');
const getAllMovies = require('../controllers/getAllMovies');
const getMatchedMovies = require('../controllers/getMatchedMovies');
const arrangeMoviesByGenre = require('../controllers/arrangeMoviesByGenre');
const pairMovieToMoviesByGenre = require('../controllers/pairMovieToMoviesByGenre');
const updateUser = require('../controllers/user/updateUser');

router.get('/', async function(req, res, next) {
	const sess = req.session;
	if (!sess.admin && !sess.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else if (sess.user && sess.user.numOfTransactions.today <= 0) {
		const message = 'You have no more credits left today';
		res.render('alert', { message });
	} else {
		const languages = await getPropUniqueValues('language');
		const genres = await getPropUniqueValues('genres');
		res.render('searchMovies', { languages, genres });
	}
});

router.route('/results')
	.post(async function(req, res, next) {
		const sess = req.session;
		if (!sess.admin && !sess.user) {
			const message = 'Unauthorized Access';
			res.render('alert', { message });
		} else {
			const movie = {
				name: req.body.name,
				language: req.body.language,
				genre: req.body.genre
			};
			const allMovies = await getAllMovies();		
			const matchedMovies = await getMatchedMovies(allMovies, movie);
			const moviesByGenre = arrangeMoviesByGenre(allMovies);

			sess.searchResult = pairMovieToMoviesByGenre(matchedMovies, moviesByGenre);

			if (sess.user) {
				--sess.user.numOfTransactions.today;
				updateUser(sess.user.username, sess.user);
				res.redirect('/search-movies/results');
			} else { // Admin
				res.redirect('/search-movies/results');
			};
		};
	})
	.get(function(req, res, next) {
		const sess = req.session;
		if (!sess.admin && !sess.user) {
			const message = 'Unauthorized Access';
			res.render('alert', { message });
		} else if (sess.user && sess.user.numOfTransactions.today <= 0) {
			const message = 'You have no more credits left today';
			res.render('searchResults', { message, searchResult: sess.searchResult });
		} else {
			res.render('searchResults', { message: '', searchResult: sess.searchResult });
		};
	});

module.exports = router;
