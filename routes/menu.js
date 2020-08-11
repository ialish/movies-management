const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		res.render('menu', { admin: req.session.admin });
	};
});

module.exports = router;
