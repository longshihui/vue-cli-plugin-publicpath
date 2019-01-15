// pluginOptions.publicPath
const _ = require('lodash');

/**
 * 计算发布路径
 * @param expectedPublicPath
 * @param {string} defaultPublicPath
 * @return {*}
 */
function getPublicPath(expectedPublicPath, defaultPublicPath) {
    return _.isString(expectedPublicPath) ? expectedPublicPath : defaultPublicPath;
}

module.exports = (defaultPublicPath, pluginOptions) => {
    return {
        css: getPublicPath(pluginOptions.css, defaultPublicPath),
        images: getPublicPath(pluginOptions.images, defaultPublicPath),
        svg: getPublicPath(pluginOptions.svg, defaultPublicPath),
        media: getPublicPath(pluginOptions.media, defaultPublicPath),
        fonts: getPublicPath(pluginOptions.fonts, defaultPublicPath)
    }
};
