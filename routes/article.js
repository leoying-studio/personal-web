var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var ArticleControll = require("./../controlls/article");

// 新增
router.post("/submit", ArticleControll.submit);
// 查询
router.get("/view/:navId/:categoryId/:currentPage", ArticleControll.getPaging); 
// 删除
router.post("/del", ArticleControll.del); 
module.exports = router;