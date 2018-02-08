var ArticleModel = require("./../models/article");

exports.getAll = function(callback) {
    var navs = ArticleModel.getNavs();
    var recommend = ArticleModel.find({}).sort({"serverTime": 1}).limit(7);
    return Promise.all([navs, recommend]).then(function(values, state) {
        callback({
            navs: values[0],
            banners: values[1]
        });
    });
}