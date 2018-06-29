import Articles from './../models/articles';

export default class Articles {

	/**
	 * @param {String} categoryId 类别Id
	 * @param {String} childId 子类Id
	 * @param {Number} pagination 需要查询的页码
	 */
	static list (categoryId, childId, pagination) {
		let articles = Articles.queryPaging({ currentPage }, conditions);
		let count = Articles.count(conditions);
		let categories = Articles.getCategories();
		return Promise.all([categories, articles, count]);
	}

	/**
	 * @param {Object} models  数据模型字段 
	 */
	static add(models) {
		return Articles.create(models);
	}

	/**
	 * @param {String} id 需要删除的文章id字段 
	 */
	static destory(id) {
		return Articles.findByIdAndRemove(id);
	}

	// 获取总数
	static count() {
		return Articles.count();
	}

	/**
	 * 
	 * @param {Number} year 年份
	 * @param {Number} month 月份
	 */
	static timeline(year, month) {
		let query = {};
		try {
			let endYear = month < 12 ? year : year + 1;
			let endMonth = month < 12 ? month + 1 : 1;
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
	static getArticle(id) {
		return Articles.findById(id);
	}

}

