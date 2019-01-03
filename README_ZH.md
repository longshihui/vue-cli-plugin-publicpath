# vue-cli-plugin-publicpath

[![Build Status](https://travis-ci.org/longshihui/vue-cli-plugin-publicpath.svg?branch=master)](https://travis-ci.org/longshihui/vue-cli-plugin-publicpath) [![](https://img.shields.io/npm/v/vue-cli-plugin-publicpath.svg)](https://www.npmjs.com/package/vue-cli-plugin-publicpath) [![](https://img.shields.io/npm/l/vue-cli-plugin-publicpath.svg)](https://www.npmjs.com/package/vue-cli-plugin-publicpath)

重写生产环境资源发布路径

## 安装

**vue cli**

```
vue add publicpath
```

**yarn**

```
yarn add vue-cli-plugin-publicpath --dev
```

**npm**

```
npm i vue-cli-plugin-publicpath --save-dev
```

## 配置

**vue.config.js**

```
module.exports = {
    baseUrl: '//js.cdn.com',  // js发布路径
    pluginOptions: {
        publicPath: {
            css: '',
            images: '',
            svg: '',
            media: '',
            fonts: ''
        }
    }
}
```

详细配置参考[文件](./service/options-defaults.js)


