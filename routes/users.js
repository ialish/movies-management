const express = require('express');
const router = express.Router();

const getUsers = require('../models/readJSON');
const deleteUser = require('../controllers/deleteUser');

router.get('/', async function(req, res, next) {
	const users = await getUsers('data/users.json');
	res.render('users', { users });
});

router.delete('/delete/:username', async function(req, res, next) {
	await deleteUser('data/users.json', req.params.username);
	res.redirect('/users');
});

router.put('/update', function(req, res, next) {
	
});

router.post('/add', function(req, res, next) {
	
});

module.exports = router;
