var express = require('express');
var router = express.Router();
var CategoriesModel = require("./../models/categories");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");

router.post("/save", function(req, res, next) {
	var body = req.body;
    var children = body.children;
    var name = body.name;
    var validate = Validator([
        {mode:"required", message: "类别名称不能为空", value: name},
        {mode: "required", message: "分类字段不存在", value: children}
    ]);
    if (!validate.status) {
        req.body.message = validate.message;
        return next();
    }
    // 设置导航
    try {
        children = children.split(/,|，/g).map(function(item) {
            return { name: item }
        });
    } catch (err) {
        next(err);
    }
    new CategoriesModel({ name, children }).save(function (err, categories) {
        if (err) {
            return next();
        } 
        req.body.data = categories;
        next();
    }).catch(next);
});

// 分类查询
router.get("/category/data", function(req, res, next) {
    CategoriesModel.find({_id: req.query.navId}).lean().then(function(categories) {
        req.body.data = {
            data: categories[0].children,
            total: categories[0].children.length
        };
        next();
    }).catch(next); 
});

// 查询导航列表
router.get("/data",  function(req, res, next) {
    CategoriesModel.find({}).lean().then(function(categoies) {
        req.body.data = {
            data: categoies,
            total: categories.length
        };
        next();
    }).catch(next);
});

// 添加导航下的类别
router.post('/category/add', function(req, res, next) {
	var body = req.body;
    var _id = body.id;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "类别名称不能为空", value: name},
        {mode: "required", message: "类别id不能为空", value: _id}
    ]);
    if (!validate.status) {
        req.body.message = validate.message;
        return next();
    }
    CategoriesModel.update({_id: navId},{$push: {children: {name}}}, function(err, category) {
        if (err) {
            return next();
        }
        req.body.data = category;
        next();
    }).catch(next);
});

// 更新导航下面的类别
router.post("/categoies/update", function(req, res, next) {
	var body = req.body;
    // var navId = body.navId;
    var categoryId = body.categoryId;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "导航id不能为空", value: categoryId}
    ]);
    if (!validate.status) {
        req.body.message = validate.message;
        return next();
    }
    CategoriesModel.findOneAndUpdate({
        'children._id': categoryId
    }, {
        $set : {"categories.$.name": name }
    }, function(err, doc) {
        if (err) {
            return next();
        }   
        req.body.data = doc;
        next();
    }).catch(next);
});

// 更新导航信息
router.post("/update", function(req, res, next) {
	var body = req.body;
	var navId = body.navId;
	var name = body.name;
	var validator = Validator([
	   {mode: "required", value: name, message: "导航名称不能为空"},
	   {mode: "required", value: navId, message: "导航id不能为空"}
	]);
	if (!validator.status) {
        return next(new Error('参数验证错误'));
	}
	CategoriesModel.update({_id: navId}, {$set: {name}}, function(err, state) {
		if (err) {
           return next();
        } 
        req.body = {message: "更新成功!", data: {}};
        next();
	}).catch(next)
});

module.exports = router;
