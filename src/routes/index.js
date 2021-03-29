'use strict';

module.exports = function(app) {
    console.info(__filename);
    app.useRoute(require('@/controller/ipCtrl')(app));
    app.useRoute('/api/aliyun', require('@/controller/alicloudCtrl')(app));
};
