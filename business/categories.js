const Categories = require('./../access/categories');
const Articles = require('./../access/articles');
const Comments = require('./../access/comments');
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
	 }).catch(next);
}

exports.destorySubcategory = function(req, res, next) {
	let {cateId, subId} = req.body;
	Articles.destoryBySubId(subId,(collections) => {
		collections = collections || [];
		let excutes = collections.map((_id) => {
			return Comments.destory.bind(_id);
		});
		Promise.all(excutes).then(() => {
			Categories.destorySubcategoryById(cateId, subId)
			.then((doc) => {
				req.body.data = doc;
				next();
			})
		});
	}).catch(next);

}