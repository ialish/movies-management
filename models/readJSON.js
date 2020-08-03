const jsonfile = require('jsonfile');

const getData = (fileName) => {
	return new Promise((resolve) => {
		jsonfile.readFile(__dirname + '/../' + fileName, (err, obj) => {
			if (err) throw err;
			resolve(obj);
		});
	});
};

module.exports = getData;