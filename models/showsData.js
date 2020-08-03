const axios = require('axios');

const getShows = () => {
	const url = `https://api.tvmaze.com/shows`;
	return axios.get(url);
};

module.exports = getShows;