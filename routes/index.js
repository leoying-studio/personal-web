var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
      title: 'Express', navs: [
        { name: "首页" },
        { name: "笔记" },
        { name: "鎏金岁月" },
        { name: "光影怀旧" }
      ]
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/register', function (req, res, next) {
  res.render('register', {
      title: 'Express', navs: [
        { name: "首页" },
        { name: "笔记" },
        { name: "鎏金岁月" },
        { name: "光影怀旧" }
      ]
  });
});

module.exports = router;
