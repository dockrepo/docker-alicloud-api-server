# alicloud-api-server

主要用于调用 Alicloud 的 api 修改域名解析

提供封装的5个接口： 可参考[接口文档](https://help.aliyun.com/document_detail/124923.html?spm=a2c4g.11174283.6.628.40cf571fdGkRqF#title-fbv-si0-ict)

swagger ui 文档地址：http://localhost:7899/api/docs/swagger

```js
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
```


## Quick Start

```sh
docker run -d --name alicloud-api-server \
    -p 7899:7899 \
    -e TZ="Asia/Shanghai" \
    -e ACCESS_KEY_ID=$ACCESS_KEY_ID \
    -e ACCESS_KEY_SECRET=$ACCESS_KEY_SECRET \
    --restart unless-stopped \
    zyao89/alicloud-api-server
```
