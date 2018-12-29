const _ = require('lodash');

module.exports = {
    /**
     * 是否是生产环境
     * @return {boolean}
     */
    isProduction() {
        return process.env.NODE_ENV === 'production';
    },
    /**
     * 获取插件配置
     * @param {object} projectOptions
     * @param {string} pluginField
     * @param {object} defaultOptions
     * @return {object}
     */
    getPluginOptions(projectOptions, pluginField, defaultOptions) {
        return _.get(projectOptions, 'pluginOptions.' + pluginField, defaultOptions);
    }
};
