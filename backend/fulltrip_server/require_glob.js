module.exports = (express, app) => {
	var glob = require('glob')
	var path = require('path')

	glob.sync('./routes/**/*.js').forEach(function (file) {
		require(path.resolve(file))(express, app);
	});
};