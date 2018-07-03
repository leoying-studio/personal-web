var Comments = require('./../models/comments');

exports.list = function(articleId, pagination) {
	return Comments.queryPaging({pagination}, {articleId});
}

exports.add = function(field) {
	return Comments.create(field);
}

exports.count = function() {
	return Comments.count().exec();
}