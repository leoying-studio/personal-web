var express = require('express');
var router = express.Router();
var NavModel = require("./../models/nav");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");

router.post("/submit", function(req, res) {
	var body = req.body;
    var categories = body.categories;
    var name = body.name;
    var validate = Validator([
        {mode:"required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "分类字段不合法", value: categories}
    ]);
    if (!validate.status) {
        return res.send({
            status: false,
            message: validate.message
        });
    }
    // 设置导航
    try {
        categories = categories.split(",");
        categories = categories.map(function (item) {
            return { name: item }
        });
    } catch (e) {
        return res.send({
            message: e.message,
            status: false
        });
    }
    new Nav({ name, categories }).save(function (err, nav) {
        if (err) {
           return res.send({
               message: "未知错误",
               status: false
           });
        } 
        return res.send({
            status: true,
            data: nav
        });
    });
});

// 分类查询
router.get("/categories/data", function(req, res) {
    NavModel.find({_id: req.query.navId}).lean().then(function(nav) {
        res.send({
            data: nav[0].categories,
            total: nav[0].categories.length
        });
    }); 
});

// 查询导航列表
router.get("/data", function(req, res) {
    NavModel.find({}).lean().then(function(nav) {
        res.send({
            data: nav,
            total: nav.length
        });
    });
});

router.post('/category/add', function(req, res) {
	var body = req.body;
    var navId = body.navId;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "导航id不能为空", value: navId}
    ]);
    if (!validate.status) {
        res.send({
            message: validate.message,
            status: false
        });
    }
    NavModel.update({_id: navId},{$push: {categories: {name}}}, function(err, category) {
        if (err) {
            return res.send({
                message: "更新失败",
                status: false
            });
        }
        res.send({
            message: "更新成功",
            data: category,
            status: true
        });
    });
});


router.post("/categoies/update", function() {
	var body = req.body;
    var navId = body.navId;
    var categoryId = body.categoryId;
    var name = body.name;
    var validate = Validator([
        {mode: "required", message: "导航名称不能为空", value: name},
        {mode: "required", message: "导航id不能为空", value: categoryId}
    ]);
    if (!validate.status) {
        res.send({
            message: validate.message,
            status: false
        });
    }
    NavModel.update({
        _id: navId,
        'categories._id': categoryId
    }, {
        $set : {"categories.$.name": name }
    }, function(err, doc) {
        if (err) {
            return res.send({
                message: "更新失败",
                status: false
            });
        }
        return res.send({
            message: "更新成功",
            status: true
        });
    });
});

router.post("/nav/update", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var name = body.name;
	var validator = Validator([
	   {mode: "required", value: name, message: "导航名称不能为空"},
	   {mode: "required", value: navId, message: "导航id不能为空"}
	]);
	if (!validator.status) {
		return res.send({
			message: validator.message,
			status: false
		});
	}
	NavModel.updateNav({_id: navId}, {$set: {name}}, function(err, doc) {
		if (err) {
			return res.send({
				status: false,
				message: "未知错误"
			});
		} 
		// ok
		res.send({
			status: true,
			message: "success",
			data: doc
		})
	})
});

module.exports = router;
