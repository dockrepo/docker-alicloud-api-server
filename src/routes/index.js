'use strict';

module.exports = function(app) {
    console.info(__filename);
    app.useRoute('/api/aliyun', require('@/controller/alicloudCtrl')(app));
};
