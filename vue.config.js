const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/static/style/index.scss";`
            }
        },
        sourceMap: false
    },

    parallel: true,

    chainWebpack: config => {
        config.resolve.alias
            .set('@assets', resolve('src/assets'))
            .set('@views', resolve('src/views'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@/', resolve('src'))
            .set('@static', resolve('src/static'))
            .set('@utils', resolve('src/utils'))
            .set('@mixins', resolve('src/mixins'))
            .set('@filters', resolve('src/filters'))
            .set(`@plugins`, resolve('src/plugins'));
    }
};
