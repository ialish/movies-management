const getUsers = require('../models/readJSON');
const setUsers = require('../models/writeJSON');

const deleteUser = async (filename, username) => {
	let users = await getUsers(filename);
	users = users.filter(user => user.username !== username);
	await setUsers(filename, users);
};

module.exports = deleteUser;
