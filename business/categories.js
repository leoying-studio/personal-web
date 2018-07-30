var Categories = require('./../access/categories');

exports.getAll = function(req, res, next) {
	Categories.all().then(function(collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}

exports.save = function(req, res, next) {
	var body = req.body;
	Categories.save(body._id, body.name)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.saveSubCategory = function(req, res, next) {
	var body = req.body;
	 Catgegories.updateSubCategory(body._id, body.childId, body.name)
	 .then(function(doc) {
		req.body.data = doc;
		next();
	 });
}
