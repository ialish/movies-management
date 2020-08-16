const express = require('express');
const router = express.Router();

const getMovie = require('../controllers/movie/getMovie');

router.get('/:movieId', async function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const movieId = req.params.movieId;
		const movie = await getMovie(movieId);
		res.render('movieData', { movie });
	};
});

module.exports = router;
