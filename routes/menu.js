const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.session.admin && !req.session.user) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		res.render('menu', { admin: req.session.admin });
	};
});

module.exports = router;
