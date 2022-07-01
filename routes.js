import express from 'express'
import CateController from './controllers/cate.controller'
import ArticlesController from './controllers/articles.controller'
import MediaController from './controllers/media.controller'
import UserController from './controllers/user.controller'
import AggregateController from './controllers/aggregate.controller'
import BoardController from './controllers/board.controller'
import Auth from './middleware/auth'
const router = express.Router();
// 分类
router.post("/cate/save", CateController.save);
router.get("/cate/tree", CateController.tree);
router.post("/cate/remove", CateController.remove);
router.get("/cate/data",  CateController.data);
// 文章
router.post("/article/save", ArticlesController.save);
router.get("/articles/list", ArticlesController.list);
router.get("/articles/one", ArticlesController.one);
router.post("/articles/remove", ArticlesController.remove);
router.get("/articles/detail/:id", ArticlesController.detailView);
router.get("/blog/view", ArticlesController.blogView);
// 媒体
router.post("/media/upload", MediaController.upload);
router.get("/media/list", MediaController.list);
router.post("/media/remove", MediaController.remove);
// 登录和登出
router.post("/sign-in/submit", UserController.signIn);
router.get("/sign-off", UserController.signOff);
// 首页查询
router.get("/",Auth.applyAccount, AggregateController.recommendAndRecently);
// 留言板
router.get("/board/view", BoardController.list)
router.post("/board/save", BoardController.save)

// views
router.get("/board/view", (req, res) => {
    res.render("www/board", {})
});

router.get("/admin", Auth.applyAccount, Auth.query, (req, res) => {
    res.render("admin/index", {
        username: req.body.username
    })
});

router.get("/sign-in/view", (req, res) => {
    res.render("sign-in/index", {})
});

router.get("/admin/cate/data/view", (req, res) => {
    res.render("admin/pages/cate", {})
});

router.get("/admin/articles/list/view", (req, res) => {
    res.render("admin/pages/articles", {})
});

router.get("/admin/articles/save/view", (req, res) => {
    res.render("admin/pages/article-save", {})
});

router.get("/admin/media/view", (req, res) => {
    res.render("admin/pages/media", {})
});

router.get("/demo/view", (req, res) => {
    res.render("demo/index", {})
});

export default router;
