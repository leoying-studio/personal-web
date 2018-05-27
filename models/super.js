var Categories = require('./categories');

// 分页查询
exports.queryPaging = function (scheam) {
    scheam.static.queryPaging = function(params = {}, conditions = {}) {
        var currentPage = Number(params.currentPage || 1);
        var pageSize = Number(params.pageSize || 10);
        return this.find(conditions).sort({ 'createdAt': -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize).lean();
    }
}

//　分类信息查询查询
exports.getCategories = function(scheam) {
    scheam.static.getCategories = function() {
        return Categories.find({}).lean();
    }
}
