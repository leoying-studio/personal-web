const Categories = require('./../access/categories');

exports.getAll = function(req, res, next) {
	Categories.all().then(function(collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}

exports.save = function(req, res, next) {
	let body = req.body;
	Categories.save(body._id, body.name)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.saveSubcategory = function(req, res, next) {
	let body = req.body;
	 Categories.updateSubcategory(body.cateId, body.subId, body.name)
	 .then(function(doc) {
		req.body.data = doc;
		next();
	 });
}
