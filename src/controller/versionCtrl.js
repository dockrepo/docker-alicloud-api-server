'use strict';

module.exports = function versionCtrl(app) {
    const router = app.$newRouter();
    const config = app.$config || {};

    router.get('/', async (ctx, next) => {
        try {
            ctx.result(config.info.version);
        } catch (e) {
            ctx.error(e);
        }
    });

    return router;
};
