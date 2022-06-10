import express from 'express'
const router = express.Router();
import CateController from './controllers/cate.controller'
import ArticlesController from './controllers/articles.controller'
import MediaController from './controllers/media.controller'
// 分类
router.post("/cate/save", CateController.save);
router.get("/cate/tree", CateController.tree);
router.post("/cate/remove", CateController.remove);
router.post("/cate/update", CateController.update);
router.get("/cate/data",  CateController.data);
// 文章
router.post("/article/save", ArticlesController.save);
router.get("/articles/list", ArticlesController.list);
router.post("/articles/remove", ArticlesController.remove);
// // 评论
router.post("/media/upload", MediaController.upload);

// views
router.get("/", (req, res) => {
    res.render("www/index", {})
});

router.get("/admin", (req, res) => {
    res.render("admin/index", {})
});

router.get("/admin/categories/data/view", (req, res) => {
    res.render("admin/cate", {})
});

router.get("/admin/articles/list/view", (req, res) => {
    res.render("admin/articles", {})
});

router.get("/admin/articles/save/view", (req, res) => {
    res.render("admin/article-save", {})
});

export default router;
