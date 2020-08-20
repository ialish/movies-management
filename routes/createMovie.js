const express = require('express');
const router = express.Router();

const addMovie = require('../controllers/movie/addMovie');
const updateUser = require('../controllers/user/updateUser');

router.get('/', function(req, res, next) {
	const sess = req.session;
	if (!sess.admin && !sess.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else if (sess.user && sess.user.numOfTransactions.today <= 0) {
		const message = 'You have no more credits left today';
		res.render('alert', { message });
	} else {
		res.render('createMovie');
	}
});

router.post('/add', function(req, res, next) {
	const sess = req.session;
	if (!sess.admin && !sess.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const movie = {
			name: req.body.name,
			language: req.body.language,
			genres: req.body.genres.split(", ")
		};
		addMovie(movie);
		if (sess.user) {
			--sess.user.numOfTransactions.today;
			updateUser(sess.user.username, sess.user);
			if (sess.user.numOfTransactions.today <= 0) {
				const message = 'You have no more credits left today';
				res.render('alert', { message });
			} else {
				res.redirect('/menu');
			};
		} else { // Admin
			res.redirect('/menu');
		};
	};
});

module.exports = router;
