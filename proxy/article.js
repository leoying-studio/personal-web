var ArticleModel = require("./../models/article");
var CommentModel = require("./../models/comment");

exports.list = function(conditions , currentPage, callback) {
	var articles = ArticleModel.findPaging({currentPage}, conditions );
	var navs =  ArticleModel.getNavs();
	var count = ArticleModel.count(conditions);
	Promise.all([navs, articles, count])
	.then(function(collections) {
		callback({
			navs: collections[0],
			articles: collections[1],
			total: collections[2]
		});
	});
}

exports.detail =  function(conditions, currentPage, callback) {
	var detail = ArticleModel.findOne(conditions);
	var comments = CommentModel.findPaging({currentPage}, conditions);
	var total = CommentModel.count(conditions);
	Promise.all([detail, comments, total]).then(function(collections) {
		callback({
			detail: collections[0],
			comments: {
				list: collections[1],
				total: collections[2]
			}
		});
	}); 
}