var ArticlesModel = require("../models/articles");
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
		callback(collections);
	}).catch(function(err) {
		callback(err);
	}); 
}
