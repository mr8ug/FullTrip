module.exports = (express, app) => {
	var glob = require('glob')
	var path = require('path')

	glob.sync('./routes/**/*.js',{
		ignore: [
			'./routes/**/*.test.*',
			'./routes/**/*.spec.*',
		]
	}).forEach(function (file) {
		require(path.resolve(file))(express, app);
	});
};

