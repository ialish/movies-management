const getUsers = require('../models/readJSON');

const checkCredentials = async (req) => {
	const filename = 'data/users.json';
	const users = await getUsers(filename);
	const username = req.body.username;
	const password = req.body.password;
	const sess = req.session;
	
	if (users[0].username === username && users[0].password === password) {
		delete sess.user;
		sess.admin = users[0];
	} else {
		delete sess.admin;
		sess.user = users.find(user => { 
			return user.username === username && user.password === password;
		});
	};
};

module.exports = checkCredentials;
