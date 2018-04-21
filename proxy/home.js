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