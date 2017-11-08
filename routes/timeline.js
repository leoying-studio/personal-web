let express = require('express');
let router = express.Router();
let TimeLine = require("./../models/timeline");
let Utils = require("./../utils");

router.post("/submit", function(req,res) {
	 const { descrption, articleId, categoryId} = req.body; 
	 try {
		if (!descrption) {
			throw new Error("descrption");
		}
		if (!articleId) {
			throw new Error("articleId不能为空");
		}
		if (!categoryId) {
			throw new Error("categoryId 不能为空");
		}
	 } catch(e) {
		 req.flash("error", e.message);
		 return res.redirect("/");
	 }
	 // 异步提交数据
	 const time = Utils.getTime(new Date(), 's');
	 new TimeLine({
		descrption, articleId, categoryId, time
	 }).save((err, intro) => {
		if (err) {
			req.flash("error", "添加失败");
		} else {
			req.flash("success", "添加成功");
		}
		res.redirect("/");
	 });
});

module.exports = router;
