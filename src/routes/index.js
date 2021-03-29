'use strict';

module.exports = function(app) {
    console.info(__filename);
    app.useRoute(require('@/controller/ipCtrl')(app));
    app.useRoute('/api/v1/aliyun', require('@/controller/alicloudCtrl')(app));
    app.useRoute('/api/v1/version', require('@/controller/versionCtrl')(app));
};
