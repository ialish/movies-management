const jsonfile = require('jsonfile');

const setData = (fileName, obj) => {
	return new Promise((resolve) => {
		jsonfile.writeFile(__dirname + '/../' + fileName, obj, (err) => {
			if (err) throw err;
		});
	});
};

module.exports = setData;