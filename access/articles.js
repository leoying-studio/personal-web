var Articles = require('./../models/articles');

/**
 * @param {String} categoryId 类别Id
 * @param {String} childId 子类Id
 * @param {Number} pagination 需要查询的页码
 */
exports.list = function (categoryId, childId, pagination) {
	var articles = Articles.queryPaging({ currentPage }, conditions);
	var count = Articles.count(conditions);
	var categories = Articles.getCategories();
	return Promise.all([categories, articles, count]);
}

/**
 * @param {Object} models  数据模型字段 
 */
exports.add = function (models) {
	return Articles.create(models);
}

/**
 * @param {String} id 需要删除的文章id字段 
 */
exports.destory = function (id) {
	return Articles.findByIdAndRemove(id);
}

// 获取总数
exports.count = function () {
	return Articles.count();
}

/**
 * 
 * @param {Number} year 年份
 * @param {Number} month 月份
 */
exports.timeline = function (year, month) {
	var query = {};
	try {
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
	} catch (e) {
		query = {};
	} finally {
		// 聚合分组查询
		return ArticlesModel.aggregate([
			{
				$project: {
					year: { $substr: ['$createdAt', 0, 4] },
					month: { $substr: ['$createdAt', 5, 2] },
					time: { $substr: ['$createdAt', 0, 7] },
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
					number: { $sum: 1 },
					document: { $push: { 'description': '$description', 'illustration': '$illustration', 'articleId': '$articleId' } },
				}
			}
		]);
	}
}


/**
 * @param {String} id 当前文章的id 
 */
exports.getArticle = function(id) {
	return Articles.findById(id);
}