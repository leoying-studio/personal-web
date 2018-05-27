var ArticlesModel = require("./../models/articles");
var CommentsModel = require("./../models/comments");

exports.list = function(conditions , currentPage, callback) {
	var articles = ArticlesModel.queryPaging({currentPage}, conditions );
	var navs =  ArticlesModel.getCategories();
	var count = ArticlesModel.count(conditions);
	Promise.all([navs, articles, count])
	.then(function(collections) {
		callback({
			navs: collections[0],
			articles: collections[1],
			total: collections[2]
		});
	}).catch(function(err) {
		callback(err);
	});
}

exports.getTimeline = function(params = {currentPage: 1, pageSize: 12}, conditions = {}) {
	var that = this, pageSize = pageSize || 12;
	return new Promise(function(resolve, rejcet) {
		ArticlesModel.count({}, function(err, count) {
			if (err) {
				return rejcet(err);
			}
			var query = {};
			if (conditions.year && conditions.month) {
				var query = {
					'createdAt': {
						$gt: new Date(conditions.year, conditions.month), 
						$lt: new Date(endYear, endMonth)
					}
				};
			}
			// 聚合分组查询
			ArticlesModel.aggregate([
				{
					$project: {
						year: {$substr: ['$createdAt', 0, 4]},
						month: {$substr: ['$createdAt', 5, 2]},
						years: {$substr: ['$createdAt', 0, 7]},
						description: '$description',
						img: '$img',
						articleId: '$_id'
					}
				},	
				{
					$match: query
				},
				{
					$group: {
						'_id': '$years',
						number: {$sum: 1},
						document: {$push: {'description': '$description', 'img': '$img', 'articleId':'$articleId'}},
					}
				},
				{
					$limit: pageSize
				}
			]).then(function(collections) {
				resolve({
					count: count,
					list: collections
				});
			});
		}).catch(function(err) {
			rejcet(err);
		});
	});
}

exports.detail =  function(conditions, currentPage, callback) {
	var detail = ArticlesModel.findOne({_id: conditions.articleId});
	var comments = CommentsModel.queryPaging({currentPage}, conditions);
	var total = CommentsModel.count(conditions);	
	Promise.all([detail, comments, total]).then(function(collections) {
		if (collections[1].length) {
			collections[1] = collections[1].map(function(item) {
				var diff = (new Date() - new Date(item.createdAt)) / 1000 / 60;
				var diffStr = "";
				if (diff < 1) {
					diffStr = "刚刚";
				} else if(diff < 60) {
					diffStr = Math.floor(diff) + '分钟前';
				} else if (diff > 60 && diff < 24 * 60) {
					diffStr = Math.floor(diff / 60) + '小时前';
				} else if (diff >= 24 * 60 && diff < 24 * 60 * 7) {
					diffStr = Math.floor(diff / 24 / 60) + '天前';
				} else {
					diffStr = item.createdTime
				}
				return {
					username: item.username,
					content: item.content,
					timeDiff: diffStr
				};
			});
		}
		callback({
			detail: collections[0] || {},
			comments: {
				list: collections[1],
				total: collections[2]
			}
		});
	}).catch(function(err) {
		callback(err);
	}); 
}
