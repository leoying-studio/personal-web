const express = require('express');
const router = express.Router();
import CateController from './controller/cate.controller'

// 分类
router.post("/categories/save", CateController.save);
// router.post("/categories/tree", Categories.tree);
// router.post("/categories/remove", Categories.remove);

setTimeout(function() {
    CateController.tree({
     
    })
},  1000)

module.exports = router;
