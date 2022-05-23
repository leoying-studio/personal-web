import express from 'express'
const router = express.Router();
import CateController from './controllers/cate.controller'
import CateService from './services/cate.service'

// 分类
router.post("/categories/save", CateController.save);
// router.post("/categories/tree", Categories.tree);
// router.post("/categories/remove", Categories.remove);

CateService.tree()

export default router;
