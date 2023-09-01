const webpack = require('webpack');
const wpConfig = require('../config/webpack.config');
const gulplog = require('gulplog');
const notifier = require('node-notifier');

module.exports = (config) => (callback) => {
    webpack(wpConfig, function (err, stats) {
        if (!err) {
            // no hard error
            // try to get a soft error from stats
            err = stats.toJson().errors[0];
        }

        if (err) {
            notifier.notify({
                title: 'Webpack',
                message: err,
            });

            gulplog.error(err);
        } else {
            gulplog.info(
                stats.toString({
                    colors: true,
                })
            );
        }

        // task never errs in watch mode, it waits and recompiles
        if (!config.isDevelopment && err) {
            callback(err);
        } else {
            callback();
        }
    });
};
