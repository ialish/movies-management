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
			res.send('<h1>You have no more credits left today</h1>');
		}
	} else {
		res.send('<h1>Unauthorized Access</h1>');
	};
});

module.exports = router;
