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

exports.getChildren = function(req, res, next) {
	var body = req.body;
	Categories.getSubcategoriesById(body._id)
	.then(function(doc) {
		req.body.data = doc.children;
		next();
	}).catch(next);
}

exports.saveChild = function(req, res, next) {
	var body = req.body;
	Categories.addChild(body._id, body.childId, body.name)
	 .then(function(doc) {
		req.body.data = doc;
		next();
	 });
}
