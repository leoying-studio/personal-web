var express = require('express');
var router = express.Router();
var Validate = require("./../validate/home");
var Home = require('./../business/home');

// 侧边栏切换进行重定向转发
router.get('/redirect/:target', function(req, res, next) {
    var target = req.params.target;
    res.render("manager/" + target);  
});

module.exports = router;
