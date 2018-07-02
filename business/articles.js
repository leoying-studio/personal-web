var Comments = require('./../access/comments');
var Articles = require('./../access/articles');

exports.getPage = function(req, res, next) {
	var body = req.body;
	Articles.list(body.categoryId, body.pagination)
	.then(function(collection) {
		req.body.data = collection;
		next();
	});	
}

exports.destoryById = function(req, res, next) {
	var body = req.body;
	Promise.all([
		Articles.destory(body.id),
		Comments.destory(body.id)
	]).then(function(collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}


exports.save = function() {
	var body = req.body;
	Articles.save(req.body._id, {
		title: body.title,
		description: body.description,
		// 配图, 说明图
		illustration: body.illustration,

	});
}