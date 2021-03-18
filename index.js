'use strict';

const koaBody = require('koa-body');

module.exports = (app, options) => {

    app.use(koaBody());

    // 增强 $config
    // app.$dispatcher('config', require.resolve('@micro-app/tools-server/config'));
    // // 配置全局 helper
    // app.$dispatcher('helper', require.resolve('@micro-app/tools-server/helper'));
    // // 配置全局 service
    // app.$dispatcher('service', require.resolve('@micro-app/tools-server/service'));
    // // 配置全局 plugin
    // app.$dispatcher('plugin', require.resolve('@micro-app/tools-server/plugin'));
    // // 配置全局  middleware
    // app.$dispatcher('middleware', require.resolve('@micro-app/tools-server/middleware'));
    // 配置路由 router
    app.$dispatcher('router', require.resolve('@/routes'));

};
