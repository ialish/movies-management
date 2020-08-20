const express = require('express');
const router = express.Router();

const moment = require('moment');

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/user/deleteUser');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');
const addUser = require('../controllers/user/addUser');

router.get('/', async function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const filename = 'data/users.json';
		const users = await getUsers(filename);
		res.render('users', { users });
	};
});

// Delete user
router.get('/delete/:username', function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const username = req.params.username;
		deleteUser(username);
		res.redirect('/users');
	};
});

// Update user
router.get('/user/:username', async function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const username = req.params.username;
		const user = await getUser(username);
		res.render('user', { user, button: "Update", route: "update" });
	};
});

router.post('/user/update/:username', function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const username = req.params.username;
		const user = {
			username: req.body.username,
			password: req.body.password,
			date: {
				created: req.body.createdDate,
				lastLogin: req.body.lastLogin
			},
			numOfTransactions: {
				eachDay: req.body.eachDay,
				today: req.body.today
			}
		};
		updateUser(username, user);
		res.redirect('/users');
	};
});

// Add new user
router.get('/user', function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const currentDate = moment().format('DD-MM-YYYY');
		const user = { currentDate };
		res.render('user', { user, button: "Save", route: "add" });
	};
});

router.post('/user/add', function(req, res, next) {
	if (!req.session.admin) {
		const message = 'Unauthorized Access';
		res.render('alert', { message });
	} else {
		const user = {
			username: req.body.username,
			password: req.body.password,
			date: {
				created: req.body.currentDate,
				lastLogin: req.body.currentDate
			},
			numOfTransactions: {
				eachDay: req.body.numOfTransactions,
				today: req.body.numOfTransactions
			}
		};
		addUser(user);
		res.redirect('/users');
	};
});

module.exports = router;
