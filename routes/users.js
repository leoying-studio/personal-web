const express = require('express');
const router = express.Router();
const UsersModel = require("./../models/users");
const Utils = require("./../utils");


router.get('/login/view', function(req, res) {
    UsersModel.getCategories().then(function(collections) {
        res.render("login", {
			categories: collections
		});
    });
});

router.get('/register/view', function(req, res) {
	UsersModel.getCategories(function(collections) {
        res.render("register", {
			categories: collections
		});
    })
});

router.post("/login/submit", function(req, res) {
	let body = req.body;
	let username = body.username;
    let password = body.password
	UsersModel.findOne({
        username,
        password
	}, function(err, doc) {
        if (err) {
           return next(err);
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
	let body = req.body;
    let username = body.username;
    let nickName = body.nickName || "";
    let password = body.password;
    let passAgain = body.passAgain;
    let email = body.email;
    
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
        UsersModel.create({
            username,
            password,
            nickName,
            passAgain,
            email,
        }, function(err) {
            if (err) {
                req.flash("error", "注册失败");
            } else {
                req.flash("success", "注册成功");
            }
            res.redirect("/user/reigster/view");
        });
    });
});

module.exports = router;
