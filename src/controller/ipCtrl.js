'use strict';

const IPUtils = require('@/utils/IPUtils');

module.exports = function ipCtrl(app) {
    const router = app.$newRouter();
    const config = app.$config || {};

    const apiPrefix = '/api/v1/ip';

    router.get('', async (ctx, next) => {
        try {
            const action = new IPUtils(config.info);
            const result = await action.Index();
            ctx.body = result;
        } catch (e) {
            ctx.error(e);
        }
    });

    /**
     * @swagger
     * /api/v1/ip:
     *   get:
     *     summary: 通过 网站解析 获取 address
     *     description: 通过 网站解析 获取 address
     *     responses:
     *       200:
     *         description: 成功
     */
    router.get(apiPrefix + '', async (ctx, next) => {
        try {
            const action = new IPUtils(config.info);
            const result = await action.GetIP();
            ctx.result(result);
        } catch (e) {
            ctx.error(e);
        }
    });

    /**
     * @swagger
     * /api/v1/ip/stun:
     *   get:
     *     summary: 通过 stun 获取 address
     *     description: 通过 stun 获取 address
     *     responses:
     *       200:
     *         description: 成功
     */
    router.get(apiPrefix + '/stun', async (ctx, next) => {
        try {
            const action = new IPUtils(config.info);
            const result = await action.GetStunIP();
            ctx.result(result);
        } catch (e) {
            ctx.error(e);
        }
    });

    return router;
};
