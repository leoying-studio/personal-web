var Comments = require('./../models/comments');

exports.list = function(params, conditions) {
	return Comments.queryPaging(params, conditions);
}

exports.add = function(model) {
	return Comments.create(model);
}

exports.count = function() {
	return Comments.count().exec();
}