var IntrosModel = require("./../models/intros");

// 获取介绍信息
exports.getIntros = function(params) {
    if (params) {
        return IntroModels.queryPaging(params);
    } else {
        return IntroModels.findOne({apply: true}).lean();
    }
}


// 获取主题项内容
exports.getThemeMap = function(fields, params) {
    if (!params) {
        return IntroModels.find(fields)
    }
    var pageSize = params.pageSize;
    var pagination = params.pagination;
    var start = ( pagination - 1 ) * pageSize;
    var end = pagination * pageSize;
    return IntroModels.find(fields).populate("map", {slice: [start, end]});
}