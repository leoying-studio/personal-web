let express = require('express');
let router = express.Router();
let Banner = require("./../models/banner");
let Utils = require("./../utils");

router.post("/submit", function(req,res) {
    const {title, caption, description, background} = req.body;
    try {
        if (!title) {
            throw new Error("banner标题不能为空!");
        }
        if (!caption) {
            throw new Error("banner的字幕不能为空");
		}
		if (!description) {
			throw new Error("banner的说明不能为空");
		}
		if (!background) {
			throw new Error("banner的背景图不能为空");
		}
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/");
    }

    // 用户登录
    new Banner({title, caption, description, background}).save((err, coll) => {
		if (err) {
			req.flash("error", "设置banner失败");
		} else {
			req.flash("success", "设置成功");
		}
		return res.redirect("/manager");
	});
});

router.get("/list", (res, req) => {
	Banner.find((err, res) => {
         if (err) {
            req.flash("error", "获取banner失败");
         } else {
             req.flash("success", "获取banner成功");
         }
         return res.redirect("/");
     })
});

module.exports = router;
