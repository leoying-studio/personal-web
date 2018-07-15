var Categories = require('./../models/categories');

exports.getById = function (id) {
	return Categories.findById(id);
}

exports.save = function (id, name) {
	if (id) {
		return Categories.findByIdAndUpdate(id, {$set: {name} });
	}
	return Categories.create({
		name,
		subcategories: []
	}).exec();
}

exports.all = function () {
	return Categories.find({});
}

exports.getSubcategoriesById = function (id, subcategoryId ,name) {
	if (!subcategoryId) {
		return Categories.findByIdAndUpdate(id, { $push: {name} });
	}
	return Categories.findByIdAndUpdate({_id: id, 'subcategories._id': subcategoryId}, {$set: {name}});
}

exports.updateSubcategories = function () {
	return Categories.findOneAndUpdate(conditions, {
		$set: model
	});
}

exports.updateCategory = function (id, model) {
	return Categories.findByIdAndUpdate(id, {
		$set: model
	});
}
