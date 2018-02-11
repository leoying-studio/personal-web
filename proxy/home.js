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

exports.getBanners = function(callback) {
    ArticleModel.find({
        recommend: true
    }).sort({"serverTime": 1}).limit(7).lean().then(function(data) {
        if (data.length === 0) {
            return ArticleModel.find({}).sort({"serverTime": 1}).limit(7).lean().then(function(data) {
                callback(data);
            });
        } 
        callback(data);
    });
}