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


// router.post("/footer/set", function (req, res) {
//     var body = req.body;
//     var background = req.body;
//     var title = body.title;
//     var description = body.title;
//     // 提交数据
//     new FooterModel({
//         background, title, descrption
//     }).save((err, footer) => {
//         if (err) {
//             req.flash("error", "页脚设置失败");
//         } else {
//             req.flash("success", "页脚设置成功");
//         }
//         res.redirect("/");
//     });
// });


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

// intro  应用信息
// router.post("/intro/apply", function(req, res) {
//     IntroModel.findOne({apply: true}, function(err, doc) {
//         if (err) {
//             return res.send({
//                 status: false,
//                 msg: "查询异常"
//             });
//         }
//         if (doc) {
//             var _id =  doc.toJSON()._id;
//             var id = _id.toJSON();
//             IntroModel.update({_id: id}, {$set: {apply: false}}, function(err, doc) {
//                 if (err) {
//                     return res.send({
//                         status: false,
//                         msg: "应用异常"
//                     });
//                 }
//                 IntroModel.update({_id: req.body.id}, {apply: true}, function(err, state) {
//                     if (err || state.n == 0) {
//                         return res.send({
//                             status: false,
//                             msg: "应用异常"
//                         });
//                     }
//                     res.send({
//                         status: true,
//                         data: doc,
//                         msg: "ok"
//                     });
//                 });
//             });
//         } else {
//             IntroModel.update({_id: req.body.id}, {apply: true}, function(err, state) {
//                 if (err || state.n == 0) {
//                     return res.send({
//                         status: false,
//                         msg: "应用异常"
//                     });
//                 }
//                 res.send({
//                     status: true,
//                     msg: "ok"
//                 });
//             });
//         }
//     });
// });

// 消灭这条推荐数据
router.post("/intro/destory", function(req, res) {
    IntroModel.remove({_id: req.body.id}, function(err, state) {
        if (err) {
            return res.send({
                status: false,
                message: "删除异常" 
            });
        } 
        if (state.result.n > 0) {
            res.send({
                status: true,
                message: "删除成功!"
            });
        } else {
            res.send({
                status: false,
                message: "删除失败!"
            });
        }
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
    var _id = body.introId;
    var topicMap = body.topicMap;
    if (_id) {
        IntroModel.update({_id}, {$push: {topMap} }, function(err, doc) {
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
    } else {
        IntroModel.update({_id}, {$push: {
            topMap,
            map: []
        }}, function(err, doc) {
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
    }
});

// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", function(req, res) {
    var body = req.body;
    var introId = body.introId;
    var themeId = body.themeId;
    var discriptiveGraph = body.discriptiveGraph;
    var presentation = body.presentation;
    var fields = {
        discriptiveGraph,
        presentation
    };
    if (!themeId) {
        IntroModel.update({_id: introId}, {$push: {map: fields}},  function(err, state) {
            if(err) {
                return res.send({
                    status: false,
                    message: "添加异常!"
                });
            } 
            res.send({
                status: true,
                msg: "新增成功!"
            });
        });
    }else {
         // 添加到内嵌文档
        IntroModel.update({"themes._id": themeId}, {$set: fields}, function(err, doc) {
            if (err) {
                return res.send({
                    message: "添加失败",
                    status: false
                });
            }
            res.send({
                status: true,
                data: doc
            });
        });
    }
});

// 获取专题详情内容, 查询所有
// router.get("/special/themes/data", function(req, res) {
//     SpecialModel.findOne({_id: req.query.id}).lean().then(function(doc) {
//         res.send({
//             status: true,
//             data: doc.themes,
//             msg: "ok"
//         });
//     }).catch(function(err) {
//         res.send({
//             status: false,
//             data: err,
//             msg: "查询异常"
//         });
//     });
// });

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


// 设置主题
// router.post("intro/themes/add", function(req, res) {
//     var body = req.body;
//     var _id = body.id;
//     // var title = body.title;
//     // 首页展示
//     var homeFigure = body.homeFigure;
//     var headline = body.headline;
//     var validate = Validator([
//         {mode: "required", value: headline, message: "标题不能为空"},
//         {mode: "required", value: homeFigure, message: "首页展示图不能为空"},
//     ]);
//     if(!validate.status) {
//         return res.send({
//             status: false,
//             message: validate.message
//         });
//     }
//     // 接口存在id就进行添加
//     if (!_id) {
//         SpecialModel.create({ homeFigure, headline}, function(err, doc) {
//             if (err) {
//                 return res.send({
//                     message: "添加异常",
//                     status: false
//                 });
//             }
//             res.send({
//                 message: "添加成功",
//                 status: true
//             });
//         }).catch(function(e) {
//             res.send({
//                 status: false,
//                 msg: "新增异常"
//             })
//         });
//     } else {
//         // 更新
//         SpecialModel.update({_id}, {$set: {homeFigure, headline}}, function(err, doc) {
//             if (err) {
//                 return res.send({
//                     message: "更新异常",
//                     status: false
//                 });
//             }
//             res.send({
//                 message: "更新成功",
//                 status: doc
//             });
//         }); 
//     }
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
