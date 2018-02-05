var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");

router.get("/",function(req, res) {
	HomeProxy.getAll(function(data) {
		res.render("index", data);
	});
});

module.exports = router;