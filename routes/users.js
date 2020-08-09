const express = require('express');
const router = express.Router();

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/deleteUser');

router.get('/', async function(req, res, next) {
	const filename = 'data/users.json';
	const users = await getUsers(filename);

	res.render('users', { users });
});

router.delete('/delete/:username', function(req, res, next) {
	const filename = 'data/users.json';
	const username = req.params.username;

	deleteUser(filename, username);
	res.redirect('/users');
});

router.put('/update', function(req, res, next) {
	
});

router.post('/add', function(req, res, next) {
	
});

module.exports = router;
