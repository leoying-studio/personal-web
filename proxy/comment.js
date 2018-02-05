
var CommentModel = require("./../models/comment");
exports.list = function (conditions, currentPage, callback) {
	var navs = CommentModel.getNavs();
	var detail = CommentModel.findOne(conditions)
	Promise.all([navs, detail]).then(function (collections) {
		if (!collections[1]) {
			return callback({
				navs: collections.navs,
				detail: {}
			});
		}
		return Promise.resolve(collections);
	}).then(function (collections) {
		var detailObj = collections[1].toObject();
		var detailId = detailObj._id.toJSON();
		var comment = CommentModel.findPaging({ currentPage }, { detailId });
		var count = CommentModel.count({ detailId });
		Promise.all([
			comment,
			count
		]).then(function (comments) {
			callback({
				navs: collections[0],
				detail: detailObj,
				comments: {
					comments: comments[0],
					total: comments[1]
				}
			});
		});
	});
}