// pluginOptions.publicPath
const _ = require('lodash');

/**
 * 计算发布路径
 * @param expectedPublicPath
 * @param {string} baseUrl
 * @return {*}
 */
function getPublicPath(expectedPublicPath, baseUrl) {
    return _.isString(expectedPublicPath) ? expectedPublicPath : baseUrl;
}

module.exports = (baseUrl, pluginOptions) => {
    return {
        css: getPublicPath(pluginOptions.css, baseUrl),
        images: getPublicPath(pluginOptions.images, baseUrl),
        svg: getPublicPath(pluginOptions.svg, baseUrl),
        media: getPublicPath(pluginOptions.media, baseUrl),
        fonts: getPublicPath(pluginOptions.fonts, baseUrl)
    }
};
