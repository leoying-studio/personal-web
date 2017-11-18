var express = require('express');
var router = express.Router();
var Banner = require("./../models/banner");
var Intro = require("./../models/intro");
var TimeLine = require("./../models/timeline");
var Footer = require("./../models/footer");
var Nav = require("./../models/nav");
var Body = require("./../config/body");
var Article = require("./../models/article");
var Home = {
	render(req, res)  {
		var findAll = [
			this.get(Nav, 'navs', "导航获取失败"),
			this.get(Banner, 'banners', "Banner获取失败"),
			this.get(Intro, 'intro', "简介获取失败"),
			this.get(TimeLine, 'timeline', "时光轴获取失败"),
			this.get(Footer, 'footer', "页脚获取失败")
		];
		Promise.all(findAll).then( (result) => {
			var body = new Body();
			for(var item of result) {
			    body.data[item.key] = item.collections;
			}
			body.data.type = 1;
			res.render("manager/index", body);
		}).catch((e) => {
			req.flash("error", e.message);
			res.redirect("/");
		});
	},
	get(table, key, msg) {
		return new Promise((resolve, reject) => {
			table.find({}).sort({'serverTime': 1}).exec( (err, collections) => {
				if (err) {
					throw new Error(msg);
				}
				resolve({key,collections});
			})
		});
	}
}

router.get("/default", function(req, res) {
	Nav.find({}).sort({'serverTime': 1}).exec(function(err, collections) {
		if (err) {
			req.flash('error', "读取导航列表失败");
			res.redirect("/manager");
		} 
		var navId = collections[0]._id;
		var categoryId = collections[0].categories[0]._id;
		res.redirect("/manager/navs/"+navId+"/"+categoryId);
	});
});

router.get("/navs/:navId/:categoryId", function(req, res) {
	 var params = req.params;
	 var navId = params.navId;
	 var categoryId = params.categoryId;
	// 请求
	Nav.find({}).sort({'serverTime': 1}).exec(function(err, collections) {
		if (err) {
			req.flash('error', "读取导航列表失败");
			res.redirect("/manager");
		} 
		navId = navId || collections[0]._id;
		categoryId = categoryId || collections[0].categories[0]._id;
		Article.find({navId, 'categoriesId.id': categoryId}).exec(function(error, coll) {
			if (error) {
				req.flash('error', "读取当前分类下的文章列表失败");
				req.redirect("/manager");
			} 
			var messageBody = new Body({
				navs: collections,
				articles: coll,
				type: 0
			});
			res.render("manager/index", messageBody);
		});
	});
});

router.get("/home", Home.render.bind(Home));

module.exports = router;