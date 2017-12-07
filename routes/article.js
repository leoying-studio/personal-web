var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var ArticleControll = require("./../controlls/article");
var Body = require("./../config/body");

//  新增
router.post("/submit", ArticleControll.submit);

// 查询
router.get("/view/:navId/:categoryId", ArticleControll.getPaging); 

module.exports = router;