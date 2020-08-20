const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	const sess = req.session;
	if (!sess.admin && !sess.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else if (sess.user && sess.user.numOfTransactions.today <= 0) {
		const message = 'You have no more credits left today';
		res.render('alert', { message });
	} else {
		res.render('menu', { admin: sess.admin });
	};
});

module.exports = router;
