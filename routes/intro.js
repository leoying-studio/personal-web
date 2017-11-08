let express = require('express');
let router = express.Router();
let Intro = require("./../models/intro");
let Utils = require("./../utils");

//title:"string",
//caption:"string",
//descrption:"string",
//backTitle: "string",
//backgrounds: [{background:""}]

router.post("/submit", function(req,res) {
	 const { title, caption, descrption, backTitle, backgrounds } = req.body; 
	 try {
		if (!title) {
			throw new Error("title不能为空");
		}
		if (!caption) {
			throw new Error("caption不能为空");
		}
		if (!descrption) {
			throw new Error("descrption 不能为空");
		}
		if (!backgrounds) {
			throw new Eroor("backgrounds 不能为空");
		}
		if (!Array.isArray(backgrounds)) {
			throw new Eroor("backgrounds 为非法类型");
		}
	 } catch(e) {
		 req.flash("error", e.message);
		 return res.redirect("/");
	 }
	 // 异步提交数据
	 new Intro({
		title,
		caption,
		backTitle,
		backgrounds
	 }).save((err, intro) => {
		if (err) {
			req.flash("error", "添加首页简介失败");
		} else {
			req.flash("success", "添加简介成功");
		}
		res.redirect("/regview");
	 });
});

module.exports = router;
