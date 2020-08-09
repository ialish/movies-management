const getData = require('../models/readJSON');
const setData = require('../models/writeJSON');

const deleteUser = async (filename, username) => {
	let users = await getData(filename);

	users = users.filter(user => user.username !== username);

	await setData(filename, users);
};

module.exports = deleteUser;
