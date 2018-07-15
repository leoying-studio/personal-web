var express = require('express');
var router = express.Router();
var Categories = require("./../business/categories");
var Checks = require("./../Checks/categories");

router.post("/save", Checks.save, Categories.saveCategory, function(req, res, next) {
    next();
});

// 分类查询
router.get("/category/data", Checks.query, Categories.getChildren, function(req, res, next) {
     res.json(req.body.data);
});

// 查询导航列表
router.get("/data", Categories.getAll,  function(req, res, next) {
    res.json(req.body.data);
});

// 添加导航下的类别
router.post('/children/save', Checks.children, Categories.saveChild, function(req, res, next) {
    next();
});

// 更新导航下面的类别
router.post("/children/update", Checks.children, function(req, res, next) {
    next();
});

module.exports = router;
