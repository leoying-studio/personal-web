var express = require('express');
var router = express.Router();
var homeProxy = require("./../proxy/home");

router.get("/",function() {
	homeProxy.getAll(function(data) {
		res.render("index", {
			data
		});
	});
});
module.exports = router;
