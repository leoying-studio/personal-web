
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var Body = require("./../config/body");
var DBSuper = require("./../dbsuper/index");

exports.add = function() {
    return DBSuper.save(ArticleModel);
}

// 获取分页数据
exports.getPaging = function(params, cb) {
    var conditions = {
        model:ArticleModel,
        params
    };
    DBSuper.findAll(NavModel).then(function(navs) {
         DBSuper.find(conditions).then(function(articles) {
             cb({
                 navs,
                 articles
             });
         });
    });
}

