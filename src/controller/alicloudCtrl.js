/* eslint-disable valid-jsdoc */
'use strict';

const Core = require('@alicloud/pop-core');
const Joi = require('joi');

class Action {
    constructor(options) {
        const client = new Core({
            accessKeyId: options.accessKeyId,
            accessKeySecret: options.accessKeySecret,
            endpoint: 'https://alidns.aliyuncs.com',
            apiVersion: '2015-01-09',
        });
        this.client = client;
    }

    /**
     * @swagger
     * /api/aliyun/AddDomainRecord:
     *   post:
     *     summary: 根据传入参数添加解析记录
     *     description: 根据传入参数添加解析记录
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: {
                            RR: '',
                            DomainName: '',
                            Type: '',
                            Value: '',
                        }
     *     responses:
     *       200:
     *         description: 成功
     */
    async AddDomainRecord(params) {
        const requestOption = {
            method: 'POST',
        };
        const result = await this.client.request('AddDomainRecord', params, requestOption);
        return result;
    }

    /**
     * @swagger
     * /api/aliyun/UpdateDomainRecord:
     *   post:
     *     summary: 根据传入参数修改解析记录
     *     description: 根据传入参数修改解析记录
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: {
                                RR: '',
                                RecordId: '',
                                Type: '',
                                Value: '',
                            }
     *     responses:
     *       200:
     *         description: 成功
     */
    async UpdateDomainRecord(params) {
        const requestOption = {
            method: 'POST',
        };
        const result = await this.client.request('UpdateDomainRecord', params, requestOption);
        return result;
    }

    /**
     * @swagger
     * /api/aliyun/CheckupAndUpdateDomainRecord:
     *   post:
     *     summary: 根据传入参数先校验，后修改解析记录
     *     description: 根据传入参数先校验，后修改解析记录
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: {
                                RR: '',
                                RecordId: '',
                                Type: '',
                                Value: '',
                            }
     *     responses:
     *       200:
     *         description: 成功
     */
    async CheckupAndUpdateDomainRecord(params) {
        const RecordId = params.RecordId;
        const info = await this.DescribeDomainRecordInfo({
            RecordId,
        });
        if (!info) throw new Error('Not Found RecordId:', RecordId);
        if (Object.entries(params).every(([ key, value ]) => {
            return info[key] === value;
        })) {
            throw new Error('更新失败!参数没有发生改变');
        }
        const result = await this.UpdateDomainRecord(params);
        return result;
    }

    /**
     * @swagger
     * /api/aliyun/DescribeDomainRecords:
     *   post:
     *     summary: 根据传入参数获取指定主域名的所有解析记录列表
     *     description: 根据传入参数获取指定主域名的所有解析记录列表
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: { DomainName: "baidu.com" }
     *     responses:
     *       200:
     *         description: 成功
     */
    async DescribeDomainRecords(params) {
        const requestOption = {
            method: 'POST',
        };
        const result = await this.client.request('DescribeDomainRecords', params, requestOption);
        return result;
    }

    /**
     * @swagger
     * /api/aliyun/DescribeSubDomainRecords:
     *   post:
     *     summary: 根据传入参数获取某个固定子域名的所有解析记录列表
     *     description: 根据传入参数获取某个固定子域名的所有解析记录列表
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: { SubDomain: "a.b.baidu.com" }
     *     responses:
     *       200:
     *         description: 成功
     */
    async DescribeSubDomainRecords(params) {
        const requestOption = {
            method: 'POST',
        };
        const result = await this.client.request('DescribeSubDomainRecords', params, requestOption);
        return result;
    }

    /**
     * @swagger
     * /api/aliyun/DescribeDomainRecordInfo:
     *   post:
     *     summary: 根据传入参数获取某个固定子域名下的解析记录信息
     *     description: 根据传入参数获取某个固定子域名下的解析记录信息
     *     parameters:
     *          - name: params
     *            in: body
     *            required: true
     *            schema:
     *              type: object
     *              example: { RecordId: "xxxx" }
     *     responses:
     *       200:
     *         description: 成功
     */
    async DescribeDomainRecordInfo(params) {
        const requestOption = {
            method: 'POST',
        };
        const result = await this.client.request('DescribeDomainRecordInfo', params, requestOption);
        return result;
    }
}

module.exports = function aliyunCtrl(app) {
    const router = app.$newRouter();
    const config = app.$config;
    const options = config.options || {};
    console.info('options:', options);

    router.post('/:Action', async (ctx, next) => {
        const params = ctx.params || {};
        const body = ctx.request.body || {};
        try {
            await Joi.object({
                Action: Joi.string().required(), // 'DescribeDomainRecords'
            }).validateAsync(params);

            const action = new Action(options);
            if (!action[params.Action] || typeof action[params.Action] !== 'function') {
                throw new Error('Not Found Action:' + params.Action);
            }
            const result = await action[params.Action](body);
            ctx.result(result);
        } catch (e) {
            ctx.error(e);
        }
    });

    return router;
};
