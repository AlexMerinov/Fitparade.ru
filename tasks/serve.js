const bs = require('browser-sync');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (config) => (callback) => {
    const devMiddleware = [];
    if (config.isDevelopment) {
        {
            // const { dev, proxyTo, proxyFrom } = config.apiConfig;
            // devMiddleware.push(
            //     createProxyMiddleware(dev, {
            //         target: proxyTo,
            //         pathRewrite: {
            //             [proxyFrom]: '',
            //         },
            //         changeOrigin: true,
            //         logLevel: 'debug',
            //     })
            // );
        }
        {
            // const { dev, proxyTo, proxyFrom } = config.resourcesConfig;
            // devMiddleware.push(
            //     createProxyMiddleware(dev, {
            //         target: proxyTo,
            //         pathRewrite: {
            //             [proxyFrom]: '',
            //         },
            //         changeOrigin: true,
            //         logLevel: 'error',
            //     })
            // );
        }
    }

    bs.init(
        {
            open: false,
            server: {
                baseDir: config.paths.dist,
                port: 3000,
                serveStaticOptions: {
                    extensions: ["html"]
                },
                middleware: [...devMiddleware],
            },
            ghostMode: false,
            reloadDebounce: 300,
            snippetOptions: {
                ignorePaths: '/ssr/**/*',
            },
        },
        (err, bsInst) => {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        }
    );
};
