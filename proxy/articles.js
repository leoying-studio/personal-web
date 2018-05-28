var ArticlesModel = require("./../models/articles");
var CommentsModel = require("./../models/comments");

exports.list = function(conditions, currentPage, render) {
	var articles = ArticlesModel.queryPaging({currentPage}, conditions );
	var count = ArticlesModel.count(conditions);
	if (!render) {
		return Promise.all([articles, count]);
	}
	var categories =  ArticlesModel.getCategories();
	return Promise.all([categories, articles, count]);
}

exports.getTimeline = function(params, conditions) {
	var that = this;
	return new Promise(function(resolve, rejcet) {
		ArticlesModel.count({}, function(err, total) {
			if (err) {
				return rejcet(err);
			}
			var query = {};
			if (conditions) {
				var year = conditions.year;
				var month = conditions.month;
				var endYear = month < 12 ? year : year + 1;
				var endMonth = month < 12 ? month + 1 : 1;
				query = {
					'createdAt': {
						$gt: new Date(year, month), 
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
						time: {$substr: ['$createdAt', 0, 7]},
						description: '$description',
						illustration: '$illustration',
						articleId: '$_id'
					}
				},	
				{
					$match: query
				},
				{
					$group: {
						'_id': '$time',
						number: {$sum: 1},
						document: { $push: {'description': '$description', 'illustration': '$illustration', 'articleId':'$articleId'}},
					}
				}
			]).then(function(collections) {
				resolve({
					total,
					collections
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
