const del = require('del');

module.exports = (config) => () => {
    const forDelete = [config.paths.dist];
    return del(forDelete);
};
