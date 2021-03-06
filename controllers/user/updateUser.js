const getUsers = require('../../models/readJSON');
const setUsers = require('../../models/writeJSON');

const updateUser = async (username, userObj) => {
	const filename = 'data/users.json';
	let users = await getUsers(filename);
	const index = users.findIndex(user => user.username === username);
	users[index] = userObj;
	await setUsers(filename, users);
};

module.exports = updateUser;
