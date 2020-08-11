const getUsers = require('../models/readJSON');

const checkCredentials = async (req) => {
	const filename = 'data/users.json';
	const users = await getUsers(filename);
	const username = req.body.username;
	const password = req.body.password;
	const sess = req.session;
	
	if (users[0].username === username && users[0].password === password) {
		sess.admin = true;
	} else {
		users.forEach(user => {
			if (user.username === username && user.password === password) {
				sess.user = true;
				sess.numOfTransactions = user.numOfTransactions;
			};
		});
	};
};

module.exports = checkCredentials;
