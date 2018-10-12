const Articles = require('./../models/articles');

/**
 * @param {String} categoryId 类别Id
 * @param {String} childId 子类Id
 * @param {Number} pagination 需要查询的页码
 */
exports.list = function(categoryId, subId, pagination = 1) {
	return Articles.queryPaging({pagination}, {categoryId, 'subIds.id': subId });
}

/**
 * @param {Object} models  数据模型字段 
 */
exports.add = function(model) {
	return Articles.create(model);
}

/**
 * @param {String} id 需要删除的文章id字段 
 */
exports.destory = function(id) {
	return Articles.findByIdAndRemove(id);
}


exports.destoryBySubId = function(id, callback) {
	return Articles.remove({"subIds._id": id}, callback);
}

// 获取总数
exports.count = function(categoryId, subId) {
	return Articles.count({categoryId, 'subIds.id': subId});
}


exports.save = function(id, fields) {
	if (id) {
		return Articles.findByIdAndUpdate( id ,{
			$set: fields,
		});
	}
	return Articles.create(fields);
}

/**
 * 
 * @param {Number} year 年份
 * @param {Number} month 月份
 */
exports.timeline = function(year, month) {
	let query = {};
	if (year && month) {
		let endYear = month < 12 ? year : year + 1;
		let endMonth = month < 12 ? month + 1 : 1;
		query = {
			'createdAt': {
				$gt: new Date(year, month),
				$lt: new Date(endYear, endMonth)
			}
		};
	} 
	// 聚合分组查询
	return Articles.aggregate([
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


/**
 * @param {String} id 当前文章的id 
 */
exports.getArticle = function(id) {
	return Articles.findById(id);
}

exports.recommends = function() {
	return Articles.find({recommend: true});
}

