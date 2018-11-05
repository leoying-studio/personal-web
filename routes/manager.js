const express = require('express');
const router = express.Router();

// 侧边栏切换进行重定向转发
router.get('/redirect/:target', function(req, res, next) {
    let target = req.params.target;
    res.render("manager/" + target);  
});

module.exports = router;
