var ArticleModel = require("./../models/article");
var ArticleDetailModel = require("./../models/article_detail");
var DBSuper = require("./../db/super");

// 获取分页数据
exports.getPaging = function(params, conditions, cb) {
    ArticleModel.getNavs().then(function(navs) {
         ArticleModel.findPaging(params, conditions).then(function(articles) {
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

// 更新数据访问
exports.update = function(conditions, cb) {
   var updates = {$set: conditions};
   return ArticleModel.update(conditions, updates, cb).lean();
}

// 删除数据访问
exports.del = function(conditions, cb) {
    return ArticleDetailModel.remove(conditions, function(err, article_detail) {
          ArticleModel.remove(conditions, db).lean();
    }).lean();
}