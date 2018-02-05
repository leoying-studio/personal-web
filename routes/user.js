var express = require('express');
var router = express.Router();
var UsersModel = require("./../models/users");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");

router.get('/login/view', function(req, res) {
	UsersModel.getNavs(function(navs) {
        res.render("login", {
			data: navs
		});
    });
});

router.get('/register/view', function(req, res) {
	UsersModel.getNavs(function(navs) {
        res.render("register", {
			data: navs
		});
    })
});

router.post("/login/submit", function(req, res) {
	var body = req.body;
	var username = body.username;
    var password = body.password
	UsersModel.findOne({
        username,
        password
	}, function(err, doc) {
        if (err) {
           return res.redirect("/user/login/view");
        }
        if (doc) {
			req.session.user = username;
			if (username !== "admin") {
				return res.redirect("/");
			}
			return res.redirect("/manager");
        }
        req.flash('error', '用户名不存在或密码错误');
        return res.redirect("/user/login/view");
    });
});

router.post("/register/submit", function(req, res) {
	var body = req.body;
    var username = body.username;
    var nickName = body.nickName;
    var password = body.password;
    var passAgain = body.passAgain;
    var email = body.email;
    var validate = Validator([
        {mode: "required, len", value: username, message: "用户名不合法", conditions: {min:2, max: 6}},
        {mode: "required, len", value: password, message: "密码输入不合法", conditions: {min:6, max: 16}},
        {mode: "required, email", value: email, message: "邮箱不合法"},
        {mode: "contrast", message: "两次密码输入不一致", conditions: {value: password, reducedValue: passAgain} }
    ]);
    if (!validate.status) {
        req.flash("error", e.message);
        return res.redirect("/user/register/view");
    }
    // 查询当前用户名是否注册
    UsersModel.findOne({username}).then((user) => {
        if (user) {
            req.flash("error", "当前用户已注册");
            return res.redirect("/user/reigster/view");
        }
        // 开始注册
        new UsersModel({
            username,
            password,
            nickName: nickName || "",
            passAgain,
            email,
        }).save((err) => {
            if (err) {
                req.flash("error", "注册失败");
            } else {
                req.flash("success", "注册成功");
            }
            res.redirect("/user/reigster/view");
        })
    });
});

module.exports = router;
