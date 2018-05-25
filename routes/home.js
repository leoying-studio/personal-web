var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var IntroModel = require("./../models/intro");  
var Validator = require("./../utils/validator");
var ArticleModel = require("./../models/article");
var ArticleProxy = require("./../proxy/article");

router.get("/", function (req, res) {
    var navs = ArticleModel.getNavs().lean();
    var recommend = ArticleModel.findPaging({}, {recommend: true});
    var intro = HomeProxy.getIntro();   
    var timeline = ArticleProxy.getTimeline();
    var getItems = [navs, recommend, intro, special, timeline];
    Promise.all(getItems)
    .then( function (values) {
        var data = {
            navs: values[0],
            banners: values[1],
            intro: values[2] || {},
            special: values[3],
            timeline: values[4]
        };
        res.render("index", data);
    }).catch(function() {
        throw new Error("错误");
    })
});


/* GET home page. */
router.get('/manager', function (req, res) {
    ArticleModel.getNavs().lean().then(function(data) {
        res.render("manager", {navs: data});
    });
});

/**
 * 设置首页介绍信息
 */
router.post("/intro/save", function (req, res) {
    var body = req.body;
    var title = body.title
    var slogan = body.slogan;
    var headline = body.headline;
    var intro = body.intro;
    var _id = body.id;
    var validate = Validator([
        {mode: "required", value: title, message: '标题不能为空'},
        {mode: "required", value: slogan, message: "提示标语不能为空"},
        {mode: "required", value: intro, message: "介绍信息不能为空"},
        {mode: "headline", value: headline, message: "主题标题不能为空"}
    ]);
    var fields = {
        title,
        slogan,
        intro,
        headline,
        themes: []
    };
    if (!_id) {
        IntroModel.create(fields, function (err, doc) {
            if (err) {
                return res.send({
                    message: "添加失败",
                    errMsg: err.message,
                    status: false
                });
            }
            res.send({
                message: "创建成功",
                status: true,
                data: doc
            });
        }).catch(function(err) {
            res.send({
                message: "数据执行异常",
                errMsg: err.message,
                status: false
            });
        });
    } else {
        delete fields.themes;
        IntroModel.update({_id}, {$set: fields}, function(err, doc) {
            if (err) {
                return res.send({
                    message: "更新失败",
                    status: false
                })
            }
            res.send({
                message: "更新成功",
                status: true,
                data: doc
            });
        })
    }
});

/**
 * 应用介绍信息
 */
router.post("/intro/apply", function(req, res) {
    // 查询并更新
    IntroModel.update({apply: true}, {$set: {apply: false}}, function(err, state) {
         if (err) {
             return res.send({
                status: false,
                message: "数据更新异常",
                errMsg: err.message
             });
         }
         if (state.n > 0) {
             // 引用当前介绍信息
            IntroModel.update({_id: req.body.id}, {$set: {apply: true}}, function(err, state) {
                if (err) {
                    return res.send({
                        status: false,
                        message: "数据更新异常",
                        errMsg: err.message
                     });
                }
                if (state.n === 0) {
                    return res.send({
                        status: false,
                        message: "数据更新失败"
                    });
                }
                res.send({
                    status: true,
                    data: state,
                    message: "应用该介绍信息成功"
                });
            });
         } else {
             return res.send({
                 status: false,
                 message: "删除失败"
             });
         }
    });
});

// 消灭这条推荐数据
router.post("/intro/destory", function(req, res) {
    IntroModel.remove({_id: req.body.id}, function(err, state) {
        if (err) {
            return res.send({
                status: false,
                message: "数据执行错误" 
            });
        } 
        if (state.result.n === 0) {
            return res.send({
                status: false,
                message: "删除失败!"
            });
        } 
        res.send({
            status: true,
            message: "删除成功!"
        });
    });
}); 


// 获取intro 所有内容项
router.get("/intro/data", function (req, res) {
    HomeProxy.getIntro({}).then(function(collections) {
        res.send({
            status: true,
            data: collections
        });
    }).catch(function(e) {
        res.send({
            status: false,
            msg: e.message
        });
    }) 
});


/**
 * 首页主题增删查改
 */

 //根据 introId添加主题
router.post("/intro/themes/save", function(req, res) {
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
    IntroModel.update({_id}, fields, function(err, doc) {
        if (err) {
            return res.send({
                message: "添加失败",
                status: false,
                errMsg: err.message
            });
        }
        res.send({
            status: true,
            data: doc
        });
    });
});

// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", function(req, res) {
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
    IntroModel.update({_id: introId}, fields,  function(err, state) {
        if(err) {
            return res.send({
                status: false,
                message: themeId ? '更新错误' : '新增错误'
            });
        } 
        res.send({
            status: true,
            msg: themeId ? '更新成功' : '新增成功'
        });
    });
});


// 根据当前的introId获取下面的主题列表
router.get("/intro/themes/data", function(req, res) {
    var body = req.body;
    var currentPage = body.currentPage;
    var pageSize = body.pageSize;
    var _id = body.id;
    IntroModel.findPaging({currentPage, pageSize}, {_id}).then(function(doc) {
        res.send({
            status: true,
            data
        });
    }).catch(function(err) {
        res.send({
            status: false,
            data: [],
            message: err.message
        });
    });
});

// 根据introId 和 themeId 来查询主题详情
router.get("/intro/themes/", function(req, res) {

});

// 后端管理接口, 分页查询
// router.get("/special/data", function(req, res) {
//     var query = req.query;
//     var currentPage = query.page;
//     var pageSize = req.query.pageSize;
//     var params = {currentPage, pageSize};
//     if (!pageSize) {
//         params.pageSize = 4;
//         params.currentPage = 1;
//     }

//     // 如果没传参，就去查询最后的四条数据
//     SpecialModel.findPaging(params, {}).then(function(collections) {
//         res.send({
//             status: true,
//             data: collections
//         });
//     }).catch(function(e) {
//         res.send({
//             status: false,
//             data: [],
//             msg: "查询异常"
//         });
//     });
// });


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
    }).catch(function(err) {
        res.send({
            status: false,
            data: [],
            msg: err.message
        });
    });
});

// 删除主题
router.post("/special/destory", function(req, res) {
     var id = req.body.id;
     SpecialModel.remove({_id: id}, function(err, state) {
         if (err) {
             return res.send({
                state: false
             });
         }
         res.send({
             status: true,
             msg: "删除成功!"
         })
     });
});

router.post("/special/themes/destory", function(req, res) {
    var body = req.body;
    var specialId = body.specialId;
    var themeId = body.themeId;
    SpecialModel.findOne({_id: specialId}, function(err, doc) {
        if(err) {
            return res.send({
                status: false,
                msg: "查询错误"
            })
        }
        doc.remove({"themes._id":themeId}, function(err, state) {
            if (err) {
                return res.send({
                    status: false,
                    msg: "删除错误"
                });
            }
            res.send({
                status: false,
                msg: "删除成功!"
            });
        });
    });
});

module.exports = router;
