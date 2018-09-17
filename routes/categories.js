const express = require('express');
const router = express.Router();
const Categories = require("./../business/categories");
const Validate = require("./../validate/categories");

router.post("/save", Validate.save, Categories.save, (req, res, next) => {
    next();
});

// 查询导航列表
router.get("/data", Categories.getAll,  (req, res, next) => {
    res.json(req.body.data);
});

// 添加导航下的类别
router.post('/subcategory/save', Validate.subCategories, Categories.saveSubcategory, (req, res, next) => {
    next();
});

router.post('/subcategory/destory', Validate.destorySubcategory, Categories.destorySubcategory, (req, res, next) => {
    next();
})

module.exports = router;
