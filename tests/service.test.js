const Service = require('@vue/cli-service');
const path = require('path');
const publicPathVueCliPlugin = require('../service');
const optionsDefaults = require('../service/options-defaults');

const PLUGIN_NAME = require('../package').name;
const TEST_PROJECT_PATH = path.resolve(__dirname, './test-project');
const TEST_MODE = 'production';
const AssetTypes = Object.keys(optionsDefaults('', {}));
const Tester = {
    css: (expectedPublicPath, chainableWebpackConfig) => {
        chainableWebpackConfig.plugin('rewrite-css-publicpath').tap(options => {
            options.forEach(option => {
                expect(option.publicPath).toBe(expectedPublicPath);
            })
        })
    },
    images: (expectedPublicPath, chainableWebpackConfig) => {
        chainableWebpackConfig.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                expect(options.publicPath).toBe(expectedPublicPath);
                return options;
            });
    },
    svg: (expectedPublicPath, chainableWebpackConfig) => {
        chainableWebpackConfig.module
            .rule('svg')
            .use('file-loader')
            .tap(options => {
                expect(options.publicPath).toBe(expectedPublicPath);
                return options;
            });
    },
    media: (expectedPublicPath, chainableWebpackConfig) => {
        chainableWebpackConfig.module
            .rule('media')
            .use('url-loader')
            .tap(options => {
                expect(options.publicPath).toBe(expectedPublicPath);
                return options;
            });
    },
    fonts: (expectedPublicPath, chainableWebpackConfig) => {
        chainableWebpackConfig.module
            .rule('fonts')
            .use('url-loader')
            .tap(options => {
                expect(options.publicPath).toBe(expectedPublicPath);
                return options;
            });
    }
};

function createService(projectOptions) {
    process.env.NODE_ENV = 'production';
    const service = new Service(TEST_PROJECT_PATH, {
        plugins: [
            {
                id: 'inline:' + PLUGIN_NAME,
                apply: publicPathVueCliPlugin
            }
        ],
        inlineOptions: projectOptions
    });
    service.init(TEST_MODE);
    return service;
}

describe('默认情况', () => {
    test('默认时，所有资源publicPath为publicPath', () => {
        const projectOptions = {
            publicPath: '//static.com'
        };
        const service = createService(projectOptions);
        const chainConfig = service.resolveChainableWebpackConfig();
        AssetTypes.forEach(type => {
            Tester[type](projectOptions.publicPath, chainConfig);
        })
    });
});

describe('根据配置修改发布路径', () => {
    const projectOptions = {
        publicPath: '//static.com',
        pluginOptions: {
            publicPath: {}
        }
    };
    
    AssetTypes.forEach(type => {
        projectOptions.pluginOptions.publicPath[type] = `//${type}.cdn.com`;
    });
    
    const service = createService(projectOptions);
    const chainConfig = service.resolveChainableWebpackConfig();
    
    AssetTypes.forEach((type) => {
        test('能正确修改' + type +'的publicPath', () => {
            Tester[type](projectOptions.pluginOptions.publicPath[type], chainConfig);
        });
    });
});
