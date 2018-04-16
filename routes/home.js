var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var FooterModel = require("./../models/footer");
var IntroModel = require("./../models/intro");
var Validator = require("./../utils/validator");
var ArticleModel = require("./../models/article");
var ArticleProxy = require("./../proxy/article");
var SpecialModel = require("./../models/special");
var Validator = require("./../utils/validator");

router.get("/", function (req, res) {
    HomeProxy.getAll(function (data) {
        res.render("index", data);
    });
});

/* GET home page. */
router.get('/manager', function (req, res) {
    HomeProxy.getAll(function (data) {
        res.render("manager", data);
    });
});

// 获取已推荐的数据
router.get('/recommended/data', function (req, res) {
    HomeProxy.getBanners(function (data) {
        res.send({
            status: false,
            data
        });
    });
});

router.post("/footer/set", function (req, res) {
    var body = req.body;
    var background = req.body;
    var title = body.title;
    var description = body.title;
    // 提交数据
    new FooterModel({
        background, title, descrption
    }).save((err, footer) => {
        if (err) {
            req.flash("error", "页脚设置失败");
        } else {
            req.flash("success", "页脚设置成功");
        }
        res.redirect("/");
    });
});

router.post("/intro/submit", function (req, res) {
    var body = req.body;
    var title = body.title
    var caption = body.caption;
    var description = body.description;
    var _id = body.id;
    if (!_id) {
        IntroModel.create({
            title,
            caption,
            description
        }, function (err, doc) {
            if (err) {
                return res.send({
                    message: "设置失败",
                    status: false
                })
            }
            res.send({
                message: "success",
                status: true,
                data: doc
            });
        }).catch(function(e) {
            res.send({
                message: "设置失败",
                status: false
            });
        });
    } else {
        IntroModel.update({_id}, {$set: {title, caption, description}}, function(err, doc) {
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

// intro  引用
router.post("/intro/apply", function(req, res) {
    IntroModel.findOne({apply: true}, function(err, doc) {
        if (err) {
            return res.send({
                status: false,
                msg: "查询异常"
            });
        }
        if (doc) {
            var _id =  doc.toJSON()._id;
            var id = _id.toJSON();
            IntroModel.update({_id: id}, {$set: {apply: false}}, function(err, doc) {
                if (err) {
                    return res.send({
                        status: false,
                        msg: "应用异常"
                    });
                }
                IntroModel.update({_id: req.body.id}, {apply: true}, function(err, state) {
                    if (err || state.n == 0) {
                        return res.send({
                            status: false,
                            msg: "应用异常"
                        });
                    }
                    res.send({
                        status: true,
                        data: doc,
                        msg: "ok"
                    });
                });
            });
        } else {
            IntroModel.update({_id: req.body.id}, {apply: true}, function(err, state) {
                if (err || state.n == 0) {
                    return res.send({
                        status: false,
                        msg: "应用异常"
                    });
                }
                res.send({
                    status: true,
                    msg: "ok"
                });
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
                msg: "删除异常" 
            });
        } 
        if (state.result.n > 0) {
            res.send({
                status: true,
                msg: "删除成功!"
            });
        } else {
            res.send({
                status: false,
                msg: "删除失败!"
            });
        }
    });
}); 

router.get("/intro/data", function (req, res) {
    IntroModel.find({}, function (err, intros) {
        if (err) {
            return res.send({
                status: false
            });
        }
        res.send({
            status: true,
            data: intros
        });
    });
});

// 添加主题内容
router.post("/special/themes/submit", function(req, res) {
    var body = req.body;
    var id = body.id;
    var photo = body.photo;
    var presentation = body.presentation;
    if (!id) {
        SpecialModel.create({photo, presentation}, function(err, state) {
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
        SpecialModel.update({_id: id}, {$push: {themes: {presentation, photo}}}, function(err, doc) {
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
router.get("/special/themes/data", function(req, res) {
    SpecialModel.findOne({_id: req.query.id}).lean().then(function(doc) {
        res.send({
            status: true,
            data: doc.themes,
            msg: "ok"
        });
    }).catch(function(err) {
        res.send({
            status: false,
            data: err,
            msg: "查询异常"
        });
    });
});

// 后端管理接口, 分页查询
router.get("/special/data", function(req, res) {
    var query = req.query;
    var currentPage = query.page;
    var pageSize = req.query.pageSize;
    var params = {currentPage, pageSize};
    if (!pageSize) {
        params.pageSize = 4;
        params.currentPage = 1;
    }

    // 如果没传参，就去查询最后的四条数据
    SpecialModel.findPaging(params, {}).then(function(collections) {
        res.send({
            status: true,
            data: collections
        });
    }).catch(function(e) {
        res.send({
            status: false,
            data: [],
            msg: "查询异常"
        });
    });
});

// 设置主题
router.post("/special/submit", function(req, res) {
    var body = req.body;
    var _id = body.id;
    var title = body.title;
    // 首页展示
    var homeFigure = body.homeFigure;
    var headline = body.headline;
    var validate = Validator([
        {mode: "required", value: title, message: "标题不能为空"},
        {mode: "required", value: homeFigure, message: "首页展示图不能为空"},
    ]);
    if(!validate.status) {
        return res.send({
            status: false,
            msg: validate.msg
        });
    }
    // 接口存在id就进行添加
    if (!_id) {
        SpecialModel.create({title, homeFigure, headline}, function(err, doc) {
            if (err) {
                return res.send({
                    message: "设置异常",
                    status: false
                });
            }
            res.send({
                message: "添加成功",
                status: true
            });
        }).catch(function(e) {
            res.send({
                status: false,
                msg: "新增异常"
            })
        });
    } else {
        // 更新
        SpecialModel.update({_id}, {$set: {title, homeFigure, headline}}, function(err, doc) {
            if (err) {
                return res.send({
                    message: "更新异常",
                    status: false
                });
            }
            res.send({
                message: "更新成功",
                status: doc
            });
        }); 
    }
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
