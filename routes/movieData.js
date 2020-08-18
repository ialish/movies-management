const express = require('express');
const router = express.Router();

const getMovie = require('../controllers/movie/getMovie');
const getMovies = require('../models/readJSON');

router.get('/:movieId', async function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
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
		res.render('movieData', { movie });
	};
});

module.exports = router;
