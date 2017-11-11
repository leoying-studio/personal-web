let express = require('express');
let router = express.Router();
let Nav = require("./../models/nav");
let Utils = require("./../utils");

router.post("/submit", function(req,res) {
    const {name, categories } = req.body;
    try {
        if (!name) {
            throw new Error("导航名称不能为空!");
        }
        if (!categories) {
            throw new Error("categories字段不存在");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/regview");
    }

    // 设置导航
    try {
        var categoriesCollections = categories.split(",");
        categoriesCollections = categoriesCollections.map(function(item) {
            return {name: item}
        });
    }catch(e) {
        req.flash("error", "导航下面的分类类别转换失败");
        return res.redirect("/manager");
    }
    new Nav({name, categories: categoriesCollections}).save((err, current) => {
		if (err) {
			req.flash("error", "导航设置失败");
		} else {
			req.flash("error", "设置成功");
		}
		res.redirect("/manager");
	});
});

module.exports = router;
