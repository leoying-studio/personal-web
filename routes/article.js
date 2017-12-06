var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var ArticleControll = require("./../controlls/article");
var Body = require("./../config/body");

router.post("/submit", ArticleControll.submit);


//  文章分类下的页面
// router.get("/view/:navId/:categoryId", function(req, res) {
// 	 var params = req.params;
// 	 var navId = params.navId;
// 	 var categoryId = params.categoryId;
// 	 try {
// 		if (!navId) {
// 			throw new Error("navId不存在");
// 		}
// 		if (!categoryId) {
// 			throw new Error("cateoryId不存在");
// 		}
// 	} catch(e) {
// 		if (err) {
// 			req.flash("error", e.message);
// 		}
// 		res.redirect("/article");
// 	}

// 	ArticleModel.find({navId, 'categoriesId.id': categoryId}).exec(function(err, coll) {
// 		if (err) {
// 			req.flash("error", '请求失败');
// 			res.redirect("/article");
// 		}
// 		NavModel.find({}).exec(function(error, navs) {
// 			if (err) {
// 				req.flash("error", '请求失败');
// 				res.redirect("/article");
// 			}
// 			const body = new Body({
// 				articles: coll,
// 				navs
// 			});
// 			res.render("article/index", body);
// 		});
// 	});

// });

router.get("/view/:navId/:categoryId", ArticleControll.getPaging); 

module.exports = router;