var express = require('express');
var router = express.Router();
var Banner = require("./../models/banner");
var Intro = require("./../models/intro");
var TimeLine = require("./../models/timeline");
var Footer = require("./../models/footer");
var Nav = require("./../models/nav");
var Body = require("./../config/body");
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


router.get("/",Home.render.bind(Home));

module.exports = router;