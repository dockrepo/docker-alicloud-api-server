'use strict';

module.exports = {
    namespace: '@',
    alias: {
        root: './',
        src: './src',
        app: './src/app',
        config: './src/config',
        helper: './src/helper',
        plugin: './src/plugin',
        middleware: './src/middleware',
        routes: './src/routes',
        utils: './src/utils',
        controller: './src/controller',
        service: './src/service',
    },
    server: {
        entry: 'index.js',
        port: 7899,
        options: {
            accessKeyId: process.env.ACCESS_KEY_ID || '<accessKeyId>',
            accessKeySecret: process.env.ACCESS_KEY_SECRET || '<accessSecret>',
        },
    },
    devServer: {
        host: 'localhost',
        port: 7898,
    },
    plugins: [
        '@micro-app/plugin-koa',
    ],
};
