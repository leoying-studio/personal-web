var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var ArticleDetailModel = require("./../models/article_detail");
var CommentModel = require("./../models/comment");
var Utils = require("./../utils");

// 新增
router.post("/submit", function() {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var navId = body.navId;
	var recommend = body.recommend || false;
	var categoriesId = body["categoriesId"];
	var content = body.content;

	if (typeof categoriesId == "string") {
		categoriesId = [categoriesId];
	}
	categoriesId = categoriesId.map(function(id) {
		return {id};
	});
	try {
		if (!title) {
			throw new Error("标题不能为空");
		}
		if (!navId) {
			throw new Error("navId不能为空");
		}
		if (!categoriesId) {
			throw new Error("categoriesId不能为空");
		}
		if (!Array.isArray(categoriesId)) {
			throw new Error("categoriesId必须为数组");
		}
		if (!categoriesId.length) {
			throw new Error("请至少选择一个分类");
		}
	}catch(e) {
		req.flash("error", e.message);
		res.redirect("/manager");
	}
	// 开始插入数据
	var fields = {
		title,
		img,
		navId,
		categoriesId,
		description,
		recommend
	};
    new ArticleModel(fields).save(function(err, article) {
		if (!err) {
			 // 插入成功
			req.flash("success", "添加文章列表成功!");
			return res.redirect("/manager");
		}
		req.flash("error", "添加文章列表失败!");
		res.redirect("manager");
	});
});

// 查询
router.get("/view/:navId/:categoryId/:currentPage",function(req, res)　{
	 var params = req.params;
	 var navId = params.navId;
	 var categoryId = params.categoryId;
	 var currentPage = params.currentPage;
	 var page = req.query.page;
	 if (page) {
		 currentPage = page;
	 }
	 try {
		if (!navId) {
			throw new Error("navId不存在");
		} 
		if (!categoryId) {
			throw new Error("cateoryId不存在");
		}
	} catch(e) {
		req.flash("error", e.message);
		res.redirect("/article");
	}

	var conditions = {
		 navId,
		'categoriesId.id': categoryId,
	};

	ArticleModel.findPaging({currentPage}, conditions )
	 .then(function(articles) {
		 ArticleModel.getNavs().then(function(navs) {
			 ArticleModel.count(conditions, function(err, total) {
				   var body = Body({
						params: {
							navId,
							categoryId,
							currentPage,
							total
						},
						navs,
						articles
				   });
				   //res.send(body);
				   if (req.session.user == 'admin' && page) {
					   return res.send(body)
				   }
			       res.render('article/index', body);   
			 });
		 });
	 });
}); 

// 删除
router.post("/delete", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var categoryId = body.categoryId;
	var articleId = body.articleId;
	try {
		if (!navId) {
			throw new Error('navId 不能为空');
		}
		if (!categoryId) {
			throw new Error('categoryId 不能为空');
		}
		if (!articleId) {
			throw new Error('articleId 不能为空');
		}
	}catch(e) {
		return res.send(Body({
			code: 'validate',
			data: e.message
		}));
	}

	var conditions = {
		navId,
		'categoriesId.id': categoryId,
		articleId
	};

	var articleCondtion = {
		 navId,
		'categoriesId.id': categoryId,
		_id: articleId
	};
	// 清除关联数据
	Promise.all([
		CommentModel.remove(conditions),
		ArticleDetailModel.remove(conditions),
		ArticleModel.remove(articleCondtion)
	]).then( values => {
		var state = values.every(function(item) {
			return item.result.ok == 1;
		});
		if (state) {
			res.send(Body(true));
		} else {
			res.send(Body({
				code: 'params',
				msg: '有残留或未删除, 请进行参数检查'
			}));
		}
	}).catch(e => {
		res.render(Body({
			code: 'unknown'
		}));
	});
}); 

// 修改
router.post("/update", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var categoryId = body.categoryId;
	var articleId = body.articleId;
	var title = body.title;
	var description = body.description;
	var img = body.img;

	try {
		if (!navId) {
			throw new Error('navId 不能为空');
		}
		if (!categoryId) {
			throw new Error('categoryId 不能为空');
		}
		if (!articleId) {
			throw new Error('articleId 不能为空');
		}
	}catch(e) {
		return res.send(Body({
			code: 'validate',
			data: e.message
		}));
	}
    ArticleModel.update({
		navId,
		'categoriesId.id': categoryId,
		_id:articleId
	}, {
		$set: {
			title,
			description,
			img
		}
	}, function(err , state) {
		if (err) {
			res.send(Body({
				code: 'unknown'
			}));
		} else {
			if (state.n > 0) {
				return res.send(Body(true));
			}
			res.send(Body({
				code: 'unknown'
			}));
		}
	});
});

router.post("/comment/submit", function (req, res) {
	var body = req.body;
	var username = body.username;
	var content = body.content;
	var detailId = body.detailId;
	var fields = {
		username,
		content,
		detailId
	};
	new CommentModel(fields).save(function (err, comment) {
		if (err) {
			return res.send({
				status: false,
				message: "添加失败"
			});
		}
		res.send({
			status: true,
			data: {comment}
		});
	});
});

module.exports = router;