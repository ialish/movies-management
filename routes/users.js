const express = require('express');
const router = express.Router();

const moment = require('moment');

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/deleteUser');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');
const addUser = require('../controllers/addUser');

router.get('/', async function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const filename = 'data/users.json';
		const users = await getUsers(filename);
		res.render('users', { users });
	};
});

// Delete user
router.get('/delete/:username', function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const username = req.params.username;
		deleteUser(username);
		res.redirect('/users');
	};
});

// Update user
router.get('/user/:username', async function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const username = req.params.username;
		const user = await getUser(username);
		res.render('user', { user, button: "Update", route: "update" });
	};
});

router.post('/user/update/:username', function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const username = req.params.username;
		const user = {
			username: req.body.username,
			password: req.body.password,
			createdDate: req.body.createdDate,
			numOfTransactions: req.body.numOfTransactions
		};
		updateUser(username, user);
		res.redirect('/users');
	};
});

// Add new user
router.get('/user', function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const currentDate = moment().format('DD-MM-YYYY');
		const user = { createdDate: currentDate };
		res.render('user', { user, button: "Save", route: "add" });
	};
});

router.post('/user/add', function(req, res, next) {
	if (!req.session.admin) {
		res.send('<h1>Unauthorized Access</h1>');
	} else {
		const user = {
			username: req.body.username,
			password: req.body.password,
			createdDate: req.body.createdDate,
			numOfTransactions: req.body.numOfTransactions
		};
		addUser(user);
		res.redirect('/users');
	};
});

module.exports = router;
