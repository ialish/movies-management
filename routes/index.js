const express = require('express');
const router = express.Router();

const moment = require('moment');
const checkCredentials = require('../controllers/checkCredentials');
const updateUser = require('../controllers/user/updateUser');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login', async function(req, res, next) {
	const currentDate = moment().format('DD-MM-YYYY');
	
	await checkCredentials(req);
	const sess = req.session;

	if (sess.admin) {
		res.redirect('menu');
	} else if (sess.user) {
		if (sess.user.date.lastLogin !== currentDate) {
			sess.user.date.lastLogin = currentDate;
			sess.user.numOfTransactions.today = sess.user.numOfTransactions.eachDay;
			updateUser(sess.user.username, sess.user);
		};
		if (sess.user.numOfTransactions.today > 0) {
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
