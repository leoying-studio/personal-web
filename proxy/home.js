var ArticleModel = require("./../models/article");
var IntroModel = require("./../models/intro");

// 获取介绍信息
exports.getIntro = function(params) {
    if (params) {
        return IntroModel.findPaging(params);
    } else {
        return IntroModel.findOne({apply: true}).lean();
    }
}


// 获取主题项内容
exports.getThemeMap = function(fields, params) {
    if (!params) {
        return IntroModel.find(fields)
    }
    var pageSize = params.pageSize;
    var pagination = params.pagination;
    var start = ( pagination - 1 ) * pageSize;
    var end = pagination * pageSize;
    return IntroModel.find(fields).populate("map", {slice: [start, end]});
}