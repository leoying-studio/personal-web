var Comments = require('./../model/comments');

exports.list = function(conditions, params) {
	return CommentsModel.queryPaging(conditions, params);
}

exports.add = function(model) {
	return Comments.create(model);
}