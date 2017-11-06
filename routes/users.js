var express = require('express');
var router = express.Router();
var User = require("./../models/users");
var Code = require("./../config/code");

//  中间件
router.use("/register", (req, res, next) => {
     var body = req.body;
     for(var key in body) {
         if (body[key] === "") {
             res.send({
                code: Code.empty,
                msg: key+"不能为空"
             });
             return;
         }
     }
     if(body.password !== body.passAgain) {
        res.send({
            code: Code.accordance,
            msg: "两次密码输入不一致"
        });
        return;
    }
    next();
});

// 交互
router.post("/register", function(req,res) {
    var body = req.body;
    User.findOne({username: body.username}, function(err, user) {
         if (err) {
            res.send({
                code: 500,
                msg: "服务错误"
            });
            return;
         } 
         if (user) {
            res.send({
                code: Code.repetition,
                msg: "该用户已经存在"
            });
            return;
         }
         User.create({
             username: body.username,
             password: body.password,
             passAgain: body.passAgain,
             email: body.email
         }, () => {
            res.send({
                code:Code.success,
                data:body,
                msg: "注册成功"
            });
         }).catch( () => {
            res.send({
                code:Code.abnormal,
                msg: "注册异常,请稍候再试"
            });
         });
    });
    
});

module.exports = router;
