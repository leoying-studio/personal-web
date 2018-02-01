var express = require('express');
var router = express.Router();
var homeProxy = require("./../proxy/home");

router.get("/",function(req, res) {
	homeProxy.getAll(function(data) {
		res.render("index", {
			data: {
				navs: data.navs,
				banners: data.banners
			}
		});
	});
});

// router.post("/addBanner",HomeControll.addBanner);
module.exports = router;