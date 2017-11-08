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
        if (! categories) {
            throw new Error("categories字段不存在");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/regview");
    }

    // 设置导航
    new Nav({name, categories}).save((err, res) => {
		if (err) {
			req.flash("error", "导航设置失败");
			
		} else {
			req.flash("error", "设置成功");
		}
		return res.redirect("/regview");
	});
});

router.get("/list", (res, req) => {
	 Nav.find((err, res) => {
         if (err) {
            req.flash("error", "获取列表失败");
         } else {
             req.flash("success", "获取列表成功");
         }
         return res.redirect("/");
     })
});

module.exports = router;
