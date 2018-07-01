var Comments = require('./../model/comments');

exports.list = function() {
	return Comments.queryPaging(conditions, params);
}

exports.add = function() {
	return Comments.create(model);
}

