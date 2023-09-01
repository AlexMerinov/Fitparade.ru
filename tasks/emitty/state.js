const state = {
	isWatchMode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
	watch: {},
};

module.exports = state;
