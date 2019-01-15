/**
 * 根据资源类型重写publicPath
 */
const utils = require('./utils');
const CSSCDNResetPlugin = require('rewrite-css-publicpath-webpack-plugin');
const optionsDefaulter = require('./options-defaults');

function createModifier(pluginOptions) {
    return function(extnames, handler) {
        if (!Array.isArray(extnames)) {
            extnames = [extnames];
        }
        extnames.forEach(extname => {
            handler({
                extname,
                publicPath: pluginOptions[extname]
            });
        });
    };
}

module.exports = (api, projectOptions) => {
    if (!utils.isProduction()) {
        return;
    }
    
    let pluginOptions = utils.getPluginOptions(
        projectOptions,
        'publicPath',
        {}
    );
    pluginOptions = optionsDefaulter(projectOptions.publicPath || projectOptions.baseUrl, pluginOptions);
    // 修改css发布路径
    api.chainWebpack(config => {
        const modify = createModifier(pluginOptions);
        
        modify('css', ({ publicPath }) => {
            config.plugin('rewrite-css-publicpath').use(CSSCDNResetPlugin, [
                {
                    publicPath
                }
            ]);
        });
        
        modify('svg', ({ extname, publicPath }) => {
            config.module
                .rule(extname)
                .use('file-loader')
                .tap(options => {
                    options.publicPath = publicPath;
                    return options;
                });
        });
        
        modify(['images', 'media', 'fonts'], ({ extname, publicPath }) => {
            config.module
                .rule(extname)
                .use('url-loader')
                .tap(options => {
                    options.publicPath = publicPath;
                    return options;
                });
        });
    });
};

