'use strict';

// const Joi = require('joi');
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
    <style>
        * {
            box-sizing: border-box;
        }
        html, body {
            margin: 0;
            padding: 0;
            min-height: 100%;
        }
    </style>
</head>
<body>
{{ CONTENT }}

<div style="flex: 1 1 100%; text-align: center;">
<a href="/api/docs/swagger">Swagger UI</a>
</div>
</body>
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
        $p.find('a').remove(); // remove others
        const body = $p.html().trim();
        return HTML_CONTENT
            .replace(/{{\s*SERVER_NAME\s*}}/igm, this.info.name)
            .replace(/{{\s*CONTENT\s*}}/igm, `<div style="text-align: center;"><h1>iP地址归属地查询</h1><p>${body}</p></div>`);
    }

    async GetStunIP() {
        const stun = require('stun');
        const stunServers = [ ...new Set([
            ...(process.env.STUN_SERVER_LIST || '').split(',').map(item => item.trim()),
            'stun.l.google.com:19302',
            'stun1.l.google.com:19302',
            'stun2.l.google.com:19302',
            'stun3.l.google.com:19302',
            'stun4.l.google.com:19302',
        ]) ];
        while (stunServers.length) {
            const serverIp = stunServers.shift();
            try {
                const res = await stun.request(serverIp, {
                    retries: 3,
                    timeout: 300,
                });
                const address = res.getXorAddress().address;
                if (address) {
                    return address;
                }
            } catch (e) {
                console.warn(`[serverIp: ${serverIp}]`, e);
            }
        }
        return;
    }
}

module.exports = IPUtils;
