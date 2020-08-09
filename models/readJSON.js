const jsonfile = require('jsonfile');

const getData = (filename) => {
	return new Promise((resolve) => {
		jsonfile.readFile(__dirname + '/../' + filename, (err, obj) => {
			if (err) throw err;
			resolve(obj);
		});
	});
};

module.exports = getData;
