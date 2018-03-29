var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var FooterModel = require("./../models/footer");
var IntroModel = require("./../models/intro");
var Validator = require("./../utils/validator");
var ArticleModel = require("./../models/article");
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

// 取消推荐
router.post('/recommend/delete', function (req, res) {
    ArticleModel.findOne({ _id: req.body.articleId }, function (err, article) {
        ArticleModel.update({
            _id: req.body.articleId
        }, {
                $set: { recommend: false }
            }, function (err, state) {
                if (err) {
                    return res.send({
                        status: false,
                        message: "取消推荐失败"
                    });
                }
                res.send({
                    status: true,
                    message: "ok"
                });
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
    IntroModel.create({
        title,
        caption,
        description
    }, function (err, doc) {
        if (err) {
            return reset.send({
                message: "设置失败",
                status: false
            })
        }
        res.send({
            message: "success",
            status: true,
            data: doc
        });
    });
});

// intro  引用
router.post("/intro/apply", function() {

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
    // 添加到内嵌文档
    SpecialModel.update({_id: id}, {$push: {themes: {presentation, photo}}}, function(err, doc) {
        if (err) {
            return  reset.send({
                message: "添加失败",
                status: false
            });
        }
        res.send({
            status: true,
            data: doc
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
    Validator([
        {mode: "required", value: title, message: "标题不能为空"},
        {mode: "required", value: homeFigure, message: "首页展示图不能为空"},
    ]);
    // 接口存在id就进行添加
    if (!_id) {
        SpecialModel.insert({title, homeFigure, headline}, function(err, doc) {
            if (err) {
                return res.send({
                    message: "设置异常",
                    status: false
                });
            }
            res.send({
                message: "设置成功",
                status: doc
            });
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

module.exports = router;
