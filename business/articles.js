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