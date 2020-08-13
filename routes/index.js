const express = require('express');
const router = express.Router();

const checkCredentials = require('../controllers/checkCredentials');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login', async function(req, res, next) {
	await checkCredentials(req);
	if (req.session.admin) {
		res.redirect('menu');
	} else if (req.session.user) {
		if (req.session.user.numOfTransactions > 0) {
			res.redirect('menu');
		} else {
			const message = 'You have no more credits left today';
			res.render('alert', { message });
		}
	} else {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	};
});

module.exports = router;
