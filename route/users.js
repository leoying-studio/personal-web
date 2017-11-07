var express = require("express");
var db=require('../db');
var User=require('../models/users');
var router = express.Router();

router.get('/regview', function(req, res, next) {
    res.render('register');
});


// 注册用户
router.post("/register", function(req, res){
    const {username, password, passAgain, email} = req.body;
    try {
       if (username.length < 2 || username.length > 12) {
           throw new Error("用户名长度应该在2到12个字符");
       }
       if (password.length < 6) {
           throw new Error("密码长度不能小于6");
       }
       if (password !== passAgain) {
           throw new Error("两次密码输入不一致");
       }
    } catch(e) {
        return res.redirect('/users/regview');
    } 
    // 判断当前用户是否存在
    User.findOne({username},(erro, user) => {
        if (!user) {
            // 注册用户
            new User({
                username,
                password,
                passAgain,
                email
            }).save( (err) => {
                if (err) {
                    return res.redirect('/users/regview');
                }
                return res.redirect('/');
            });
    
        }else {
            // 用户已经存在
            console.log(req.flash);
            req.flash('error',"当前用户已经存在");
            res.redirect('/users/regview');
        }
    })
});


// 用户登录
router.post("/login", (req, res) => {
    const {username, password} = req.body;
    try {
        User.findOne({username,password}, (erro, user) => {
            if (user) {
                // 登录成功
                return res.redirect('/');
            }
        });
    }catch(e) {
         return res.redirect('/users/login');
    }
});

module.exports = router;