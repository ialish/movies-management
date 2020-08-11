const express = require('express');
const router = express.Router();

const addMovie = require('../controllers/movie/addMovie');

router.get('/', function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		res.render('createMovie');
	}
});

router.post('/add', function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const movie = {
			name: req.body.name,
			language: req.body.language,
			genres: req.body.genres.split(", ")
		};
		addMovie(movie);
		res.redirect('/menu');
	};
});

module.exports = router;
