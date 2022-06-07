import express from 'express'
const router = express.Router();
import CateController from './controllers/cate.controller'
// 分类
router.post("/categories/save", CateController.save);
router.get("/categories/tree", CateController.tree);
router.post("/categories/remove", CateController.remove);
router.post("/categories/update", CateController.update);
// 文章
// router.post("/categories/save", CateController.save);
// router.post("/categories/tree", CateController.tree);
// router.post("/categories/remove", CateController.remove);
// router.post("/categories/update", CateController.update);
// // 评论
// router.post("/categories/save", CateController.save);
// router.post("/categories/tree", CateController.tree);
// router.post("/categories/remove", CateController.remove);
// router.post("/categories/update", CateController.update);


router.get("/", (req, res) => {
    res.render("index", {})
});


router.get("/admin", (req, res) => {
    res.render("admin/admin", {})
});

router.get("/admin/categories/data",  CateController.data);

router.get("/admin/categories", (req, res) => {
    res.render("admin/categories", {})
});


export default router;
