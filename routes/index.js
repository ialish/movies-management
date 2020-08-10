const express = require('express');
const router = express.Router();

const getShows = require('../models/showsData');

router.get('/', async function(req, res, next) {
	// res.render('index', { title: 'Express' });
	let shows = await getShows();
	shows = shows.data;

	const currentDate = moment().format('DD-MM-YYYY');

	res.send(currentDate);
});

module.exports = router;
