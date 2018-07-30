var express = require('express');
var router = express.Router();
var Categories = require("./../business/categories");
var Validate = require("./../validate/categories");

router.post("/save", Validate.save, Categories.save, function(req, res, next) {
    next();
});

// 分类查询
// router.get("/category/data", Validate.query, Categories.getChildren, function(req, res, next) {
//      res.json(req.body.data);
// });

// 查询导航列表
router.get("/data", Categories.getAll,  function(req, res, next) {
    res.json(req.body.data);
});

// 添加导航下的类别
router.post('/subCategory/save', Validate.subCategories, Categories.saveSubCategory, function(req, res, next) {
    next();
});

// 更新导航下面的类别
// router.post("/children/update", Validate.children, function(req, res, next) {
//     next();
// });

module.exports = router;
