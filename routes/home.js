var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var FooterModel = require("./../models/footer");
var IntroModel = require("./../models/intro");
var Validator = require("./../utils/validator");

router.get("/",function(req, res) {
	HomeProxy.getAll(function(data) {
		res.render("index", data);
	});
});

/* GET home page. */
router.get('/manager', function(req, res) {
	HomeProxy.getAll(function(data) {
		res.render("manager", data);
	});
});

router.post("/footer/set", function(req, res) {
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

router.post("/intro/set", function() {
	var query = query.query;
    var title = query.title
    var caption = query.caption;
    var description = query.description;
    var backTitle = requeryq.backTitle;
    var backgrounds = query.backgrounds;
    try {
        backgrounds = backgrounds.map(function(background) {
            return {
                background
            }
        });
    } catch(e) {
        backgrounds = [];
    }
    IntroModel.create({
        title,
        caption,
        description,
        backTitle,
        backgrounds
    }, function(err , doc) {
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

router.get("/intro/data", function(req, res) {
    IntroModel.find({}, function(err, intros) {
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
module.exports = router;