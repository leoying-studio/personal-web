var express = require('express');
var router = express.Router();
var ArticleDetailControll = require("./../controlls/article_detail");

router.post("/submit", ArticleDetailControll.submit);

router.get("/view/:articleId/:currentPage", ArticleDetailControll.get);

router.post("/submit_comment", ArticleDetailControll.submitComment);

router.post("/update", ArticleDetailControll.update);

router.post("/del", ArticleDetailControll.del);

router.get("/getDetail", ArticleDetailControll.getDetail);

module.exports = router;