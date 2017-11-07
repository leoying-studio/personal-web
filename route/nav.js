var express = require("express");
var db=require('../db');
var Nav = require('../models/nav');
var router = express.Router();

// 注册用户
router.post("/addnav", function(req, res){
    const { name } = req.body;
    try {
       if (!name) {
           throw new Error("添加的导航名称不能为空!");
       }
    } catch(e) {
        req.flash("error", e.msg);
    } 
   // 设置导航
    new Nav({
       name
    }).save( (err) => {
    
    });
    
});


module.exports = router;