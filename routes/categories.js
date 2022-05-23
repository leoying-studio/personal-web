const express = require('express');
const router = express.Router();
const Categories = require("./../business/categories");
const Validate = require("./../validate/categories");
const Categories2 = require("./../controller/categories");

router.post("/save", Validate.save, Categories.saveCategory, (req, res, next) => {
    next();
});

router.post("/save1", Categories2.save);

// 查询导航列表
router.get("/data", Categories.getAll,  (req, res, next) => {
    res.json(req.body.data);
});

// 添加导航下的类别
router.post('/subcategory/save', Validate.subcategories, Categories.saveSubcategory, (req, res, next) => {
    next();
});

router.post('/subcategory/destory', Validate.destorySubcategory, Categories.destorySubcategory, (req, res, next) => {
    next();
})

module.exports = router;
