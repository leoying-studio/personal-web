var express = require('express');
var router = express.Router();
var Validate = require("./../validate/home");
var Home = require('./../business/home');

// 侧边栏切换进行重定向转发
router.get('/redirect/:target', function(req, res, next) {
    var target = req.params.target;
<<<<<<< HEAD
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
            res.render('manager/theme.detail');
            break;
        }
        case '4' :{
            res.render('manager/categoies.jade');
            break;
        }
        case 's' : {
            res.render('manager/subcategories.jade');
        }
        case '6' : {
            res.render('manager/articles');
        }
    }   
=======
    res.render("manager/" + target);  
>>>>>>> 4bf98397d82d37064ee28db4b5fbddd620c10278
});

module.exports = router;
