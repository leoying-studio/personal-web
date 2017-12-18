var express = require('express');
var router = express.Router();
var User = require("./../models/users");

// var Utils = require("./../utils");

router.get('/view');

router.post("/submit", function(req,res) {
    const {username, password } = req.body;
    try {
        if (!username) {
            throw new Error("用户名不能为空!");
        }
        if (password.length < 6) {
            throw new Error("密码长度不能小于6个!");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/regview");
    }

    // 用户登录
    User.findOne({username, password}).then((error, user) => {
        if (user) {
            req.flash("success", "用户名或者密码错误");
            res.redirect("/regview");
        }
    });
});

module.exports = router;
