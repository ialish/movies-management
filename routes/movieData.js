const express = require('express');
const router = express.Router();

const getMovie = require('../controllers/movie/getMovie');
const getMovies = require('../models/readJSON');
const updateUser = require('../controllers/user/updateUser');

router.get('/:movieId', async function(req, res, next) {
	const sess = req.session;
	if (!sess.admin && !sess.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else if (sess.user && sess.user.numOfTransactions.today <= 0) {
		const message = 'You have no more credits left today';
		res.render('alert', { message });
	} else {
		const movieId = parseInt(req.params.movieId);
		let movie = {};

		if (movieId < 250) {
			movie = await getMovie(movieId);
		} else {
			const filename = 'data/newMovies.json';
			const movies = await getMovies(filename);
			movie = movies.find(movie => movie.id === movieId);
		};

		if (sess.user) {
			--sess.user.numOfTransactions.today;
			updateUser(sess.user.username, sess.user);
			res.render('movieData', { movie });
		} else { // Admin
			res.render('movieData', { movie });
		};
	};
});

module.exports = router;
