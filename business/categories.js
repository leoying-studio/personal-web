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

// exports.getChildren = function(req, res, next) {
// 	var body = req.body;
// 	Catgegories.getSubcategoriesById(body._id)
// 	.then(function(doc) {
// 		req.body.data = doc.children;
// 		next();
// 	}).catch(next);	
// }

exports.savSubCategory = function(req, res, next) {
	var body = req.body;
	 Catgegories.updateSubCategory(body._id, body.childId, body.name)
	 .then(function(doc) {
		req.body.data = doc;
		next();
	 });
}
