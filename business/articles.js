var articles = require('./../proxy/articles');

/**
 * 获取时光轴
 */
exports.getArticleDeatails = function(conditions, currentPage, callback) {
	articles.detail(conditions, currentPage, function(collections) {
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
	});
}