var Comments = require('./../models/comments');

exports.list = function(conditions, params) {
	return Comments.queryPaging(conditions, params);
}

exports.add = function(model) {
	return Comments.create(model);
}

