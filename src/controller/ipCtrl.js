'use strict';

const Joi = require('joi');
const axios = require('axios');
const cheerio = require('cheerio');

const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ SERVER_NAME }}</title>
</head>
<body>{{ CONTENT }}</body>
</html>
`;

class IPUtils {
    constructor(info) {
        this.info = info || {};
    }

    async GetIPSrc() {
        const url = 'https://www.ip138.com/';
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const iframe = $('iframe').first();
        const src = iframe.attr('src');
        return !/^\/\//.test(src) ? src : `http:${src}`;
    }

    async GetIP() {
        const url = await this.GetIPSrc();
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        return $('p>a').first().text();
    }

    async Index() {
        const url = await this.GetIPSrc();
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const $p = $('p').first();
        $p.find('a').first().replaceWith(`<span style="color: green;">${$p.find('a').text()}</span>`);
        const body = $p.html().trim();
        return HTML_CONTENT
            .replace(/{{\s*SERVER_NAME\s*}}/igm, this.info.name)
            .replace(/{{\s*CONTENT\s*}}/igm, `<div style="text-align: center;"><h1>iP地址归属地查询</h1><p>${body}</p></div>`);
    }
}

module.exports = function ipCtrl(app) {
    const router = app.$newRouter();
    const config = app.$config || {};

    router.get('/', async (ctx, next) => {
        try {
            const action = new IPUtils(config.info);
            const result = await action.Index();
            ctx.body = result;
        } catch (e) {
            ctx.error(e);
        }
    });

    router.get('/ip', async (ctx, next) => {
        try {
            const action = new IPUtils(config.info);
            const result = await action.GetIP();
            ctx.result(result);
        } catch (e) {
            ctx.error(e);
        }
    });

    return router;
};
