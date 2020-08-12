const express = require('express');
const router = express.Router();

const getPropUniqueValues = require('../controllers/getPropUniqueValues');

router.get('/', async function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const languages = await getPropUniqueValues('language');
		console.log(languages)
		const genres = await getPropUniqueValues('genres');
		console.log(genres)
		res.render('searchMovies');
	}
});

module.exports = router;
