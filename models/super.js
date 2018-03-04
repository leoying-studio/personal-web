var NavModel = require('./nav');

exports.regFind = function (schema) {
    schema.statics.findPaging = function (params = {}, conditions = {}, callback) {
        var currentPage = params.currentPage || 1;
        var pageSize = params.pageSize || 10;
        return this.find(conditions).sort({ 'serverTime': 1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize).lean(callback);
    }
}

exports.regNav = function(schema) {
    schema.statics.getNavs = function (cb) {
        return NavModel.find({}).lean(cb);
    }
}
