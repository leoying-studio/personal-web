var express = require('express');
var router = express.Router();
var CategoriesModel = require("./../models/categories");
var Utils = require("./../utils");
var Checks = require("./../Checks/categories");

router.post("/add", Checks.add, function(req, res, next) {
    CategoriesModel.create(req.body, function(err, doc) {
        if (err) {
            return next();
        } 
        req.body.data = doc;
        next();
    }).catch(next);
});

// 分类查询
router.get("/category/data", Checks.query, function(req, res, next) {
    CategoriesModel.find(req.body).then(function(collections) {
        req.body.data = {
            data: collections[0].children,
            total: collections[0].children.length
        };
        next();
    }).catch(next); 
});

// 查询导航列表
router.get("/data",  function(req, res, next) {
    CategoriesModel.find({}).then(function(collections) {
        req.body.data = {
            data: collections,
            total: collections.length
        };
        next();
    }).catch(next);
});

// 添加导航下的类别
router.post('/children/add', Checks.children, function(req, res, next) {
    CategoriesModel.update(req.body, {$push: req.models}, function(err, doc) {
        if (err) {
            return next();
        }
        req.body.data = doc;
        next();
    }).catch(next);
});

// 更新导航下面的类别
router.post("/children/update", Checks.children, function(req, res, next) {
    CategoriesModel.findOneAndUpdate(req.body, {
        $set : req.models - h 
    }, function(err, doc) {
        if (err) {
            return next();
        }   
        req.body.data = doc;
        next();
    }).catch(next);
});


// 更新分类信息
router.post("/update", Checks.update, function(req, res, next) {
	CategoriesModel.findOneAndUpdate(req.body, {$set: req.models}, function(err, doc) {
		if (err) {
           return next();
        } 
        req.body = {message: "分类信息更新成功!", data: doc};
        next();
	}).catch(next)
});

module.exports = router;
