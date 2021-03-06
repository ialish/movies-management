const getUsers = require('../../models/readJSON');

const getUser = async (username) => {
	const filename = 'data/users.json';
	const users = await getUsers(filename);
	const user = users.find(user => user.username === username);
	return user;
};

module.exports = getUser;
