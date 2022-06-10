import express from 'express'
const router = express.Router();
import CateController from './controllers/cate.controller'
import ArticlesController from './controllers/articles.controller'
import MediaController from './controllers/media.controller'
// 分类
router.post("/categories/save", CateController.save);
router.get("/categories/tree", CateController.tree);
router.post("/categories/remove", CateController.remove);
router.post("/categories/update", CateController.update);
router.get("/categories/data",  CateController.data);
// 文章
router.post("/article/save", ArticlesController.save);
router.get("/articles/list", ArticlesController.list);
router.post("/articles/remove", ArticlesController.remove);
// // 评论
router.post("/media/upload", MediaController.upload);

// views
router.get("/", (req, res) => {
    res.render("index", {})
});

router.get("/admin", (req, res) => {
    res.render("admin/admin", {})
});

router.get("/admin/categories/data/view", (req, res) => {
    res.render("admin/categories", {})
});

router.get("/admin/articles/list/view", (req, res) => {
    res.render("admin/articles", {})
});

router.get("/admin/articles/save/view", (req, res) => {
    res.render("admin/article-save", {})
});

export default router;
