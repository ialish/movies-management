const axios = require('axios');

const getShows = (id = '') => {
	let url = ``;

	if (id) {
		url = `https://api.tvmaze.com/shows/${id}`;
	} else {
		url = `https://api.tvmaze.com/shows`;
	}

	return axios.get(url);
};

module.exports = getShows;
