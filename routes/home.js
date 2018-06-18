var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var IntrosModel = require("./../models/intros");  
var Checks = require("./../checks/home");
var ArticlesModel = require("./../models/articles");
var ArticlesProxy = require("./../proxy/articles");

router.get("/", function (req, res, next) {
    var categories = ArticlesModel.getCategories();
    var recommend = ArticlesModel.queryPaging({}, {recommend: true});
    // 获取最新的一条信息
    var intro = HomeProxy.getIntros();   
    var timeline = ArticlesProxy.getTimeline();
    var getItems = [categories, recommend, intro, timeline];
    Promise.all(getItems)
    .then( function (values) {
        var data = {
            categories: values[0],
            recommends: values[1],
            intro: values[2] || { },
            timeline: values[3].collections
        };
        res.render("index", data);
    }).catch(next);
});


/* GET home page. */
router.get('/manager', function (req, res, next) {
    ArticlesModel.getCategories().then(function(data) {
        res.render("manager", {categories: data});
    }).catch(next);
});

/**
 * 设置首页介绍信息
 */
router.post("/intro/save", Checks.intro, function (req, res, next) {
    if (!req.body.conditions._id) {
        HomeProxy.applyIntro().then(function() {
            IntrosModel.create(req.body.models, function (err, doc) {
                if (err) {
                    return next();
                }
                req.body.data = doc;
                next();
            });
        }).catch(next);
    } else {
        IntrosModel.update(req.body.conditions, {$set: req.body.models}, function(err, doc) {
            if (err) {
               return next();
            }
            req.body.data = doc;
            next();
        });
    }
});

/**
 * 应用介绍信息
 */
router.post("/intro/apply", Checks.introId, function(req, res, next) {
    // 查询并更新
    HomeProxy.applyIntro(req.body).then(function(r) {
        res.body = {
            message: r.message,
            data: {}
        };
        next();
    }).catch(next)
});

// 消灭这条推荐数据
router.post("/intro/destory", Checks.introId, function(req, res, next) {
    IntrosModel.remove(req.body, function(err, state) {
        if (err) {
           return next();
        } 
        if (state.result.n === 0) {
            return res.send({
                status: false,
                message: "删除失败!"
            });
        } 
       req.body.data = {};
       next();
    }).catch(next);
}); 


// 获取intro 所有内容项
router.get("/intro/data", function (req, res, next) {
    HomeProxy.getIntros({pagination: 1, pageSize: 99999}).then(function(collections) {
        res.send({
            status: true,
            data: collections
        });
    }).catch(next)
});


/**
 * 首页主题增删查改
 */

 //根据 introId添加主题
router.post("/intro/themes/save", function(req, res, next) {
    var body = req.body;
    var _id = body.id;
    var topicMap = body.topicMap;
    var fields = {
        $push: topicMap,
        map: []
    };
    if (_id) {
        fields = {
            $set: {
                topicMap
            } 
        }
    }
    IntrosModel.update({_id}, fields, function(err, doc) {
        if (err) {
           return next();
        }
        req.body.data = doc;
        next();
    }).catch(next);
});

// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", function(req, res, next) {
    var body = req.body;
    var introId = body.introId;
    var themeId = body.themeId;
    var discriptiveGraph = body.discriptiveGraph;
    var presentation = body.presentation;
    var fields = {
        $push: {
            map: {
                theme: {
                    discriptiveGraph,
                    presentation
                }
            }
        }
    };
    if (themeId) {
        fields = {
            $set: {
                map: {
                   theme: {
                        discriptiveGraph,
                        presentation
                   }
                }
            }
        };
    }
    IntrosModel.update({_id: introId}, fields,  function(err, state) {
        if(err) {
            req.body.message = themeId ? '更新错误' : '新增错误';
            return next();
        } 
        res.send({
            status: true,
            msg: themeId ? '更新成功' : '新增成功'
        });
    }).catch(next);
});


// 根据当前的introId获取下面的主题列表
router.get("/intro/themes/data", function(req, res, next) {
    var body = req.body;
    var currentPage = body.currentPage || 1;
    var start = (currentPage - 1) * 4;
    var end = currentPage * 4;
    IntrosModel.findOne({_id: body._id}).populate('themes', {slice: [start, end]})
    .then(function(data) {
       res.json(data.themes);
    }).catch(next);
});


// 根据introId 和 themeId 来查询主题详情
router.get("/intro/themes/map/data", Checks.map, function(req, res, next) {
    HomeProxy.getThemeMap(req.body.models, req.body.params).then(function(data) {
        res.send({
            status: true,
            data
        });
    }).catch(next);
});


// 获取时光轴
router.get("/timeline/data", function(req, res, next) {
    var body = req.body;
    var params = Object.keys(body).length > 0 ? body : req.query;
    var pageSize = body.pageSize;
    var currentPage = body.currentPage;
    ArticleProxy.getTimeline({currentPage: params.currentPage, pageSize: params.pageSize}, {year: params.year, month: params.month})
    .then(function(data) {
        res.send({
            status: true,
            data
        });
    }).catch(next);
});

// 删除主题
router.post("/intro/themes/destory", function(req, res, next) {
     var body = req.body;
     var themeId = body.themeId;
     var _id = body.introId;
     IntrosModel.findOne({_id, "themes._id": themeId}).remove(function(err, state) {
        res.send({
            status: true,
            message: "删除成功"
        });
     }).catch(next);
});

router.post("/intro/theme/map/destory", Checks.mapItem, function(req, res, next) {
    IntrosModel.findOne(req.body)
    .remove(function(err, state) {
        res.send({
            status: true,
            message: "删除成功"
        });
    }).catch(next);
});

module.exports = router;
