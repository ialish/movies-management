const express = require('express');
const router = express.Router();

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/deleteUser');

router.get('/', async function(req, res, next) {
	const filename = 'data/users.json';
	const users = await getUsers(filename);
	res.render('users', { users });
});

router.get('/delete/:username', function(req, res, next) {
	const filename = 'data/users.json';
	const username = req.params.username;
	deleteUser(filename, username);
	res.redirect('/users');
});

router.get('/update', function(req, res, next) {
	
});

router.get('/add', function(req, res, next) {
	
});

module.exports = router;
