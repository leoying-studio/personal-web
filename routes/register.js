let express = require('express');
let router = express.Router();
let User = require("./../models/users");
// let Utils = require("./../utils");

router.get('/view', function (req, res, next) {
   res.render('register');
});


router.post("/submit", function(req,res) {
    const {username, password, passAgain, email} = req.body;
    try {
        if (!username) {
            throw new Error("用户名不能为空!");
        }
        if (password.length < 6) {
            throw new Error("密码长度不能小于6个!");
        }
        if (password !== passAgain) {
            throw new Error("两次密码输入不一致");
        }
        if (!email) {
            throw new Error("邮箱不能为空");
        } 
        if (!Utils.validateEmail(email)) {
            throw new Error("邮箱格式不合法");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/regview");
    }

    // 查询当前用户名是否注册
    User.findOne({username}).then((error, user) => {
        if (user) {
            req.flash("error", "当前用户名已经存在");
            res.redirect("/regview");
        }
        if (!error) {
            // 开始注册
            new User({
                username,
                password,
                passAgain,
                email,
            }).save((err, res) => {
                if (err) {
                    req.flash("error", "注册失败");
                } else {
                    req.flash("success", "注册成功");
                }
                res.redirect("/regview");
            })
        }
    });
});

module.exports = router;
