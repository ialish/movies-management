const express = require('express');
const router = express.Router();

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/deleteUser');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');

router.get('/', async function(req, res, next) {
	const filename = 'data/users.json';
	const users = await getUsers(filename);
	res.render('users', { users });
});

// Delete user
router.get('/delete/:username', function(req, res, next) {
	const filename = 'data/users.json';
	const username = req.params.username;
	deleteUser(filename, username);
	res.redirect('/users');
});

// Update user
router.get('/user/:username', async function(req, res, next) {
	const filename = 'data/users.json';
	const username = req.params.username;
	const user = await getUser(filename, username);
	res.render('user', { user, button: "Update", route: "update" });
});

router.post('/user/update/:username', function(req, res, next) {
	const filename = 'data/users.json';
	const username = req.params.username;
	const user = {
		username: req.body.username,
		password: req.body.password,
		cratedDate: req.body.cratedDate,
		numOfTransactions: req.body.numOfTransactions
	};
	updateUser(filename, username, user);
	res.redirect('/users');
});

// Add new user
router.get('/user', function(req, res, next) {
	const user = {};
	res.render('user', { user, button: "Save", route: "add" });
});

router.post('/user/add', function(req, res, next) {
	const filename = 'data/users.json';
	const user = {
		username: req.body.username,
		password: req.body.password,
		cratedDate: req.body.cratedDate,
		numOfTransactions: req.body.numOfTransactions
	};
	addUser(filename, user);
	res.redirect('/users');
});

module.exports = router;
