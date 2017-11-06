var express = require('express');
var router = express.Router();
var User = require("./../models/users");
var Code = require("./../config/code");

//  中间件
router.use("/list", (req, res, next) => {
	 const { category, pageNo = pageNo || 1, pageSize = pageSize || 20 } = req.body;
	 if (!category) {
		 return;
	 }
     next();
});


router.get("/list", (req, res) => {
	const { category, pageNo = pageNo || 1, pageSize = pageSize || 20 } = req.body;
	
});
