var express = require('express');
var router = express.Router();
var CategoriesModel = require("./../models/categories");
var Utils = require("./../utils");
var Check = require("./../checks/categories");

router.post("/add", Check.save, function(req, res, next) {
    CategoriesModel.create(req.body, function(err, doc) {
        if (err) {
            return next();
        } 
        req.body.data = categories;
        next();
    }).catch(next);
});

// 分类查询
router.get("/category/data", function(req, res, next) {
    CategoriesModel.find(req.body).then(function(categories) {
        req.body.data = {
            data: categories[0].children,
            total: categories[0].children.length
        };
        next();
    }).catch(next); 
});

// 查询导航列表
router.get("/data",  function(req, res, next) {
    CategoriesModel.find({}).then(function(categoies) {
        req.body.data = {
            data: categoies,
            total: categories.length
        };
        next();
    }).catch(next);
});

// 添加导航下的类别
router.post('/children/add', Check.children, function(req, res, next) {
    CategoriesModel.update(req.body,{$push: req.models}, function(err, category) {
        if (err) {
            return next();
        }
        req.body.data = category;
        next();
    }).catch(next);
});

// 更新导航下面的类别
router.post("/children/update", Check.children, function(req, res, next) {
    CategoriesModel.findOneAndUpdate({
        'children._id': categoryId
    }, {
        $set : {"categories.name": name }
    }, function(err, doc) {
        if (err) {
            return next();
        }   
        req.body.data = doc;
        next();
    }).catch(next);
});

// 更新分类信息
router.post("/update", Check.save, function(req, res, next) {
	CategoriesModel.findOneAndUpdate({_id}, {$set: {name}}, function(err, doc) {
		if (err) {
           return next();
        } 
        req.body = {message: "分类信息更新成功!", data: doc};
        next();
	}).catch(next)
});

module.exports = router;
