var IntrosModel = require("./../models/intros");

// 获取介绍信息
exports.getIntros = function (params) {
    if (params) {
        return IntrosModel.queryPaging(params);
    } else {
        return IntrosModel.findOne({ apply: true }); 
    }
}

/**
 * @param {*} fields 
 * @param {*} params 
 */
exports.getThemeMap = function (fields, params) {
    IntroModels.findOne({apply}, function(err, doc) {
        
    });
    if (!params) {
        return IntroModels.find(fields)
    }
    var pageSize = params.pageSize;
    var pagination = params.pagination;
    var start = (pagination - 1) * pageSize;
    var end = pagination * pageSize;
    return IntroModels.find(fields).populate("map", { slice: [start, end] });
}
