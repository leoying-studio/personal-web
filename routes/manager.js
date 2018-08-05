var express = require('express');
var router = express.Router();
var Validate = require("./../validate/home");
var Home = require('./../business/home');

// 侧边栏切换进行重定向转发
router.get('/redirect/:target', function(req, res, next) {
    var target = req.params.target;
    switch(target) {
        case '0' : {
            res.render('manager/intro');
            break;
        } 
        case '1': {
            res.render('manager/theme');
            break;  
        }
        case '2': {
            res.render('manager/theme.detail.jade');
            break;
        }
        case '4' :{
            res.render('manager/categoies');
            break;
        }
        case '5' : {
            res.render('manager/subcategories');
        }
        case '6' : {
            res.render('manager/articles');
        }
    }   
});



module.exports = router;
