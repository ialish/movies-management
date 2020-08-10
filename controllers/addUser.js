const getUsers = require('../models/readJSON');
const setUsers = require('../models/writeJSON');

const addUser = async (filename, userObj) => {
	let users = await getUsers(filename);
	users = users.filter(user => user.username !== username);
	await setUsers(filename, users);
};

module.exports = addUser;
