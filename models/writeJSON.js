const jsonfile = require('jsonfile');

const setData = (filename, obj) => {
	return new Promise((resolve) => {
		jsonfile.writeFile(__dirname + '/../' + filename, obj, (err) => {
			if (err) throw err;
		});
	});
};

module.exports = setData;
