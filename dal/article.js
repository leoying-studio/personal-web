var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var DBSuper = require("./../db/super");

// 获取分页数据
exports.getPaging = function(params, conditions, cb) {
    DBSuper.findAll(NavModel).then(function(navs) {
         ArticleModel.findPaging(params || {}, conditions).then(function(articles) {
              ArticleModel.count(conditions, function(err, total) {
                 cb({
                    navs,
                    articles,
                    total
                 });
             });
         })
    });
}

// 添加文章列表
exports.submit = function(fields) {
    var model = new ArticleModel(fields);
    return DBSuper.save(model);
}
